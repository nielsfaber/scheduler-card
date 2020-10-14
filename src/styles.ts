import { css } from 'lit-element';

export const styles = css`
  /* list view */

  div.list-item {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: min-content min-content min-content min-content;
    grid-template-areas:
      'icon name switch'
      'icon action switch'
      'icon days switch'
      'icon time switch';
    grid-gap: 2px 20px;
    background: none;
    cursor: pointer;
    padding: 10px 20px;
    position: relative;
    z-index: 1;
  }

  div.list-item:before {
    content: ' ';
    background: var(--list-item-background-color);
    opacity: 0.1;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  div.list-item:hover:before {
    background: var(--primary-color);
    border-radius: 4px;
  }

  div.list-item-icon {
    grid-area: icon;
    color: var(--state-icon-color);
  }

  div.list-item-icon ha-icon {
    width: 24px;
    height: 24px;
  }

  div.list-item-icon.enabled {
    color: var(--state-icon-active-color);
  }

  div.list-item-switch {
    grid-area: switch;
  }

  div.list-item-switch ha-switch {
    margin-top: 3px;
  }

  div.list-item-name {
    grid-area: name;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  div.list-item-action {
    grid-area: action;
    color: var(--secondary-text-color);
  }

  div.list-item-days {
    grid-area: days;
    color: var(--secondary-text-color);
  }

  div.list-item-time {
    grid-area: time;
    color: var(--secondary-text-color);
  }

  div.disabled div.list-item-icon,
  div.disabled div.list-item-name,
  div.disabled div.list-item-action,
  div.disabled div.list-item-days,
  div.disabled div.list-item-time {
    color: var(--disabled-text-color);
  }

  /* add/edit view */

  div.header {
    color: var(--secondary-text-color);
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    margin: 0px 0px 0px 0px;
  }

  div.card-section {
    padding: 10px 10px;
  }

  div.card-section.first {
    padding-top: 0px;
  }

  div.card-section.last {
    padding-bottom: 10px;
  }

  div.text-field {
    color: var(--disabled-text-color);
  }

  div.summary {
    display: grid;
    grid-template-columns: 1fr max-content 1fr;
    grid-template-areas: 'entity arrow action';
    grid-auto-flow: column;
    grid-gap: 5px;
  }

  div.summary-entity {
    grid-area: entity;
  }
  div.summary-action {
    grid-area: action;
  }
  div.summary-text {
    grid-area: text;
  }
  div.summary-icon {
    grid-area: icon;
  }
  div.summary-arrow {
    grid-area: arrow;
    color: var(--secondary-text-color);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.summary-entity,
  div.summary-action {
    color: var(--dark-primary-color);
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
    --mdc-icon-size: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-areas: 'icon text';
    grid-auto-flow: column;
    grid-gap: 10px;
  }

  div.summary-entity:before,
  div.summary-action:before {
    content: ' ';
    background: var(--primary-color);
    opacity: 0.15;
    border-radius: 4px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  div.summary-text::first-letter {
    text-transform: uppercase;
  }

  div#day-list-custom.closed {
    display: none;
  }

  div#day-list-custom {
    overflow: hidden;
    max-height: 100px; /* approximate max height */
    transition-property: all;
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }

  mwc-button {
    margin: 2px 0px;
  }

  mwc-button.active {
    background: var(--primary-color);
    --mdc-theme-primary: var(--text-primary-color);
    border-radius: 4px;
  }

  div.option-item {
    padding: 2px 5px;
    display: flex;
    align-items: center;
  }

  .padded-right {
    margin-right: 11px;
  }

  mwc-button.warning {
    --mdc-theme-primary: var(--error-color);
  }
`;

export default styles;
