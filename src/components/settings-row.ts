import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators';


@customElement('settings-row')
class SettingsRow extends LitElement {

  @property({ type: Boolean }) showPrefix = false;

  render() {
    return html`
      ${this.showPrefix
        ? html`
      <div class="prefix-wrap">
        <div class="prefix"><slot name="prefix"></slot></div>
        <div class="body">
          <div class="heading"><slot name="heading"></slot></div>
          <div class="secondary"><slot name="description"></slot></div>
        </div>
      </div>
      `  : html`
      <div class="body">
        <div class="heading"><slot name="heading"></slot></div>
        <div class="secondary"><slot name="description"></slot></div>
      </div>
      `}
      <div class="content"><slot></slot></div>
    `;
  }

  static get styles() {
    return css`

    :host {
      display: flex;
      padding: 0px;
      align-content: normal;
      align-self: auto;
      align-items: center;
    }
    .body {
      padding-top: 0px;
      padding-bottom: 0px;
      padding-left: 0;
      padding-inline-start: 0;
      padding-right: 16x;
      padding-inline-end: 16px;
      overflow: hidden;
      display: var(--layout-vertical_-_display);
      flex-direction: var(--layout-vertical_-_flex-direction);
      justify-content: var(--layout-center-justified_-_justify-content);
      flex: var(--layout-flex_-_flex);
      flex-basis: var(--layout-flex_-_flex-basis);
    }
    .body > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      display: contents;
      display: var(--settings-row-content-display, flex);
      justify-content: flex-end;
      flex: 1;
      padding: 8px 0;
    }
    .content ::slotted(*) {
      width: var(--settings-row-content-width);
    }
    .prefix-wrap {
      display: contents;
    }
    .prefix {
      display: flex;
      width: 48px;
    }
    .heading, .heading ::slotted(*) {
      display: flex;
      align-items: center;
    }
    `;
  }
}
