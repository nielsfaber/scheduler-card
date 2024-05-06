import { format } from 'fecha';
import { FrontendLocaleData } from '../../lib/types';

export function formatDate(dateObj: Date, locale: FrontendLocaleData) {
  const isCurrentYear = dateObj.getFullYear() == new Date().getFullYear();

  const supportLocaleDateString = () => {
    try {
      new Date().toLocaleDateString('i');
    } catch (e: any) {
      return e.name === 'RangeError';
    }
    return false;
  };

  if (isCurrentYear) {
    if (supportLocaleDateString()) {
      return new Intl.DateTimeFormat(locale.language, {
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
    } else return format(dateObj, 'MMMM D');
  } else {
    if (supportLocaleDateString()) {
      return new Intl.DateTimeFormat(locale.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
    } else return format(dateObj, 'MMMM D, YYYY');
  }
}

export function formatIsoDate(dateObj: Date) {
  return format(dateObj, 'isoDate');
}