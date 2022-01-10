import { HomeAssistant } from 'custom-card-helpers';
import { ETimeEvent } from '../../types';

export function stringToTime(string: string, hass: HomeAssistant) {
  if (string.match(/^([0-9:]+)$/)) {
    const parts = string.split(':').map(Number);
    return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
  }
  const res = parseRelativeTime(string);
  if (res) {
    const sunEntity = hass.states['sun.sun'];
    const ts_sunrise = stringToTime(sunEntity.attributes.next_rising, hass);
    const ts_sunset = stringToTime(sunEntity.attributes.next_setting, hass);

    let ts = res.event == 'sunrise' ? ts_sunrise : ts_sunset;
    ts = res.sign == '+' ? ts + stringToTime(res.offset, hass) : ts - stringToTime(res.offset, hass);
    return ts;
  }
  const ts = new Date(string);
  return ts.getHours() * 3600 + ts.getMinutes() * 60 + ts.getSeconds();
}

export function timeToString(time: number) {
  const hours = Math.floor(time / 3600);
  time -= hours * 3600;
  const minutes = Math.floor(time / 60);
  time -= minutes * 60;
  const seconds = Math.round(time);
  return (
    String(hours % 24).padStart(2, '0') +
    ':' +
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0')
  );
}

export function roundTime(
  value: number,
  stepSize: number,
  options: { wrapAround?: boolean; maxHours?: number } = { wrapAround: true }
) {
  let hours = value >= 0 ? Math.floor(value / 3600) : Math.ceil(value / 3600);
  let minutes = Math.floor((value - hours * 3600) / 60);

  if (minutes % stepSize != 0) minutes = Math.round(minutes / stepSize) * stepSize;

  if (minutes >= 60) {
    hours++;
    minutes -= 60;
  } else if (minutes < 0) {
    hours--;
    minutes += 60;
  }
  if (options.wrapAround) {
    if (hours >= 24) hours -= 24;
    else if (hours < 0) hours += 24;
  }
  const time = hours * 3600 + minutes * 60;
  if (options.maxHours) {
    if (time > options.maxHours * 3600) return options.maxHours * 3600;
    if (time < -options.maxHours * 3600) return -options.maxHours * 3600;
  }
  return time;
}

export function parseRelativeTime(time: string) {
  const match = time.match(/^([a-z]+)([\+|-]{1})([0-9:]+)$/);
  if (!match) return false;
  return {
    event: match[1] as ETimeEvent,
    sign: match[2],
    offset: match[3],
  };
}
