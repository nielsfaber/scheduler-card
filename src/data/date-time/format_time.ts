


function supportLocaleString() {
  try {
    new Date().toLocaleTimeString("i");
  } catch (e) {
    return e.name === "RangeError";
  }
  return false;
}

export function format(time: Date) {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0');
}

export const formatTime = supportLocaleString()
  ? (dateObj: Date, locales: string) =>
    dateObj.toLocaleTimeString(locales, {
      hour: "numeric",
      minute: "2-digit",
    })
  : (dateObj: Date) => format(dateObj)

export const formatAmPm = (locale: string) => supportLocaleString() ? new Date().toLocaleTimeString(locale).includes("M") : false;