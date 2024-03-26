# Contributing

Thank you for your interest in contributing to this project!
You can contribute to this project by submitting a PR with your changes.
Note that it may take between 1-4 weeks before your work can be reviewed and approved. 

## Building

* Install Node.js (latest LTS release).
  * On Linux, macOS, or Windows WSL, consider using [nvm.sh](https://github.com/nvm-sh/nvm/blob/master/README.md)
  * On Windows native, see [Nodejs.org](https://nodejs.org/)
* `git clone https://github.com/nielsfaber/scheduler-card.git`
* `cd scheduler-card`
* `npm install --no-package-lock`
* `npm start`  # To develop interactively
* `npm run build`  # Run lint, prettier, rollup (update 'dist/scheduler-card.js')

## Submitting new translations

If you would like to add a translation of the card in your native language, you can take the [english translation file](https://github.com/nielsfaber/scheduler-card/blob/main/src/localize/languages/en.json) as starting point and replace the texts on the right side of each line with local translation. Words within {curly brackets} should not be translated.
Note that a translation file should be complete before it can be accepted as PR.

## Submitting new features

If you wish to implement a new feature for this project, please first create a feature request to explain your idea and for further discussion/alignment.
This avoids the risk of spending effort on code which may not be adopted by the project.

## Warning!

Please note that a major rewrite of the codebase is ongoing as of March 2024. If you are
planning on submitting a significant contribution, get in touch to request a branch for
the new version to be published so that you can rebase your work on it.
