import { FrontendTranslationData } from 'custom-card-helpers';
import { format } from 'fecha';

export enum TimeFormat {
  language = 'language',
  system = 'system',
  am_pm = '12',
  twenty_four = '24',
}

export interface FrontendLocaleData extends FrontendTranslationData {
  time_format?: TimeFormat;
}

export const formatAmPm = (locale: FrontendLocaleData): boolean => {
  if (locale.time_format === TimeFormat.language || locale.time_format === TimeFormat.system) {
    const testLanguage = locale.time_format === TimeFormat.language ? locale.language : undefined;
    const test = new Date().toLocaleString(testLanguage);
    return test.includes('AM') || test.includes('PM');
  }
  return locale.time_format === TimeFormat.am_pm;
};

export function formatTime(
  dateObj: Date,
  locale: FrontendLocaleData,
  formatOption?: TimeFormat.am_pm | TimeFormat.twenty_four
) {
  const supportLocaleString = () => {
    try {
      new Date().toLocaleTimeString('i');
    } catch (e) {
      return (e as any).name === 'RangeError';
    }
    return false;
  };

  if (formatOption === TimeFormat.am_pm || (!formatOption && locale.time_format === TimeFormat.am_pm)) {
    return format(dateObj, 'h:mm A'); // '5:30 AM'
  }
  if (formatOption === TimeFormat.twenty_four || (!formatOption && locale.time_format === TimeFormat.twenty_four)) {
    return format(dateObj, 'shortTime'); // '05:30'
  }

  if (supportLocaleString()) {
    return dateObj.toLocaleTimeString(locale.language, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: formatAmPm(locale),
    });
  }
  return formatAmPm(locale)
    ? formatTime(dateObj, locale, TimeFormat.am_pm)
    : formatTime(dateObj, locale, TimeFormat.twenty_four);
}
