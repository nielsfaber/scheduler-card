import "@material/mwc-checkbox";
import type { Checkbox } from "@material/mwc-checkbox";
import { customElement } from "lit-element";

type Constructor<T = {}> = new (...args: any[]) => T;

const MwcCheckbox = customElements.get("mwc-checkbox") as Constructor<Checkbox>;

@customElement("ha-checkbox")
export class HaCheckbox extends MwcCheckbox {
  public firstUpdated() {
    super.firstUpdated();
    this.style.setProperty("--mdc-theme-secondary", "var(--primary-color)");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-checkbox": HaCheckbox;
  }
}