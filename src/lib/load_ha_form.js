
export const loadHaForm = async () => {
  if (customElements.get("ha-checkbox") && customElements.get("ha-slider") && customElements.get("ha-generic-picker") && customElements.get("ha-selector")) return;

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

  // the automation route chunk registers the panel but not ha-form/ha-selector
  // (those sit in deeper lazy chunks); force-load them through the card helpers,
  // so ha-selector (and through it, the target selector) is available
  if (!customElements.get("ha-selector") && window.loadCardHelpers) {
    try {
      const helpers = await window.loadCardHelpers();
      const card = await helpers.createCardElement({ type: "entities", entities: [] });
      if (card && card.constructor && card.constructor.getConfigElement) {
        await card.constructor.getConfigElement();
      }
    } catch (e) {
      // non-fatal: scheduler-target-picker has its own availability fallbacks
    }
  }
}
