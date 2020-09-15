import * as en from './languages/en.json';
import * as nl from './languages/nl.json';
import * as de from './languages/de.json';
import * as fr from './languages/fr.json';
import * as pl from './languages/pl.json';
import * as no from './languages/no.json';
import * as es from './languages/es.json';
import * as ru from './languages/ru.json';

var languages: any = {
  en: en,
  nl: nl,
  de: de,
  fr: fr,
  pl: pl,
  no: no,
  es: es,
  es_419: es,
  ru: ru,
};

export function localize(string: string, search: string = '', replace: string = '') {

  const lang = getLanguage();

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

export function getLanguage(): string {
  return (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
}