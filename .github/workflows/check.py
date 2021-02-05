# Setup
import glob
import json
from colorama import init, Fore, Style

init()
from icu import Locale

# Crossvalidator
try:
    english_file = open("./src/localize/languages/en.json")
except FileNotFoundError as e:
    print(
        "❗ The original English file was deleted. It needs to be there in order for this PR to be merged."
    )
    raise e
try:
    english_file = json.load(english_file)
except json.decoder.JSONDecodeError as e:
    print(
        "❗ The original English file contains invalid JSON. It needs to be fixed before this PR can be merged."
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
english_lang = Locale("en_US")


def cross_validate(english_value, other_language_value, other_language, key_name=None):
    this_lang = other_language.split("/")[-1].split(".js")[0].replace("-", "_")
    this_lang = Locale(this_lang).getDisplayName(english_lang)
    if other_language_value is None:
        print(
            "🟡 In" + Style.BRIGHT + Fore.YELLOW,
            f"{this_lang}" + Style.RESET_ALL,
            f"there is no value for {Fore.YELLOW + key_name + Fore.WHITE}.",
        )
    elif type(english_value) != type(other_language_value):
        raise Exception(
            f"The type of the English value ({english_value}) and the type of"
            + f"{this_lang}'s value ({other_language_value}) are different for key {key_name}."
        )
    elif isinstance(english_value, dict):
        for name, item in english_value.items():
            cross_validate(item, other_language_value.get(name), other_language, name)


# The thing
for filename in glob.glob("./src/localize/languages/*.json"):
    try:
        file = json.load(open(filename, encoding="utf-8"))
        cross_validate(english_file, file, filename)
    except json.decoder.JSONDecodeError as e:
        print(
            "❗ The file",
            Style.BRIGHT + filename,
            Style.DIM + Fore.RED + "contains invalid JSON.",
            Style.RESET_ALL + "It needs to be fixed before this PR can be merged.",
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
    Style.BRIGHT + Fore.BLUE + "src/localize/languages" + Style.RESET_ALL,
    "were validated",
    Fore.GREEN + "successfully.",
)
