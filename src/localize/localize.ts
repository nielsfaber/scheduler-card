import * as en from './languages/en.json';
import * as nl from './languages/nl.json';
import * as de from './languages/de.json';
import * as fr from './languages/fr.json';
import * as pl from './languages/pl.json';

var languages: any = {
  en: en,
  nl: nl,
  de: de,
  fr: fr,
  pl: pl,
};

export function localize(string: string, search: string = '', replace: string = '') {

  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');

  var translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}