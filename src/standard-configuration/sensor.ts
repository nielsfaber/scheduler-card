import { HassEntity } from "home-assistant-js-websocket";


export const sensorIcon = (state: HassEntity) => {
  const deviceClass = state.attributes.device_class!;
  switch (deviceClass) {
    case "humidity":
      return "water-percent";
    case "illuminance":
      return "brightness-5";
    case "temperature":
      return "thermometer";
    case "power":
      return "flash";
    case "pressure":
      return "gauge";
    case "signal_strength":
      return "wifi"
    default:
      if (state.attributes.unit_of_measurement == "°C") return "thermometer";
      if (state.attributes.unit_of_measurement == "°F") return "thermometer";
      return "eye";
  }
};