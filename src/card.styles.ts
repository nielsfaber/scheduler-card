import { css } from 'lit';

export const EditorDialogStyles = css`
  ha-dialog {
    --justify-action-buttons: space-between;
    --dialog-container-padding: var(--safe-area-inset-top, 0) var(--safe-area-inset-right, 0)
      var(--safe-area-inset-bottom, 0) var(--safe-area-inset-left, 0);
    --dialog-surface-padding: 0px;
    --dialog-content-padding: 0px;
  }
  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog {
      --dialog-container-padding: 0px;
      --dialog-surface-padding: var(--safe-area-inset-top, 0) var(--safe-area-inset-right, 0)
        var(--safe-area-inset-bottom, 0) var(--safe-area-inset-left, 0);
      --vertical-align-dialog: flex-end;
      --ha-dialog-border-radius: var(--ha-border-radius-square);
    }
  }
  @media all and (min-width: 600px) and (min-height: 501px) {
    ha-dialog {
      --dialog-surface-margin-top: 40px;
      --vertical-align-dialog: flex-start;
    }
  }
  .buttons {
    box-sizing: border-box;
    display: flex;
    padding: 16px 24px;
    justify-content: space-between;
    background-color: var(--mdc-theme-surface, #fff);
    border-top: 1px solid var(--divider-color);
  }
  .content {
    padding: 0px 24px 16px 24px;
  }
`;

export const styles = css`
  .error {
    color: red;
  }
  .dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .dt {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }
  .dd {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, auto) minmax(0, 2fr));
    margin: 0;
  }
  .toggle {
    padding: 0.6em;
    border: grey;
    border-radius: 50%;
  }
  .toggle.on {
    background-color: green;
  }
  .toggle.off {
    background-color: red;
  }
  .button {
    display: block;
    border: outset 0.2em;
    border-radius: 50%;
    border-color: silver;
    background-color: silver;
    width: 1.4em;
    height: 1.4em;
  }
  .value {
    padding-left: 0.5em;
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }
`;
