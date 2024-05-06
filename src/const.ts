import { CardConfig, Schedule, TConditionLogicType, TRepeatType, TWeekday } from "./types";

export const CARD_VERSION = 'v4.0.0b';

export const DefaultCardConfig: CardConfig = {
  include: [],
  exclude: [],
  discover_existing: true,
  title: true,
  show_header_toggle: false,
  display_options: {
    primary_info: 'default',
    secondary_info: ['relative-time', 'additional-tasks'],
  },
  sort_by: ['relative-time', 'state'],
  customize: {}
};

const defaultSlotConfig = {
  actions: [],
  conditions: {
    type: TConditionLogicType.Any,
    items: [
    ]
  }
}

export const defaultScheduleConfig: Schedule = {
  entries: [
    {
      weekdays: [TWeekday.Daily],
      slots: [
        {
          ...defaultSlotConfig,
          start: '00:00:00',
          stop: '08:00:00',
        },
        {
          ...defaultSlotConfig,
          start: '08:00:00',
          stop: '16:00:00',
        },
        {
          ...defaultSlotConfig,
          start: '16:00:00',
          stop: '00:00:00',
        }
      ]
    }
  ],
  repeat_type: TRepeatType.Repeat,
  next_entries: [],
  timestamps: []
};