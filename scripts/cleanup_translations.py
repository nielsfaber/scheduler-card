#!/usr/bin/env python3
"""
Cleanup translation files based on en.json.

For every translation file (non-English) this script will:
  - Remove keys that no longer exist in the English reference (en.json).
  - Reorder keys so the file structure always matches en.json.
  - Never add new keys (missing translations are left to human translators).

When running inside GitHub Actions (GITHUB_OUTPUT env var is set) the script
sets two step outputs:
  - ``changed``  – "true" when at least one file was modified, else "false".
  - ``summary``  – Markdown PR description with a changes table and a
                   per-language translation-progress table.
"""

import glob
import json
import os
import sys


REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGUAGES_DIR = os.path.join(REPO_ROOT, "src", "localize", "languages")
ENGLISH_FILE = os.path.join(LANGUAGES_DIR, "en.json")


def load_json(path: str) -> dict:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def cleanup(reference: dict, translation: dict) -> tuple[dict, int]:
    """Return *(cleaned, removed_count)*.

    *cleaned* contains only keys that exist in *reference*, ordered exactly
    like *reference*.  *removed_count* is the number of keys discarded from
    *translation*.
    """
    cleaned: dict = {}
    removed = 0

    for key, ref_value in reference.items():
        if key not in translation:
            continue  # missing key – leave for human translators
        trans_value = translation[key]
        if isinstance(ref_value, dict):
            if isinstance(trans_value, dict):
                sub_cleaned, sub_removed = cleanup(ref_value, trans_value)
                cleaned[key] = sub_cleaned
                removed += sub_removed
            else:
                removed += 1  # type mismatch – discard
        else:
            cleaned[key] = trans_value

    for key in translation:
        if key not in reference:
            removed += 1  # obsolete key

    return cleaned, removed


def filter_to_reference_keys(reference: dict, translation: dict) -> dict:
    """Like *cleanup* but preserves *translation* key order (for reorder detection)."""
    result: dict = {}
    for key, trans_value in translation.items():
        if key not in reference:
            continue
        ref_value = reference[key]
        if isinstance(ref_value, dict) and isinstance(trans_value, dict):
            result[key] = filter_to_reference_keys(ref_value, trans_value)
        elif not isinstance(ref_value, dict) and not isinstance(trans_value, dict):
            result[key] = trans_value
    return result


def count_leaf_keys(d: dict) -> int:
    """Count all non-dict (leaf) values recursively."""
    total = 0
    for v in d.values():
        if isinstance(v, dict):
            total += count_leaf_keys(v)
        else:
            total += 1
    return total


def serialize(d: dict) -> str:
    return json.dumps(d, ensure_ascii=False, indent=2) + "\n"


def progress_bar(pct: float, width: int = 10) -> str:
    filled = round(pct / 100 * width)
    return "█" * filled + "░" * (width - filled)


def main() -> int:
    if not os.path.isfile(ENGLISH_FILE):
        print(f"ERROR: English reference file not found: {ENGLISH_FILE}")
        return 1

    reference = load_json(ENGLISH_FILE)
    total_en_keys = count_leaf_keys(reference)

    pattern = os.path.join(LANGUAGES_DIR, "*.json")
    files = sorted(glob.glob(pattern))

    file_changes: list[dict] = []
    all_stats: list[tuple[str, int, float]] = []  # (code, count, pct)

    for filepath in files:
        filename = os.path.basename(filepath)
        code = filename[:-5]  # strip ".json"

        if filename == "en.json":
            all_stats.append((code, total_en_keys, 100.0))
            continue

        try:
            original = load_json(filepath)
        except json.JSONDecodeError as exc:
            print(f"  SKIP {filename}: invalid JSON – {exc}")
            continue

        cleaned, keys_removed = cleanup(reference, original)
        trans_count = count_leaf_keys(cleaned)
        pct = (trans_count / total_en_keys * 100) if total_en_keys else 0.0
        all_stats.append((code, trans_count, pct))

        original_serialized = serialize(original)
        cleaned_serialized = serialize(cleaned)

        if original_serialized == cleaned_serialized:
            print(f"  {filename}: OK")
            continue

        # Detect reordering: same keys after filtering, but different order.
        filtered_original = filter_to_reference_keys(reference, original)
        reordered = serialize(filtered_original) != serialize(cleaned)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(cleaned_serialized)

        parts: list[str] = []
        if keys_removed:
            parts.append(f"{keys_removed} obsolete key(s) removed")
        if reordered:
            parts.append("keys reordered")
        desc = ", ".join(parts) if parts else "reformatted"
        print(f"  {filename}: {desc}")

        file_changes.append(
            {
                "filename": filename,
                "code": code,
                "keys_removed": keys_removed,
                "reordered": reordered,
                "trans_count": trans_count,
                "pct": pct,
            }
        )

    print()
    if file_changes:
        print(f"Cleanup complete: {len(file_changes)} file(s) updated.")
    else:
        print("Cleanup complete: all translation files are already up-to-date.")

    if not file_changes:
        _set_github_outputs(changed=False, summary="")
        return 0

    # Build PR description
    lines: list[str] = [
        "## Translation Cleanup\n",
        "This automated PR removes obsolete translation keys and reorders "
        "translation files to match the English reference (`en.json`).\n",
        "---\n",
        "### Changes\n",
        "| File | Changes |",
        "| --- | --- |",
    ]
    for c in file_changes:
        parts = []
        if c["keys_removed"]:
            parts.append(f"{c['keys_removed']} key(s) removed")
        if c["reordered"]:
            parts.append("keys reordered")
        lines.append(f"| `{c['filename']}` | {', '.join(parts)} |")

    lines += [
        "",
        "---\n",
        "### Translation Progress\n",
        f"Reference: **en.json** — {total_en_keys} translations\n",
        "| File | Translations | Progress |",
        "| --- | --- | --- |",
    ]
    for code, count, pct in sorted(all_stats, key=lambda x: x[0]):
        bar = progress_bar(pct)
        lines.append(f"| `{code}.json` | {count}/{total_en_keys} | {bar} {pct:.1f}% |")

    lines.append("\n---\n\n*This PR was automatically created by the cleanup-translations workflow*")

    summary = "\n".join(lines) + "\n"
    _set_github_outputs(changed=True, summary=summary)

    return 0


def _set_github_outputs(changed: bool, summary: str) -> None:
    """Write step outputs when running inside GitHub Actions."""
    github_output = os.environ.get("GITHUB_OUTPUT")
    if not github_output:
        return
    with open(github_output, "a", encoding="utf-8") as f:
        f.write(f"changed={'true' if changed else 'false'}\n")
        if changed:
            f.write("summary<<GH_OUTPUT_EOF\n")
            f.write(summary)
            f.write("GH_OUTPUT_EOF\n")


if __name__ == "__main__":
    sys.exit(main())
