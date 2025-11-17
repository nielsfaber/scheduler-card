import { LitElement, html } from "lit";
import { property, customElement } from "lit/decorators.js";
import { localize } from "../localize/localize";
import { FrontendLocaleData, HomeAssistant, TimeFormat } from "../lib/types";
import { capitalizeFirstLetter } from "../lib/capitalize_first_letter";
import { formatDate } from "../data/time/format_date";
import { selectUnit } from "@formatjs/intl-utils";
import { computeDayDisplay } from "../data/format/compute_days_display";
import { convertTo12Hour, useAmPm } from "../lib/use_am_pm";
import { hassLocalize } from "../localize/hassLocalize";

const secondsPerMinute = 60;
const secondsPerHour = 3600;
const hoursPerDay = 24;

const formatTime = (
  dateObj: Date,
  locale: FrontendLocaleData,
  formatOption?: TimeFormat.am_pm | TimeFormat.twenty_four
) => {
  const supportLocaleString = () => {
    try {
      new Date().toLocaleTimeString("i");
    } catch (e) {
      return (e as any).name === "RangeError";
    }
    return false;
  };

  if (formatOption === TimeFormat.am_pm || (!formatOption && locale.time_format === TimeFormat.am_pm)) {
    const amPm = convertTo12Hour(dateObj.getHours()).am_pm;
    const hours12 = convertTo12Hour(dateObj.getHours()).hours;
    return `${hours12}:${String(dateObj.getMinutes()).padStart(2, "0")} ${amPm}`;
  }
  if (formatOption === TimeFormat.twenty_four || (!formatOption && locale.time_format === TimeFormat.twenty_four)) {
    return `${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
  }

  if (supportLocaleString()) {
    return dateObj.toLocaleTimeString(locale.language, {
      hour: "numeric",
      minute: "2-digit",
      hour12: useAmPm(locale),
    });
  }
  return useAmPm(locale)
    ? formatTime(dateObj, locale, TimeFormat.am_pm)
    : formatTime(dateObj, locale, TimeFormat.twenty_four);
};

@customElement("scheduler-relative-time")
export class SchedulerRelativeTime extends LitElement {
  @property() _hass?: HomeAssistant;
  @property() datetime?: Date;

  updateInterval = 60;
  timer = 0;

  startRefreshTimer(updateInterval: number) {
    clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      this.requestUpdate();
    }, updateInterval * 1000);
    this.updateInterval = updateInterval;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.startRefreshTimer(this.updateInterval); //restart
  }

  relativeTime(dateObj: Date): string {
    if (!this._hass) return "";
    const now = new Date();
    let delta = (now.getTime() - dateObj.getTime()) / 1000;
    const tense = delta >= 0 ? "past" : "future";
    delta = Math.abs(delta);
    const roundedDelta = Math.round(delta);

    if (tense == "future" && roundedDelta > 0) {
      if (delta / secondsPerHour >= 6) {
        const startOfToday = now.setHours(0, 0, 0, 0);
        const daysFromNow = Math.floor(
          (dateObj.valueOf() - startOfToday.valueOf()) / (hoursPerDay * secondsPerHour * 1000)
        );
        let day = "";
        if (daysFromNow > 14) {
          //October 12
          day = formatDate(dateObj, this._hass.locale);
        } else if (daysFromNow > 7) {
          //Next Friday
          day = localize(
            "ui.components.date.next_week_day",
            this._hass,
            "{weekday}",
            computeDayDisplay(dateObj, "long", this._hass)
          );
        } else if (daysFromNow == 1) {
          //Tomorrow
          day = localize("ui.components.date.tomorrow", this._hass);
        } else if (daysFromNow > 0) {
          //Friday
          day = computeDayDisplay(dateObj, "long", this._hass);
        }

        let time = localize(
          "ui.components.time.absolute",
          this._hass,
          "{time}",
          formatTime(dateObj, this._hass.locale)
        );

        if (dateObj.getHours() == 12 && dateObj.getMinutes() == 0) {
          time = localize("ui.components.time.at_noon", this._hass);
        } else if (dateObj.getHours() == 0 && dateObj.getMinutes() == 0) {
          time = localize("ui.components.time.at_midnight", this._hass);
        }
        return String(day + " " + time).trim();
      } else if (Math.round(delta / secondsPerMinute) > 60 && Math.round(delta / secondsPerMinute) < 120) {
        // in 1 hour and 52 minutes
        const mins = Math.round(delta / secondsPerMinute - 60);
        const join = hassLocalize("ui.common.and", this._hass);

        const text1 = new Intl.RelativeTimeFormat(this._hass.language, { numeric: "auto" }).format(1, "hour");
        const text2 = Intl.NumberFormat(this._hass.locale.language, {
          style: "unit",
          unit: "minute",
          unitDisplay: "long",
        }).format(mins);

        return `${text1} ${join} ${text2}`;
      } else if (Math.round(delta) > 60 && Math.round(delta) < 120) {
        // in 1 minute and 52 seconds
        const seconds = Math.round(delta - 60);
        const join = hassLocalize("ui.common.and", this._hass);

        const text1 = new Intl.RelativeTimeFormat(this._hass.language, { numeric: "auto" }).format(1, "minute");
        const text2 = Intl.NumberFormat(this._hass.locale.language, {
          style: "unit",
          unit: "second",
          unitDisplay: "long",
        }).format(seconds);

        return `${text1} ${join} ${text2}`;
      }
    }

    // in 5 minutes/hours/seconds (or now)
    const diff = selectUnit(dateObj);
    return new Intl.RelativeTimeFormat(this._hass.language, { numeric: "auto" }).format(diff.value, diff.unit);
  }

  render() {
    if (!this._hass || !this.datetime) return html``;

    const now = new Date();
    const secondsRemaining = Math.round((this.datetime.valueOf() - now.valueOf()) / 1000);
    let updateInterval = 60;
    if (Math.abs(secondsRemaining) <= 150) updateInterval = Math.max(Math.ceil(Math.abs(secondsRemaining)) / 10, 2);
    if (this.updateInterval != updateInterval) this.startRefreshTimer(updateInterval);

    return html` ${capitalizeFirstLetter(this.relativeTime(this.datetime))} `;
  }
}
