import * as cs from './languages/cs.json';
import * as de from './languages/de.json';
import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as et from './languages/et.json';
import * as fr from './languages/fr.json';
import * as he from './languages/he.json';
import * as hu from './languages/hu.json';
import * as it from './languages/it.json';
import * as nl from './languages/nl.json';
import * as no from './languages/no.json';
import * as pl from './languages/pl.json';
import * as pt from './languages/pt.json';
import * as pt_br from './languages/pt-br.json';
import * as ro from './languages/ro.json';
import * as ru from './languages/ru.json';
import * as uk from './languages/uk.json';

const languages: any = {
  cs: cs,
  de: de,
  en: en,
  es: es,
  et: et,
  es_419: es,
  fr: fr,
  he: he,
  hu: hu,
  it: it,
  nb: no,
  nl: nl,
  nn: no,
  no: no,
  pl: pl,
  pt: pt,
  pt_BR: pt_br,
  ro: ro,
  ru: ru,
  uk: uk,
};

export function localize(
  string: string,
  lang: string,
  search: string | (string | number)[] | number = '',
  replace: string | (string | number)[] | number = ''
) {
  let translated: string;
  try {
    if (lang == 'test') return 'TRANSLATED';
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
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
