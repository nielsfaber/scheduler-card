import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators";


@customElement("scheduler-chip-set")
export class SchedulerChipSet extends LitElement {


  protected render(): TemplateResult {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "scheduler-chip-set": SchedulerChipSet;
  }
}

@customElement("scheduler-chip")
export class SchedulerChip extends LitElement {

  protected render(): TemplateResult {
    return html`
      <div class="chip">
        <span class="label">
          <slot name="label"></slot>
        </span>
      </div>
    `;
  }

  static styles = css`
    .chip {
    
        height: 32px;
        border-radius: 16px;
        border: 2px solid rgba(var(--rgb-primary-color), 0.54);
        line-height: 1.25rem;
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0px 12px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        margin: 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "scheduler-chip": SchedulerChip;
  }
}