# Setup
import glob
import json
from colorama import init, Fore, Style

init()
# Crossvalidator
english_file = json.load(open("./src/localize/languages/en.json"))
def cross_validate(english_value, other_language_value, other_language):
    if type(english_value) != type(other_language_value):
        print(f"In English, the type is {type(english_value)}, and the value is {english_value}.")
        print(f"In {other_language}, the type is {type(other_language_value)}, and the value is {other_language_value}.")
        raise Exception("The type of the English value and the type of this language's value are different.")
    if isinstance(english_value, dict):
        for name, item in english_value.items():
            cross_validate(item, other_language_value.get(name), other_language)
    elif isinstance(english_value, list):
        if len(english_value) != len(new_value):
            print(f"In English, the length is {len(english_value)}, and the value is {english_value}.")
            print(f"In {other_language}, the length is {len(other_language_value)}, and the value is {other_language_value}.")
            raise Exception("The length of the English list and the length of this language's list are different.")
        for index, item in enumerate(english_value):
            cross_validate(item, other_language_value[index], other_language)
                           
# The thing
for filename in glob.glob("./src/localize/languages/*.json"):
    try:
        cross_validate(english_file, json.load(open(filename, encoding="utf-8")))
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
    "were validated",
    Fore.GREEN
    + "successfully."
)
