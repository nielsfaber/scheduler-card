import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators';

// Same slots and attributes as the ha-list-item the dialogs used, so the card
// does not depend on HA's internal (and lazily loaded) list elements.
@customElement('scheduler-list-item')
export class SchedulerListItem extends LitElement {
  @property({ reflect: true }) graphic?: string;
  @property({ type: Boolean, reflect: true }) twoline = false;
  @property({ type: Boolean, reflect: true }) hasMeta = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) noninteractive = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) this.setAttribute('role', 'listitem');
    this.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeydown);
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('disabled') || changedProps.has('noninteractive')) {
      if (this.disabled || this.noninteractive) this.removeAttribute('tabindex');
      else this.setAttribute('tabindex', '0');
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  private _handleKeydown(ev: KeyboardEvent) {
    if (ev.target !== this || this.disabled || this.noninteractive) return;
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.click();
    }
  }

  render() {
    return html`
      ${this.graphic ? html`<span class="graphic"><slot name="graphic"></slot></span>` : ''}
      <span class="text">
        ${
          this.twoline
            ? html`
                <span class="primary">
                  <slot></slot>
                </span>
                <span class="secondary">
                  <slot name="secondary"></slot>
                </span>
              `
            : html`<slot></slot>`
        }
      </span>
      ${this.hasMeta ? html`<span class="meta"><slot name="meta"></slot></span>` : ''}
    `;
  }

  static styles = css`
    :host {
      display: flex;
      position: relative;
      align-items: center;
      box-sizing: border-box;
      height: 48px;
      padding: 0px var(--scheduler-list-side-padding, 20px);
      overflow: hidden;
      outline: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      font-family: var(--ha-font-family-body, Roboto, sans-serif);
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-normal, 400);
      line-height: 1.5;
      letter-spacing: 0.009375em;
      color: var(--primary-text-color);
    }
    :host([twoline]) {
      height: 72px;
    }
    :host::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--primary-text-color);
      opacity: 0;
      pointer-events: none;
      transition: opacity 15ms linear;
    }
    :host(:hover)::before {
      opacity: 0.04;
    }
    :host(:focus-visible)::before,
    :host(:active)::before {
      opacity: 0.12;
    }
    :host([disabled]),
    :host([noninteractive]) {
      cursor: default;
    }
    :host([disabled]) {
      color: var(--disabled-text-color);
      pointer-events: none;
    }
    :host([disabled])::before,
    :host([noninteractive])::before {
      display: none;
    }
    .graphic {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      line-height: 24px;
      margin-inline-end: 20px;
      color: var(--secondary-text-color);
    }
    :host([twoline]) .graphic {
      margin-inline-end: 16px;
    }
    .text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :host([twoline]) .text {
      align-self: flex-start;
    }
    /* Baselines at 32px and 52px from the top, as in Material's two-line list */
    .primary,
    .secondary {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: normal;
    }
    .primary {
      margin-bottom: -20px;
    }
    .primary::before,
    .primary::after,
    .secondary::before {
      content: '';
      display: inline-block;
      width: 0;
    }
    .primary::before {
      height: 32px;
    }
    .primary::after {
      height: 20px;
      vertical-align: -20px;
    }
    .secondary {
      font-size: 0.875em;
      letter-spacing: 0.0178571429em;
      color: var(--secondary-text-color);
    }
    .secondary::before {
      height: 20px;
    }
    .meta {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      flex-shrink: 0;
      width: var(--scheduler-list-item-meta-size, auto);
      margin-inline-start: auto;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'scheduler-list-item': SchedulerListItem;
  }
}
