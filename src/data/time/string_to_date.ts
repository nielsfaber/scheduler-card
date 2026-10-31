export function stringToDate(dateTimeString?: string) {
  let date = new Date();

  const dateMatch = (dateTimeString || '').match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/);
  if (dateMatch !== null) date.setFullYear(Number(dateMatch[1]), Number(dateMatch[2]) - 1, Number(dateMatch[3]));

  const timeMatch = (dateTimeString || '').match(/([0-9]{2}):([0-9]{2})(:([0-9]{2}))?$/);
  if (timeMatch !== null)
    date.setHours(
      Number(timeMatch[1]),
      Number(timeMatch[2]),
      timeMatch.length > 4 ? Number(timeMatch[4]) : date.getSeconds()
    );

  return date;
}
