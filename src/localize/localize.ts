

import * as de from './languages/de.json';
import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as et from './languages/et.json';
import * as fr from './languages/fr.json';
import * as hu from './languages/hu.json';
import * as nl from './languages/nl.json';
import * as no from './languages/no.json';
import * as pl from './languages/pl.json';
import * as pt_br from './languages/pt-br.json';
import * as ru from './languages/ru.json';

type HassElement = {
  hass?: any
}

var languages: any = {
  de: de,
  en: en,
  es: es,
  et: et,
  es_419: es,
  fr: fr,
  hu: hu,
  nb: no,
  nl: nl,
  nn: no,
  no: no,
  pl: pl,
  pt: pt_br,
  pt_BR: pt_br,
  ru: ru,
};

export function localize(string: string, search: string = '', replace: string = '') {

  const lang = getLanguage();

  var translated: string;

  try {
    if (lang == 'test') return 'TRANSLATED';
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
  let lang = localStorage.getItem('selectedLanguage')?.replace(/['"]+/g, '').replace('-', '_');
  if (!lang || lang == 'null') {
    const hass = (document.querySelector("home-assistant") as HassElement).hass;
    lang = hass.selectedLanguage || hass.language || "en"
  }
  return String(lang);
}