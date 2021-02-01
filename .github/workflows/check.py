# Setup
import glob
import json
from colorama import init, Fore, Style

init()
# Crossvalidator
english_file = json.load(open("./src/localize/languages/en.json"))
def cross_validate(english_value, new_value):
    if type(english_value) != type(new_value):
        print(f"English type: {type(english_value)} New type: {type(new_value)}")
        print(f"English value: {english_value} New value: {new_value}")
        raise Exception("The type of the english value and the type of the new value are different.")
    if isinstance(new_value, dict):
        for name, item in english_value.items():
            cross_validate(item, new_value.get(name))
    elif isinstance(new_value, list):
        if len(english_value) != len(new_value):
            print(f"English length: {len(english_value)} New length: {len(new_value)}")
            print(f"English value: {english_value} New value: {new_value}")
            raise Exception("The length of the english list and the length of the new list are different.")
        for index, item in enumerate(english_value):
            cross_validate(item, new_value[index])
    elif new_value is None:
        print(f"English value: {english_value}")
        raise Exception("The new value is none.")
                           
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
