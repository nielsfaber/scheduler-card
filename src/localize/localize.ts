

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
import * as ro from './languages/ro.json';
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
  ro: ro,
  ru: ru,
};

export function localize(string: string, search: string | string[] = '', replace: string | string[] = '') {

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
    if(Array.isArray(search) || Array.isArray(replace)) {
      for(var i = 0; i < search.length; i++)  translated = translated.replace(search[i], replace[i]);
    } else {
      translated = translated.replace(search, replace);
    }
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



export const ServiceNameTranslations = {
  turn_on: 'services.turn_on',
  turn_off: 'services.turn_off',
  open_cover: 'services.open_cover',
  close_cover: 'services.close_cover',
  set_temperature: 'services.set_temperature',
  set_cover_position: 'services.set_position',
  set_hvac_mode: 'services.set_hvac_mode',
  set_preset_mode: 'services.set_preset_mode',
  set_value: 'services.set_value',
  select_option: 'services.select_option',
  select_source: 'services.select_source',
  start: 'services.start',
}


export const DomainNameTranslations = {
  camera: 'domains.camera',
  climate: 'domains.climate',
  cover: 'domains.cover',
  fan: 'domains.fan',
  group: 'domains.group',
  input_boolean: 'domains.input_boolean',
  input_number: 'domains.input_number',
  input_select: 'domains.input_select',
  light: 'domains.light',
  media_player: 'domains.media_player',
  scene: 'domains.scene',
  switch: 'domains.switch',
  vacuum: 'domains.vacuum'
}



export const ServiceParamTranslations = {
  brightness: 'service_parameters.brightness',
  position: 'service_parameters.position',
  temperature: 'service_parameters.temperature',
  hvac_mode: 'service_parameters.hvac_mode',
  preset: 'service_parameters.preset'
}

