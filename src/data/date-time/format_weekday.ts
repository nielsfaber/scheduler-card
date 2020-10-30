



function supportLocaleString() {
  try {
    new Date().toLocaleDateString("i");
  } catch (e) {
    return e.name === "RangeError";
  }
  return false;
}


export const weekdayArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


function getWeekday(dateObj: Date | number, _locales: string, short?: boolean) {
  if (typeof dateObj !== "object") {
    let date = new Date(2017, 1, 26);
    date.setDate(date.getDate() + dateObj);
    dateObj = date;
  }
  let weekday = dateObj.getDay();
  return short ? weekdayArray[weekday].substr(0, 3) : weekdayArray[weekday];
}


export const formatWeekday = supportLocaleString()
  ? (dateObj: Date | number, locales: string, short?: boolean) => {
    if (typeof dateObj !== "object") {
      let date = new Date(2017, 1, 26);
      date.setDate(date.getDate() + dateObj);
      dateObj = date;
    }
    return dateObj.toLocaleDateString(locales, {
      weekday: short ? "short" : "long",
    })
  }
  : (dateObj: Date | number, locales: string, short?: boolean) => getWeekday(dateObj, locales, short);



