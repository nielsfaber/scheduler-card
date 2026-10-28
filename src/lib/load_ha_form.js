
export const loadHaForm = async () => {
  if (
    customElements.get("ha-checkbox") &&
    customElements.get("ha-slider") &&
    customElements.get("ha-generic-picker") &&
    customElements.get("ha-list-item")
  ) return;

  await customElements.whenDefined("partial-panel-resolver");
  const ppr = document.createElement('partial-panel-resolver');
  ppr.hass = {
    panels: [{
      url_path: "tmp",
      component_name: "config",
    }]
  };
  ppr._updateRoutes();
  await ppr.routerOptions.routes.tmp.load();

  await customElements.whenDefined("ha-panel-config");
  const cpr = document.createElement("ha-panel-config");
  await cpr.routerOptions.routes.automation.load();

  // Since HA 2026.10 the automation editor no longer pulls in ha-list-item;
  // the person page still imports it.
  if (!customElements.get("ha-list-item")) {
    await cpr.routerOptions.routes.person.load();
  }
}