import { LitElement, html, css, CSSResultGroup, PropertyValues } from "lit";
import { property, customElement, state } from "lit/decorators.js";
import {
  CardConfig,
  Condition,
  Schedule,
  ScheduleEntry,
  TConditionLogicType,
  TConditionMatchType,
  TRepeatType,
  Timeslot,
} from "../types";
import { DialogSelectConditionParams } from "./dialog-select-condition";
import { mdiCog, mdiDotsVertical, mdiPencil } from "@mdi/js";
import { computeStatesForEntity } from "../data/compute_states_for_entity";
import { computeEntityIcon } from "../data/format/compute_entity_icon";
import { computeEntityDisplay } from "../data/format/compute_entity_display";
import { formatIsoDate } from "../data/time/format_date";
import { stringToDate } from "../data/time/string_to_date";
import { computeDomain } from "../lib/entity";
import { validateSelectorValue } from "../data/selectors/validate_selector_value";
import { localize } from "../localize/localize";
import { HomeAssistant } from "../lib/types";
import { fireEvent } from "../lib/fire_event";
import { fetchTags } from "../data/store/fetch_tags";
import { SelectSelector } from "../lib/selector";
import { capitalizeFirstLetter } from "../lib/capitalize_first_letter";
import { asArray } from "../lib/as_array";
import { hassLocalize } from "../localize/hassLocalize";
import { formatSelectorDisplay } from "../data/selectors/format_selector_display";
import { isDefined } from "../lib/is_defined";

import "../components/scheduler-collapsible-section";
import "./dialog-select-condition";
import "../components/scheduler-settings-row";
import "../components/scheduler-combo-selector";

@customElement("scheduler-options-panel")
export class SchedulerOptionsPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public config!: CardConfig;

  @state() schedule!: Schedule;
  @state() conditionIdx: number = -1;
  @state() selectedDomain?: string;
  @state() selectedEntity?: string;
  @state() selectedMatchType?: TConditionMatchType;
  @state() conditionValue?: string | number;
  @state() conditionValid: boolean = true;

  @state()
  startDate = "";

  @state()
  endDate = "";

  @property()
  tags: string[] = [];

  async firstUpdated() {
    (await (window as any).loadCardHelpers()).importMoreInfoControl("input_datetime");

    this.startDate = this.schedule?.start_date || formatIsoDate(new Date());
    this.endDate = this.schedule?.end_date || formatIsoDate(new Date());

    const tagEntries = await fetchTags(this.hass!);
    const storedTags = tagEntries.map((e) => e.name);
    const configTags = [...(this.config.tags || [])].flat();
    this.tags = [
      ...storedTags,
      ...configTags.filter((e) => !storedTags.includes(e) && !["none", "disabled", "enabled"].includes(e)),
    ];
  }

  shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.get("schedule")) {
      this.dispatchEvent(new CustomEvent("change", { detail: { schedule: this.schedule } }));
    }
    return true;
  }

  render() {
    const tagSelector = <SelectSelector>{
      select: {
        options: this.tags,
        multiple: true,
        custom_value: true,
      },
    };

    return html`
      <div class="header first">
        <span>${localize("ui.panel.options.conditions.header", this.hass)}:</span>
        ${this.schedule.entries[0].slots[0].conditions.items.length
          ? html`
              <ha-button-menu
                @action=${this._conditionConfigOptionsClick}
                @closed=${(ev: Event) => {
                  ev.stopPropagation();
                }}
                @click=${(ev: Event) => {
                  ev.preventDefault();
                  ev.stopImmediatePropagation();
                }}
                fixed
                menuCorner="END"
                corner="BOTTOM_END"
              >
                <ha-icon-button slot="trigger" .path=${mdiCog}> </ha-icon-button>
                <mwc-list-item
                  graphic="icon"
                  ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length < 2}
                >
                  ${this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.Or
                    ? html`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`
                    : ""}
                  ${localize("ui.panel.options.conditions.options.logic_or", this.hass)}
                </mwc-list-item>
                <mwc-list-item
                  graphic="icon"
                  ?disabled=${this.schedule.entries[0].slots[0].conditions.items.length < 2}
                >
                  ${this.schedule.entries[0].slots[0].conditions.type == TConditionLogicType.And
                    ? html`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`
                    : ""}
                  ${localize("ui.panel.options.conditions.options.logic_and", this.hass)}
                </mwc-list-item>
                <mwc-list-item graphic="icon">
                  ${this.schedule.entries[0].slots[0].conditions.track_changes
                    ? html`<ha-icon icon="mdi:check" slot="graphic"></ha-icon>`
                    : ""}
                  ${localize("ui.panel.options.conditions.options.track_changes", this.hass)}
                </mwc-list-item>
              </ha-button-menu>
            `
          : ""}
      </div>
      <scheduler-collapsible-group
        ?disabled=${!this.conditionValid}
        @openclose-changed=${this._updateActiveCondition}
        .openedItem=${this.conditionIdx}
      >
        ${this.renderConditions()}
      </scheduler-collapsible-group>

      <div>
        <ha-button appearance="plain" @click=${this._conditionAddClick}>
          <ha-icon slot="start" icon="mdi:plus"></ha-icon>
          ${localize("ui.panel.options.conditions.add_condition", this.hass)}
        </ha-button>
      </div>

      <span class="header">${localize("ui.panel.options.period.header", this.hass)}:</span>
      <div class="period">
        <ha-checkbox ?checked=${typeof this.schedule.start_date === "string"} @change=${this.toggleEnableDateRange}>
        </ha-checkbox>
        <span>${localize("ui.panel.options.period.start_date", this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.startDate}
          .label=${hassLocalize("ui.components.date-range-picker.start_date", this.hass)}
          @value-changed=${this._setStartDate}
          ?disabled=${!this.schedule.start_date}
        >
        </ha-date-input>
        <span>${localize("ui.panel.options.period.end_date", this.hass)}</span>
        <ha-date-input
          .locale=${this.hass.locale}
          value=${this.endDate}
          .label=${hassLocalize("ui.components.date-range-picker.end_date", this.hass)}
          @value-changed=${this._setEndDate}
          ?disabled=${!this.schedule.end_date}
        >
        </ha-date-input>
      </div>

      <span class="header">${hassLocalize("ui.common.name", this.hass)}:</span>
      <div class="period">
        <ha-textfield
          value=${this.schedule.name || ""}
          placeholder=${this.schedule.name ? "" : hassLocalize("ui.common.name", this.hass)}
          @input=${this.updateName}
        ></ha-textfield>
      </div>

      <span class="header">${localize("ui.panel.options.tags", this.hass)}:</span>
      <div>
        <scheduler-combo-selector
          .hass=${this.hass}
          .config=${tagSelector}
          .value=${this.schedule.tags || []}
          @value-changed=${this.tagsUpdated}
        >
        </scheduler-combo-selector>
      </div>

      <span class="header">${localize("ui.panel.options.repeat_type", this.hass)}:</span>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Repeat ? "filled" : "plain"}"
        variant="${this.schedule.repeat_type == TRepeatType.Repeat ? "brand" : "neutral"}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Repeat}"
      >
        <ha-icon slot="start" icon="mdi:refresh"></ha-icon>
        ${hassLocalize("ui.components.calendar.event.repeat.label", this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Pause ? "filled" : "plain"}"
        variant="${this.schedule.repeat_type == TRepeatType.Pause ? "brand" : "neutral"}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Pause}"
      >
        <ha-icon slot="start" icon="mdi:stop"></ha-icon>
        ${hassLocalize("ui.dialogs.more_info_control.vacuum.stop", this.hass)}
      </ha-button>
      <ha-button
        appearance="${this.schedule.repeat_type == TRepeatType.Single ? "filled" : "plain"}"
        variant="${this.schedule.repeat_type == TRepeatType.Single ? "brand" : "neutral"}"
        @click=${this.setRepeatType}
        value="${TRepeatType.Single}"
      >
        <ha-icon slot="start" icon="mdi:trash-can-outline"></ha-icon>
        ${hassLocalize("ui.common.delete", this.hass)}
      </ha-button>
    `;
  }

  renderConditions() {
    let conditions: Partial<Condition>[] = this.schedule.entries[0].slots[0].conditions.items;
    if (this.conditionIdx == conditions.length) conditions = [...conditions, {}];

    return conditions.map((condition, i) => {
      const entityId =
        this.conditionIdx == i ? this.selectedEntity || condition.entity_id || "" : condition.entity_id || "";
      const domain = this.conditionIdx == i ? this.selectedDomain || computeDomain(entityId) : computeDomain(entityId);
      const selector = computeStatesForEntity(entityId || domain, this.hass, this.config.customize);

      const matchTypes =
        selector && selector.hasOwnProperty("number")
          ? [TConditionMatchType.Above, TConditionMatchType.Below]
          : [TConditionMatchType.Equal, TConditionMatchType.Unequal];

      const matchTypeIcons = {
        [TConditionMatchType.Equal]: "mdi:equal",
        [TConditionMatchType.Unequal]: "mdi:not-equal-variant",
        [TConditionMatchType.Above]: "mdi:greater-than",
        [TConditionMatchType.Below]: "mdi:less-than",
      };

      const matchTypeValue = {
        [TConditionMatchType.Equal]: "ui.panel.options.conditions.types.equal_to",
        [TConditionMatchType.Unequal]: "ui.panel.options.conditions.types.unequal_to",
        [TConditionMatchType.Above]: "ui.panel.options.conditions.types.above",
        [TConditionMatchType.Below]: "ui.panel.options.conditions.types.below",
      };

      if (this.conditionIdx === i && !this.selectedMatchType) this.selectedMatchType = matchTypes[0];

      return html`
        <scheduler-collapsible-section idx="${i}">
          <div slot="header">
            ${condition.entity_id && condition.value !== undefined
              ? html`
                  <ha-icon
                    slot="icon"
                    icon="${computeEntityIcon(condition.entity_id, this.config.customize, this.hass)}"
                  ></ha-icon>
                  ${capitalizeFirstLetter(
                    localize(
                      matchTypeValue[condition.match_type!],
                      this.hass,
                      ["{entity}", "{value}"],
                      [
                        computeEntityDisplay(condition.entity_id, this.hass, this.config.customize) || "",
                        formatSelectorDisplay(condition.value, selector, this.hass) || "",
                      ]
                    )
                  )}
                `
              : localize("ui.panel.options.conditions.add_condition", this.hass)}
          </div>
          <ha-button-menu
            slot="contextMenu"
            @action=${(ev: CustomEvent) => this._conditionItemOptionsClick(ev, i)}
            @closed=${(ev: Event) => {
              ev.stopPropagation();
            }}
            @click=${(ev: Event) => {
              ev.preventDefault();
              ev.stopImmediatePropagation();
            }}
            fixed
            ?disabled=${!this.conditionValid && this.conditionIdx !== i && this.conditionIdx != -1}
          >
            <ha-icon-button
              slot="trigger"
              .path=${mdiDotsVertical}
              ?disabled=${!this.conditionValid && this.conditionIdx !== i && this.conditionIdx != -1}
            >
            </ha-icon-button>
            <mwc-list-item graphic="icon">
              ${hassLocalize("ui.panel.lovelace.editor.card.conditional.change_type", this.hass)}
              <ha-icon slot="graphic" icon="mdi:pencil"></ha-icon>
            </mwc-list-item>
            <mwc-list-item graphic="icon" class="warning">
              ${hassLocalize("ui.common.delete", this.hass)}
              <ha-icon slot="graphic" icon="mdi:delete"></ha-icon>
            </mwc-list-item>
          </ha-button-menu>

          <div slot="content">
            <scheduler-settings-row>
              <span slot="heading"> ${hassLocalize("ui.components.selectors.selector.types.entity", this.hass)} </span>
              <scheduler-entity-picker
                .hass=${this.hass}
                .config=${this.config}
                .domain=${domain}
                @value-changed=${this._selectEntity}
                .value=${this.conditionIdx == i ? asArray(this.selectedEntity) : asArray(condition.entity_id)}
                ?multiple=${false}
              >
              </scheduler-entity-picker>
            </scheduler-settings-row>

            <scheduler-settings-row>
              <span slot="heading">
                ${capitalizeFirstLetter(
                  localize(
                    matchTypeValue[this.conditionIdx == i ? this.selectedMatchType! : condition.match_type!],
                    this.hass,
                    ["{entity}", "{value}"],
                    ["", ""]
                  )
                )}
                <ha-button-menu
                  @action=${(ev: CustomEvent) => this._selectMatchType(ev, matchTypes)}
                  @closed=${(ev: Event) => {
                    ev.stopPropagation();
                  }}
                  fixed
                >
                  <ha-icon-button slot="trigger" .path=${mdiPencil}> </ha-icon-button>
                  ${matchTypes.map(
                    (e) => html`
                      <mwc-list-item
                        graphic="icon"
                        ?noninteractive=${this.conditionIdx == i
                          ? this.selectedMatchType == e
                          : condition.match_type == e}
                      >
                        ${capitalizeFirstLetter(
                          localize(matchTypeValue[e], this.hass, ["{entity}", "{value}"], ["", ""])
                        )}
                        <ha-icon slot="graphic" icon="${matchTypeIcons[e]}"></ha-icon>
                      </mwc-list-item>
                    `
                  )}
                </ha-button-menu>
              </span>
              <scheduler-combo-selector
                .hass=${this.hass}
                .config=${selector}
                .value=${this.conditionIdx == i ? this.conditionValue : condition.value}
                @value-changed=${this._conditionValueChanged}
              >
              </scheduler-combo-selector>
            </scheduler-settings-row>
          </div>
        </scheduler-collapsible-section>
      `;
    });
  }

  _updateActiveCondition(ev: CustomEvent) {
    const idx = ev.detail.item;
    if (idx < 0) {
      this.conditionIdx = -1;
      return;
    }
    if (idx === this.conditionIdx) return;
    this.conditionIdx = idx;
    const condition = this.schedule.entries[0].slots[0].conditions.items[idx];
    this.selectedEntity = condition ? condition.entity_id : undefined;
    this.selectedMatchType = condition ? condition.match_type : undefined;
    this.conditionValue = condition ? condition.value : undefined;
  }

  _conditionItemOptionsClick(ev: CustomEvent, idx: number) {
    const option = ev.detail.index;
    switch (option) {
      case 0:
        this._showConditionDialog(ev).then((res) => {
          if (!res) return;
          this.conditionIdx = idx;
          this.selectedDomain = res;
          this.selectedEntity = undefined;
          this.selectedMatchType = undefined;
          this.conditionValue = undefined;
          this.conditionValid = false;
        });
        break;
      case 1:
        const conditions: Condition[] = this.schedule.entries[0].slots[0].conditions.items.filter((_e, i) => i !== idx);
        const updateSlots = (e: Timeslot) => Object.assign(e, { conditions: { ...e.conditions, items: conditions } });
        const updateEntries = (e: ScheduleEntry) => Object.assign(e, { slots: e.slots.map(updateSlots) });
        this.schedule = { ...this.schedule, entries: this.schedule.entries.map(updateEntries) };
        if (idx === this.conditionIdx) this.conditionIdx = -1;
        else if (this.conditionIdx !== undefined && idx < this.conditionIdx) this.conditionIdx = this.conditionIdx - 1;
        this.conditionValid = true;
        break;
    }
  }

  _selectMatchType(ev: CustomEvent, options: TConditionMatchType[]) {
    const index = ev.detail.index;
    options = options.filter((e) => e != this.selectedMatchType);
    this.selectedMatchType = options[index];

    ev.preventDefault();
    const el = ev.target as HTMLElement;
    setTimeout(() => {
      (el.firstElementChild as HTMLElement).blur();
    }, 50);
    this._validateCondition();
  }

  _conditionValueChanged(ev: CustomEvent) {
    this.conditionValue = ev.detail.value;
    this._validateCondition();
  }

  async _showConditionDialog(ev: Event) {
    return new Promise<string | null>((resolve) => {
      const params: DialogSelectConditionParams = {
        cancel: () => resolve(null),
        confirm: (out: string) => resolve(out),
        domain: undefined,
        cardConfig: this.config,
      };

      fireEvent(ev.target as HTMLElement, "show-dialog", {
        dialogTag: "dialog-select-condition",
        dialogImport: () => import("./dialog-select-condition"),
        dialogParams: params,
      });
    });
  }

  _selectEntity(ev: CustomEvent) {
    const entity = ev.detail.value as string[] | undefined;
    this.selectedEntity = entity ? entity.pop() : undefined;
    if (this.selectedEntity) {
      const selector = computeStatesForEntity(this.selectedEntity, this.hass, this.config.customize);
      const matchTypes =
        selector && selector.hasOwnProperty("number")
          ? [TConditionMatchType.Above, TConditionMatchType.Below]
          : [TConditionMatchType.Equal, TConditionMatchType.Unequal];
      if (!this.selectedMatchType || !matchTypes.includes(this.selectedMatchType))
        this.selectedMatchType = matchTypes[0];
    }
    this._validateCondition();
  }

  _validateCondition() {
    this.conditionValid = false;
    if (
      !this.selectedEntity ||
      !isDefined(this.conditionValue) ||
      !this.selectedMatchType ||
      this.conditionIdx === undefined
    )
      return;
    const selector = computeStatesForEntity(this.selectedEntity, this.hass, this.config.customize);
    if (!validateSelectorValue(this.conditionValue, selector)) return;
    this.conditionValid = true;
    const condition: Condition = {
      entity_id: this.selectedEntity,
      match_type: this.selectedMatchType,
      value: this.conditionValue,
      attribute: "state",
    };
    const conditions: Condition[] = Object.assign(this.schedule.entries[0].slots[0].conditions.items, {
      [this.conditionIdx]: condition,
    });

    const updateSlots = (e: Timeslot) => Object.assign(e, { conditions: { ...e.conditions, items: conditions } });
    const updateEntries = (e: ScheduleEntry) => Object.assign(e, { slots: e.slots.map(updateSlots) });
    this.schedule = { ...this.schedule, entries: this.schedule.entries.map(updateEntries) };
  }

  _conditionAddClick(ev: Event) {
    this._showConditionDialog(ev).then((res) => {
      if (!res) return;
      this.conditionIdx = this.schedule.entries[0].slots[0].conditions.items.length;
      this.selectedDomain = res;
      this.selectedEntity = undefined;
      this.selectedMatchType = undefined;
      this.conditionValue = undefined;
      this.conditionValid = false;
    });
  }

  _conditionConfigOptionsClick(ev: CustomEvent) {
    let conditionConfig = { ...this.schedule.entries[0].slots[0].conditions };
    const index = ev.detail.index;
    switch (index) {
      case 0:
        if (conditionConfig.type == TConditionLogicType.Or) return;
        conditionConfig = { ...conditionConfig, type: TConditionLogicType.Or };
        break;
      case 1:
        if (conditionConfig.type == TConditionLogicType.And) return;
        conditionConfig = { ...conditionConfig, type: TConditionLogicType.And };
        break;
      case 2:
        const newValue = !this.schedule.entries[0].slots[0].conditions.track_changes;
        conditionConfig = { ...conditionConfig, track_changes: newValue };
        break;
    }
    const updateSlots = (e: Timeslot) => Object.assign(e, { conditions: conditionConfig });
    const updateEntries = (e: ScheduleEntry) => Object.assign(e, { slots: e.slots.map(updateSlots) });
    this.schedule = { ...this.schedule, entries: this.schedule.entries.map(updateEntries) };
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

  updateName(ev: InputEvent) {
    const value = (ev.target as HTMLInputElement).value;
    this.schedule = { ...this.schedule, name: value.trim() };
  }

  tagsUpdated(ev: CustomEvent) {
    let value = ev.detail.value as string[];
    value = value.map((e) => e.trim());
    value = value.filter((e) => !["none", "disabled", "enabled"].includes(e));
    this.schedule = { ...this.schedule, tags: value };
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
      mwc-list-item.warning,
      mwc-list-item.warning ha-icon {
        color: var(--error-color);
      }
      mwc-list-item[disabled] ha-icon {
        color: var(--disabled-text-color);
      }
      mwc-list-item[noninteractive] {
        background-color: rgba(var(--rgb-primary-color), 0.12);
        color: var(--sidebar-selected-text-color);
      }
      mwc-list-item[noninteractive] ha-icon {
        color: var(--sidebar-selected-text-color);
      }
      div.period {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
      }
      ha-textfield {
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
      .header ha-button-menu {
        margin-bottom: -10px;
      }
    `;
  }
}
