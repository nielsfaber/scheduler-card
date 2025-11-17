import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators";

@customElement("scheduler-collapsible-section")
class SchedulerCollapsibleSection extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ attribute: true }) idx = -1;

  @property({ type: CustomEvent })
  openClose = new CustomEvent("open-close", {
    detail: {},
    bubbles: true,
    composed: true,
  });

  render() {
    return html`
      <div
        class="header ${this.expanded ? "expanded" : ""}"
        @click=${this._toggleContent}
        @focus=${this._focusChanged}
        @blur=${this._focusChanged}
        role="button"
        tabindex="0"
        aria-expanded=${this.expanded}
        aria-controls="sect1"
      >
        ${this.disabled
          ? ""
          : html` <ha-icon icon="mdi:chevron-down" class="chevron ${this.expanded ? "expanded" : ""}"></ha-icon> `}
        <slot name="header" class="title"></slot>
        <div id="contextMenu">
          <slot name="contextMenu"> </slot>
        </div>
      </div>

      <div class="container">
        <slot name="content"></slot>
      </div>
    `;
  }

  _toggleContent() {
    if (this.disabled) return;
    this.dispatchEvent(this.openClose);
  }

  attributeChangedCallback(name, oldval, newval) {
    let container: HTMLElement | undefined = undefined;
    if (this.shadowRoot !== null) {
      for (const child of this.shadowRoot!.children) {
        if (child.className == "container") {
          container = child as HTMLElement;
          break;
        }
      }
    }
    if (container) {
      if (this.hasAttribute("expanded")) {
        const scrollHeight = container.scrollHeight;
        container.style.height = `${scrollHeight}px`;
      } else {
        container.style.height = "0px";
      }
    }
    super.attributeChangedCallback(name, oldval, newval);
  }

  private _focusChanged(ev: Event) {
    if (this.disabled) return;
    this.shadowRoot!.querySelector(".header")!.classList.toggle("focused", ev.type === "focus");
  }

  static get styles() {
    return css`
      :host {
        display: block;
        border-radius: 12px;
        border: 1px solid var(--divider-color);
        box-sizing: border-box;
        margin: 8px 0px;
        position: relative;
      }
      .header {
        display: flex;
        width: 100%;
        border-radius: 12px;
        padding: 12px;
        box-sizing: border-box;
        cursor: pointer;
      }
      :host([disabled]) .header {
        cursor: default;
      }
      .header .title {
        font-weight: 600;
        padding: 0px 8px;
      }
      .header ::slotted(div) {
        flex: 1;
        margin-right: 32px;
      }
      .header.focused {
        background: var(--input-fill-color);
      }
      .header.expanded {
        border-radius: 12px 12px 0px 0px;
      }
      #contextMenu {
        position: absolute;
        right: 0px;
        top: 0px;
      }

      .chevron {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        direction: var(--direction);
        margin-left: 0px;
      }
      .chevron.expanded {
        transform: rotate(180deg);
      }
      .container {
        overflow: hidden;
        transition: height 300ms cubic-bezier(0.4, 0, 0.2, 1);
        padding: 0px 12px;
        box-sizing: border-box;
        height: 0px;
      }
      :host([disabled]) .container {
        height: auto;
      }
      .container.expanded {
        height: auto;
      }
      @media all and (max-width: 450px) {
        .container {
          padding: 0px;
        }
      }
    `;
  }
}

@customElement("scheduler-collapsible-group")
class SchedulerCollapsibleGroup extends LitElement {
  @property() disabled = false;

  @state() _openedItem: number = -1;

  @state() _numItems: number = 0;

  set openedItem(value: number | undefined) {
    if (value === this._openedItem || value === undefined) return;
    setTimeout(() => {
      this.updateOpenedItem(value);
    }, 50);
  }

  constructor() {
    super();
    this.addEventListener("open-close", this.toggleActiveSection);
  }

  firstUpdated() {
    const sections = this.querySelectorAll("scheduler-collapsible-section");
    this._numItems = sections.length;
  }

  toggleActiveSection(ev: Event) {
    if (this.disabled) return;
    const el = ev.target as HTMLElement;

    const itemIdx = Number(el.getAttribute("idx"));
    const expanded = el.getAttribute("expanded") === "true";
    if (!expanded) this.updateOpenedItem(itemIdx);
    else this.updateOpenedItem(-1);
  }

  updateOpenedItem(idx: number) {
    const sections = this.querySelectorAll("scheduler-collapsible-section");
    sections.forEach(function (item) {
      const itemIdx = Number(item.getAttribute("idx"));
      if (itemIdx !== idx && item.getAttribute("expanded")) item.removeAttribute("expanded");
      else if (itemIdx === idx && !item.getAttribute("expanded")) item.setAttribute("expanded", "true");
    });
    this._openedItem = idx;
    const myEvent = new CustomEvent("openclose-changed", { detail: { item: idx } });
    this.dispatchEvent(myEvent);
  }

  render() {
    return html` <slot></slot> `;
  }
}
