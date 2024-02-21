import * as cs from './languages/cs.json';
import * as de from './languages/de.json';
import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as et from './languages/et.json';
import * as fi from './languages/fi.json';
import * as fr from './languages/fr.json';
import * as he from './languages/he.json';
import * as hu from './languages/hu.json';
import * as it from './languages/it.json';
import * as lv from './languages/lv.json';
import * as nl from './languages/nl.json';
import * as no from './languages/no.json';
import * as pl from './languages/pl.json';
import * as pt from './languages/pt.json';
import * as pt_br from './languages/pt-BR.json';
import * as ro from './languages/ro.json';
import * as ru from './languages/ru.json';
import * as sk from './languages/sk.json';
import * as sl from './languages/sl.json';
import * as uk from './languages/uk.json';
import * as zh_Hans from './languages/zh-Hans.json';
import { FrontendTranslationData } from 'custom-card-helpers';

const languages: any = {
  cs: cs,
  de: de,
  en: en,
  es: es,
  et: et,
  es_419: es,
  fi: fi,
  fr: fr,
  he: he,
  hu: hu,
  it: it,
  lv: lv,
  nb: no,
  nl: nl,
  nn: no,
  no: no,
  pl: pl,
  pt: pt,
  'pt-BR': pt_br,
  ro: ro,
  sk: sk,
  sl: sl,
  ru: ru,
  uk: uk,
  'zh-Hans': zh_Hans,
};

export function localize(
  string: string,
  locale: FrontendTranslationData,
  search: string | (string | number)[] | number = '',
  replace: string | (string | number)[] | number = ''
) {
  let translated: string;
  try {
    if (locale.language == 'test') return 'TRANSLATED';
    translated = string.split('.').reduce((o, i) => o[i], languages[locale.language]);
    if (!translated) translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  } catch (e) {
    try {
      translated = string.split('.').reduce((o, i) => o[i], languages['en']);
    } catch (e) {
      translated = '';
    }
  }

  if (search !== '' && replace !== '' && translated) {
    if (!Array.isArray(search)) search = [search];
    if (!Array.isArray(replace)) replace = [replace];
    for (let i = 0; i < (search as string[]).length; i++) {
      translated = translated.replace(String(search[i]), String(replace[i]));
      const res = translated.match(/\{if ([a-z]+) is ([^\}]+)\}\ ?([^\{]+)\ ?\{else\}\ ?([^\{]+)/i);
      if (res && String(search[i]).replace(/[\{\}']+/g, '') == res[1]) {
        const is_match = String(replace[i]) == res[2];
        if (is_match) translated = translated.replace(res[0], res[3]);
        else translated = translated.replace(res[0], res[4]);
      }
    }
  }

  // if (!translated) {
  //   console.log(`missing translation for ${string}`);
  // }
  return translated;
}
