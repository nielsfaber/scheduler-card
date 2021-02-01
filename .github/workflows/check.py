# Setup
import glob
import json
from colorama import init, Fore, Style

init()
# Crossvalidator
english_file = json.load(open("./src/localize/languages/en.json"))
def cross_validate(english_value, other_language_value, other_language, key_name=None):
    if other_language_value is None:
      print(f"⚠ In {other_language}, there is no value for {key_name}.")
    if type(english_value) != type(other_language_value):
        raise Exception("The type of the English value and the type of {other_language}'s value are different.")
    print(english_value, other_language_value, other_language, key_name)
    for name, item in english_value.items():
        cross_validate(item, other_language_value.get(name), other_language, name)
                           
# The thing
for filename in glob.glob("./src/localize/languages/*.json"):
    try:
        cross_validate(english_file, json.load(open(filename, encoding="utf-8")), filename)
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
