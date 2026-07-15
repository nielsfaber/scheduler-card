import { LitElement, html, css, CSSResultGroup, PropertyValues } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { CardConfig, Schedule, TRepeatType } from '../types';
import { formatIsoDate } from '../data/time/format_date';
import { stringToDate } from '../data/time/string_to_date';
import { localize } from '../localize/localize';
import { HomeAssistant } from '../lib/types';
import { fireEvent } from '../lib/fire_event';
import { fetchTags } from '../data/store/fetch_tags';
import { SelectSelector } from '../lib/selector';
import { hassLocalize } from '../localize/hassLocalize';

import '../components/scheduler-settings-row';
import '../components/scheduler-combo-selector';

@customElement('scheduler-options-panel')
export class SchedulerOptionsPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  @state() schedule!: Schedule;


  @state()
  startDate = '';

  @state()
  endDate = '';

  @property()
  tags: string[] = [];

  @state() customTagValue: String = '';

  async firstUpdated() {
    (await (window as any).loadCardHelpers()).importMoreInfoControl('input_datetime');

    this.startDate = this.schedule?.start_date || formatIsoDate(new Date());
    this.endDate = this.schedule?.end_date || formatIsoDate(new Date());

    const tagEntries = await fetchTags(this.hass!);
    const storedTags = tagEntries.map(e => e.name);
    const configTags = [this.config.tags || []].flat();
    this.tags = [...new Set([
      ...storedTags,
      ...configTags.filter(e => !storedTags.includes(e) && !['none', 'disabled', 'enabled'].includes(e)),
    ])];
  }

  shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.get('schedule')) {
      this.dispatchEvent(
        new CustomEvent('change', { detail: { schedule: this.schedule } })
      );
    }
    return true;
  }

  render() {
    const tagSelector = <SelectSelector>{
      select: {
        options: this.tags,
        multiple: true,
        custom_value: true
      }
    };

    return html`
      <span class="header first">${localize('ui.panel.options.period.header', this.hass)}:</span>
      <div class="period">
        <div>
          <ha-checkbox
            ?checked=${typeof this.schedule.start_date === 'string'}
            @change=${this.toggleEnableDateRange}
          >
          </ha-checkbox>
        </div>
        <div>
          <span>${localize('ui.panel.options.period.start_date', this.hass)}</span>
        </div>
        <div class="input">
          <ha-date-input
            .locale=${this.hass.locale}
            value=${this.startDate}
            .label=${hassLocalize('ui.components.date-range-picker.start_date', this.hass)}
            @value-changed=${this._setStartDate}
            ?disabled=${!this.schedule.start_date}
          >
          </ha-date-input>
        </div>
        <div>
          <span>${localize('ui.panel.options.period.end_date', this.hass)}</span>
        </div>
        <div class="input">
          <ha-date-input
            .locale=${this.hass.locale}
            value=${this.endDate}
            .label=${hassLocalize('ui.components.date-range-picker.end_date', this.hass)}
            @value-changed=${this._setEndDate}
            ?disabled=${!this.schedule.end_date}
          >
          </ha-date-input>
        </div>
      </div>

      <span class="header">${localize('ui.panel.options.tags', this.hass)}:</span>
      <div>
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${tagSelector}
          .value=${this.schedule.tags || []}
          @value-changed=${this.tagsUpdated}
        >
        </scheduler-combo-selector>

        <ha-dropdown
          @wa-after-hide=${(ev: Event) => { ev.stopPropagation(); ((ev.target as HTMLElement).querySelector("ha-button") as HTMLInputElement).blur() }}
          @click=${(ev: Event) => { ev.preventDefault(); ev.stopImmediatePropagation() }}
          @wa-after-show=${(ev: Event) => { ((ev.target as HTMLElement).querySelector("ha-input") as HTMLInputElement).focus() }}
          placement="bottom-start"
        >
          <ha-button appearance="plain" slot="trigger">
            <ha-icon slot="start" icon="mdi:plus"></ha-icon>
            ${hassLocalize('ui.panel.config.tag.add_tag', this.hass)}
          </ha-button>

          <div style="display: flex; align-items: center; padding: 0px 2px 0px 8px">
            <ha-input
              .value=${this.customTagValue}
              .label=${hassLocalize('ui.panel.config.tag.add_tag', this.hass)}
              @input=${(ev: Event) => { this.customTagValue = (ev.currentTarget as any).value }}
              @keydown=${(ev: KeyboardEvent) => { if (ev.key === 'Enter') this._customTagConfirmClick(ev) }}
              .placeholder=""
            ></ha-input> 
            <ha-button
              appearance="plain"
              @click=${this._customTagConfirmClick}
            >
              ${hassLocalize('ui.common.ok', this.hass)}
            </ha-button>
          </div>
        </ha-dropdown>
      </div>

      <span class="header">${localize('ui.panel.options.repeat_type', this.hass)}:</span>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Repeat ? 'filled' : 'plain'}"
        variant="${this.schedule.repeat_type == TRepeatType.Repeat ? 'brand' : 'neutral'}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Repeat}"
      >
        <ha-icon slot="start" icon="mdi:refresh"></ha-icon>
        ${hassLocalize('ui.components.calendar.event.repeat.label', this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Pause ? 'filled' : 'plain'}"
        variant="${this.schedule.repeat_type == TRepeatType.Pause ? 'brand' : 'neutral'}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Pause}"
      >
        <ha-icon slot="start" icon="mdi:stop"></ha-icon>
        ${hassLocalize('ui.dialogs.more_info_control.vacuum.stop', this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Single ? 'filled' : 'plain'}"
        variant="${this.schedule.repeat_type == TRepeatType.Single ? 'brand' : 'neutral'}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Single}"
      >
        <ha-icon slot="start" icon="mdi:trash-can-outline"></ha-icon>
        ${hassLocalize('ui.common.delete', this.hass)}
      </ha-button>
    `;
  }

  private _setStartDate(ev: CustomEvent) {
    const value = String(ev.detail.value);
    if (!value) return;
    const startDate = stringToDate(value);
    const endDate = stringToDate(this.endDate);
    if (startDate > endDate) {
      this.schedule = { ...this.schedule, end_date: value };
      this.endDate = value;
    }

    this.schedule = { ...this.schedule, start_date: value };
    this.startDate = value;
  }

  private _setEndDate(ev: CustomEvent) {
    const value = String(ev.detail.value);
    if (!value) return;
    const startDate = stringToDate(this.startDate);
    const endDate = stringToDate(value);
    if (startDate > endDate) {
      this.schedule = { ...this.schedule, start_date: value };
      this.startDate = value;
    }

    this.schedule = { ...this.schedule, end_date: value };
    this.endDate = value;
  }

  toggleEnableDateRange(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.schedule = {
      ...this.schedule!,
      start_date: checked ? this.startDate : undefined,
      end_date: checked ? this.endDate : undefined,
      repeat_type: checked
        ? this.schedule!.repeat_type == TRepeatType.Repeat
          ? TRepeatType.Pause
          : this.schedule!.repeat_type
        : this.schedule!.repeat_type == TRepeatType.Pause
          ? TRepeatType.Repeat
          : this.schedule!.repeat_type,
    };
  }

  tagsUpdated(ev: CustomEvent) {
    let value = ev.detail.value as string[];
    value = value.map(e => e.trim());
    value = value.filter(e => !['none', 'disabled', 'enabled'].includes(e));
    this.schedule = { ...this.schedule, tags: value };
  }

  _customTagConfirmClick(ev: Event) {
    let target = ev.target as HTMLElement;
    target = target.parentElement as HTMLElement;
    target = target.parentElement as HTMLElement;
    const triggerBtn = target.querySelector("ha-button") as HTMLInputElement;
    triggerBtn.click();
    ev.preventDefault();

    let value = String(this.customTagValue).trim();
    if (value.length) {
      let tags = this.schedule.tags || [];
      tags = [...new Set([...tags, value])];
      tags = tags.filter(e => !['none', 'disabled', 'enabled'].includes(e));
      this.schedule = { ...this.schedule, tags: tags };
    }
    this.customTagValue = "";
  }

  setRepeatType(ev: Event) {
    const value = (ev.target as HTMLElement).getAttribute("value") as TRepeatType;
    this.schedule = { ...this.schedule, repeat_type: value };
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-icon-button {
        align-self: center;
      }
      ha-dropdown-item[disabled] ha-icon {
        color: var(--disabled-text-color);
      }
      ha-dropdown-item[noninteractive] {
        background-color: rgba(var(--rgb-primary-color), 0.12);
        color: var(--sidebar-selected-text-color);
      }
      ha-dropdown-item[noninteractive] ha-icon {
        color: var(--sidebar-selected-text-color);
      }
      div.period {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        gap: 5px;
      }
      div.period > div {
        display: flex;
      }
      div.period > div.input {
        position: relative;
        overflow: hidden;
        flex: 1;
      }
      ha-date-input, ha-input {
        width: 100%;
      }
      .header {
        display: flex;
        margin-top: 5px;
        width: 100%;
        align-items: center;
      }
      .header.first {
        margin-top: 0px;
        padding-bottom: 4px;
        align-items: flex-end;
        justify-content: space-between;
      }
      .header > * {
        display: flex;
      }
      .header ha-dropdown {
        margin-bottom: -10px;
      }
    `;
  }
}