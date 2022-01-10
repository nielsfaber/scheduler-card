export function weekday(ts: Date) {
  let day = ts.getDay();
  if (day == 0) day = 7;
  return day;
}
