import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";

@customElement("scheduler-settings-row")
class SchedulerSettingsRow extends LitElement {
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
          `
        : html`
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
      align-content: center;
    }
    .body > * {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      display: flex;
      justify-content: flex-end;
      flex: 1;
      padding: 8px 0;
    }
    // .content ::slotted(*) {
    //   width: var(--settings-row-content-width);
    // }
    .prefix-wrap {
      display: flex;
      flex-direction: row;
    }
    .prefix {
      display: flex;
      width: 48px;
    }
    .heading, .heading ::slotted(*) {
      display: flex;
      align-items: center;
      width: 150px;
    }
    @media all and (max-width: 450px) {
      :host {
        align-items: normal;
        flex-direction: column;
        border-top: 1px solid var(--divider-color);
        padding: 8px 16px;
      }
      .prefix-wrap {
        display: flex;
        align-items: center;
      }
      .content ::slotted(*) {
        width: 100%;
      }
    `;
  }
}
