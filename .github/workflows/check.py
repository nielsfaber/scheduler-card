# Setup
import glob
import json
from colorama import init, Fore, Style

init()
# Crossvalidator
english_file = open("./src/localize/languages/en.json").read()
def cross_validate(english_value, new_value):
    if type(english_value) != type(new_value):
        print(f"English type: {type(english_value)} New type: {type(new_value)}")
        print(f"English value: {english_value} New value: {new_value}")
        raise Exception("The type of the english value and the type of the new value are different.")
    if is_instance(new_value, dict):
        for name, item in new_value.items():
            print(english_value[name], item)
            cross_validate(english_value[name], item)
    if is_instance(new_value, list):
        for index, item in enumerate(new_value):
            print(english_value[index], item)
            cross_validate(english_value[index], item)
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
