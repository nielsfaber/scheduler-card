# Setup
import glob
import json
from colorama import init, Fore, Style

init()
# The thing
for filename in glob.glob(r"./src/localize/languages/*.json"):
    try:
        json.load(open(filename, encoding="utf-8"))
    except json.decoder.JSONDecodeError as e:
        print(
            "❗ The file",
            Style.BRIGHT + filename,
            Style.DIM + Fore.RED + "contains invalid JSON.",
            Style.RESET_ALL + "Please fix it before merging this PR.",
        )
        print(
            "You may need to add a",
            Fore.GREEN + "comma at the end of a line" + Fore.WHITE,
            "before adding another line.",
        )
        print(
            "The error is",
            Style.BRIGHT + Fore.RED + str(e).replace("Expecting", "expecting"),
        )
        raise e
print(
    "🎉 All JSON files in",
    Style.BRIGHT + "src/localize/languages" + Style.DIM,
    "were loaded",
    Fore.GREEN
    + "successfully"
    + Fore.WHITE
    + ". They might not have everything they need, but they're all valid.",
)
