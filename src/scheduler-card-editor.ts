import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import { DialogSelectEntitiesParams } from "./dialogs/dialog-select-entities";
import { HomeAssistant } from "./lib/types";
import { localize } from "./localize/localize";
import { DefaultCardConfig } from "./const";
import { CardConfig } from "./types";
import { fireEvent } from "./lib/fire_event";

import './dialogs/dialog-select-entities';
import "./components/entity-picker";
import "./components/collapsible-section";
import './components/combo-selector';
import { SelectSelector } from "./lib/selector";
import { fetchTags } from "./data/store/fetch_tags";
import { sortByName } from "./lib/sort";


@customElement("scheduler-card-editor")
export class SchedulerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property()
  private _config: CardConfig = DefaultCardConfig;

  setConfig(config: Partial<CardConfig>) {
    this._config = { ...DefaultCardConfig, ...config };
  }

  @property()
  title: string = "";

  @property()
  tagOptions: string[] = [];

  async firstUpdated() {
    this.title = typeof this._config.title == "string"
      ? this._config.title
      : "";

    const tagOptions = (await fetchTags(this.hass!)).map(e => e.name);
    tagOptions.sort(sortByName);
    this.tagOptions = tagOptions;
  }

  render() {
    const tagSelector = <SelectSelector>{
      select: {
        options: this.tagOptions,
        multiple: true,
        custom_value: true
      }
    };

    return html`
      <div class="card-config">

        <mwc-button @click=${this._showIncludedEntitiesDialog}>
          Configure included entities
        </mwc-button>

        <settings-row ?showPrefix=${true}>
          <ha-checkbox
            slot="prefix"
            ?checked=${this._config.title !== false}
            @change=${this._setEnableTitle}
          >
          </ha-checkbox>
          <span slot="heading">${localize('ui.panel.card_editor.fields.title.heading', this.hass)}</span>

          <ha-textfield
            .value=${this.title}
            @input=${this._setTitle}
            .placeholder=${localize('ui.panel.common.title', this.hass)}
            ?disabled=${this._config.title === false}
          ></ha-textfield>

        </settings-row>

        <div class="two-columns" style="margin: 10px 0px 15px 0px">
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.discover_existing.heading', this.hass)}">
            <ha-switch
              ?checked=${this._config.discover_existing !== false}
              @change=${(ev: Event) => {
        this._updateConfig({ discover_existing: (ev.target as HTMLInputElement).checked });
      }}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.show_header_toggle.heading', this.hass)}">
            <ha-switch
              ?checked=${this._config.show_header_toggle}
              @change=${(ev: Event) => {
        this._updateConfig({ show_header_toggle: (ev.target as HTMLInputElement).checked });
      }}
            ></ha-switch>
          </ha-formfield>
        </div>
        </div>

          <span slot="heading">${localize('ui.panel.card_editor.fields.sort_by.heading', this.hass)}</span>

        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.sort_by.options.relative_time', this.hass)}">
            <ha-radio
              name="sort_by"
              value="relative-time"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by].flat().includes('relative-time')}
            ></ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.sort_by.options.title', this.hass)}">
            <ha-radio
              name="sort_by"
              value="title"
              @change=${this._setSortBy}
              ?checked=${[this._config.sort_by].flat().includes('title')}
            ></ha-radio>
          </ha-formfield>
        </div>
        </div>


          <span>${localize('ui.panel.card_editor.fields.display_format_primary.heading', this.hass)}</span>


        <div class="two-columns">
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_primary.options.default', this.hass)}">
            <ha-radio
              name="display_format_primary"
              value="default"
              @change=${this._setDisplayOptionsPrimary}
              ?checked=${[this._config.display_options.primary_info].flat().includes('default')}
            >
            </ha-radio>
          </ha-formfield>

        </div>
        <div class="column">

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_primary.options.entity_action', this.hass)}">
            <ha-radio
              name="display_format_primary"
              value="{entity}: {action}"
              @change=${this._setDisplayOptionsPrimary}
              ?checked=${[this._config.display_options.primary_info].flat().includes('{entity}: {action}')}
            >
            </ha-radio>
          </ha-formfield>

        </div>

        </div>

          <span>${localize('ui.panel.card_editor.fields.display_format_secondary.heading', this.hass)}</span>

        <div class="two-columns">
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.relative_time', this.hass)}">
            <ha-checkbox
              value="relative-time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes('relative-time')}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.time', this.hass)}">
            <ha-checkbox
              value="time"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes('time')}
            >
            </ha-checkbox>
          </ha-formfield>

        </div>
        <div class="column">
          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.days', this.hass)}">
            <ha-checkbox
              value="days"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes('days')}
            >
            </ha-checkbox>
          </ha-formfield>

          <ha-formfield label="${localize('ui.panel.card_editor.fields.display_format_secondary.options.additional_tasks', this.hass)}">
            <ha-checkbox
              value="additional-tasks"
              @change=${this._setDisplayOptionsSecondary}
              ?checked=${[this._config.display_options.secondary_info].flat().includes('additional-tasks')}
            >
            </ha-checkbox>
          </ha-formfield>
        </div>

        </div>

        <settings-row>
          <span slot="heading">${localize('ui.panel.card_editor.fields.tags.heading', this.hass)}</span>

          <combo-selector
            .hass=${this.hass}
            .config=${tagSelector}
            .value=${[this._config.tags || []].flat()}
            @value-changed=${(ev: CustomEvent) => { this._updateConfig({ tags: ev.detail.value }) }}
          >
          </combo-selector>
        </settings-row>

      </div>
    `;
  }

  private _setEnableTitle(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    if (!checked) this._updateConfig({ title: false });
    else if (this.title.length) this._updateConfig({ title: this.title });
    else this._updateConfig({ title: true });
  }

  private _setTitle(ev: CustomEvent) {
    const value = (ev.target as HTMLInputElement).value;
    this.title = value;
    if (value !== localize('ui.panel.common.title', this.hass) && value.length) this._updateConfig({ title: value });
    else this._updateConfig({ title: true });
  }

  private _setSortBy(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    let config = [this._config?.sort_by || DefaultCardConfig.sort_by].flat();
    config = config.filter(e => e == 'state');
    if (!config.includes(value)) config = [...config, value];
    this._updateConfig({ sort_by: config });
  }

  private _setDisplayOptionsPrimary(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    const displayOptions = {
      ...(this._config?.display_options || DefaultCardConfig.display_options),
      primary_info: value,
    };
    this._updateConfig({ display_options: displayOptions });
  }

  private _setDisplayOptionsSecondary(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    const checked = (ev.target as HTMLInputElement).checked;
    let displayOptions = {
      ...(this._config?.display_options || DefaultCardConfig.display_options),
    };
    let secondaryInfo = [displayOptions.secondary_info || []].flat();
    secondaryInfo = checked ? Array.from(new Set([...secondaryInfo, value])) : secondaryInfo.filter(e => e !== value);
    secondaryInfo.sort((a, b) => {
      const ranking = {
        'relative-time': 1,
        time: secondaryInfo.includes('relative-time') ? 3 : 2,
        days: secondaryInfo.includes('relative-time') ? 2 : 3,
        'additional-tasks': 4,
      };
      const rankA = Object.keys(ranking).includes(a) ? ranking[a] : 5;
      const rankB = Object.keys(ranking).includes(b) ? ranking[b] : 5;
      if (rankA > rankB) return 1;
      if (rankA < rankB) return -1;
      return 0;
    });
    displayOptions = { ...displayOptions, secondary_info: [...secondaryInfo] };
    this._updateConfig({ display_options: displayOptions });
  }

  async _showIncludedEntitiesDialog(ev: Event) {
    let domains = this._config.include.filter(e => !e.includes('.'));
    let entities = this._config.include.filter(e => e.includes('.'));

    await new Promise<{ domains: string[], entities: string[] } | null>(resolve => {
      const params: DialogSelectEntitiesParams = {
        cancel: () => resolve(null),
        confirm: (out: { domains: string[], entities: string[] }) => resolve(out),
        domains: domains,
        entities: entities
      };

      fireEvent(ev.target as HTMLElement, 'show-dialog', {
        dialogTag: 'dialog-select-entities',
        dialogImport: () => import('./dialogs/dialog-select-entities'),
        dialogParams: params,
      });
    })
      .then((res: { domains: string[], entities: string[] } | null) => {
        if (!res) return;
        this._updateConfig({ include: [...res.domains, ...res.entities] })
      });

  }

  private _updateConfig(changes: Partial<CardConfig>) {
    if (!this._config) return;
    this._config = { ...this._config, ...changes };
    fireEvent(this, 'config-changed', { config: this._config });
  }


  static styles = css`
    div.entities-list {
      max-height: 500px;
      overflow: auto;
    }
    div.row {
      display: flex;
      align-items: center;
      flex-direction: row;
      cursor: pointer;
      margin: 10px 0px;
    }
    div.row ha-icon {
      padding: 8px;
      color: var(--state-icon-color);
    }
    div.row ha-switch {
      padding: 13px 5px;
    }
    .info {
      margin-left: 16px;
      flex: 1 0 60px;
    }
    .info,
    .info > * {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ha-textfield {
      width: 100%;
    }
    div.two-columns {
      display: flex; 
      flex-direction: row; 
    }
    div.two-columns .column {
      flex: 50%;
    
    }
    div.two-columns .column > * {
      display: flex; 
      flex-direction: column; 
    }
    combo-selector {
      min-width: 240px;
    }
  `;
}
