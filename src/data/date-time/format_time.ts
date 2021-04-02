import { formatTime as formatTimeFallback } from 'custom-card-helpers';

export const formatTime = (date: Date, locale: string, options: Intl.DateTimeFormatOptions = {}): string => {
  const supportLocaleString = () => {
    try {
      new Date().toLocaleTimeString("i");
    } catch (e) {
      return e.name === "RangeError";
    }
    return false;
  }

  if (supportLocaleString()) {
    return date.toLocaleTimeString(undefined, {
      ...options,
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  else if (options.hour12) {
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0');
  }
  else {
    return formatTimeFallback(date, locale);
  }
}

export const formatAmPm = (locale: string) => formatTime(new Date(), locale).includes("M");
