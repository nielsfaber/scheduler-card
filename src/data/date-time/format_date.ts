import { format } from 'fecha';
import { FrontendLocaleData } from './format_time';

export function formatDate(dateObj: Date, locale: FrontendLocaleData, isoFormat?: boolean) {
  const isCurrentYear = dateObj.getFullYear() == new Date().getFullYear();

  const supportLocaleDateString = () => {
    try {
      new Date().toLocaleDateString('i');
    } catch (e) {
      return e.name === 'RangeError';
    }
    return false;
  };

  if (isoFormat) return format(dateObj, 'isoDate');

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
