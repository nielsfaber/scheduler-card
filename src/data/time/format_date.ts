import { FrontendLocaleData } from "../../lib/types";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(dateObj: Date, locale: FrontendLocaleData) {
  const isCurrentYear = dateObj.getFullYear() == new Date().getFullYear();

  const supportLocaleDateString = () => {
    try {
      new Date().toLocaleDateString("i");
    } catch (e: any) {
      return e.name === "RangeError";
    }
    return false;
  };

  const formatDateLegacy = (dateObj: Date, format: "year" | "month" | "day") => {
    switch (format) {
      case "year":
        return dateObj.getFullYear();
      case "month":
        return monthNames[dateObj.getMonth()];
      case "day":
        return dateObj.getDate();
    }
  };

  if (isCurrentYear) {
    if (supportLocaleDateString()) {
      return new Intl.DateTimeFormat(locale.language, {
        month: "long",
        day: "numeric",
      }).format(dateObj);
    } else return `${formatDateLegacy(dateObj, "month")} ${formatDateLegacy(dateObj, "day")}`;
  } else {
    if (supportLocaleDateString()) {
      return new Intl.DateTimeFormat(locale.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(dateObj);
    } else
      return `${formatDateLegacy(dateObj, "month")} ${formatDateLegacy(dateObj, "day")}, ${formatDateLegacy(dateObj, "year")}`;
  }
}

export function formatIsoDate(dateObj: Date) {
  return dateObj.toISOString().split("T")[0];
}
