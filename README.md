# scheduler-card <!-- omit in TOC -->
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)  

- [Introduction](#introduction)
- [Installation](#installation)
- [Updating](#updating)
- [Usage](#usage)
  - [Creating a schedule](#creating-a-schedule)
    - [Choosing an entity and action](#choosing-an-entity-and-action)
    - [Choosing the days](#choosing-the-days)
    - [Choosing the time](#choosing-the-time)
  - [Creating a time scheme](#creating-a-time-scheme)
    - [Timeslots](#timeslots)
    - [Time scheme editor](#time-scheme-editor)
  - [Options panel](#options-panel)
    - [Condition editor](#condition-editor)
    - [Period](#period)
    - [Behaviour after completion](#behaviour-after-completion)
    - [Name](#name)
- [Configuration](#configuration)
  - [Options](#options)
  - [Standard configuration](#standard-configuration)
  - [Adding entities](#adding-entities)
    - [Include](#include)
    - [Exclude](#exclude)
  - [Groups](#groups)
  - [Schedule discovery](#schedule-discovery)
  - [Customize](#customize)
    - [Options](#options-1)
    - [Actions](#actions)
    - [Numeric action variable](#numeric-action-variable)
    - [List action variable](#list-action-variable)
    - [Conditions](#conditions)
  - [Display options](#display-options)
  - [Tags](#tags)
- [Translations](#translations)
- [Tips & Tricks](#tips--tricks)
  - [Triggering multiple actions on a schedule](#triggering-multiple-actions-on-a-schedule)
  - [Customizing built-in actions](#customizing-built-in-actions)
- [Troubleshooting](#troubleshooting)
  - [Checking card version](#checking-card-version)
- [Say thank you](#say-thank-you)

## Introduction
This is a Lovelace card for Home Assistant that can be used to create a time schedule for your smart devices.
You can create new rules, modify existing rules and temporarily disable rules.

The card works on top of the [scheduler custom component](https://github.com/nielsfaber/scheduler-component). You *will* need it this as well.

See it in action:

![alt text](https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/Demonstration.gif?raw=true "demonstration video")

## Installation
<details>
<summary>click to show installation instructions </summary>

HACS installation:

Note: Ensure you have a www folder created as in config/www or the installation will succeed but fails silently
1. Open the [HACS](https://hacs.xyz/) panel in HA and go to the 'Frontend' section.
2. Search for scheduler-card and click download.
3. Follow the instructions provided to complete the installation.

Note: Ensure to install [`https://github.com/nielsfaber/scheduler-component`](https://github.com/nielsfaber/scheduler-component) and add the integration in order for the scheduler to work properly.


Manual installation:

1. Download the latest release of `scheduler-card.js` [here](https://github.com/nielsfaber/scheduler-card/releases) and place it into `www/scheduler-card`.
2. Follow the instructions [here](https://developers.home-assistant.io/docs/frontend/custom-ui/registering-resources/) to add the card to HA. Example URL: `/local/scheduler-card/scheduler-card.js?v=0`.
 3. Add the card in the view where you want it to be shown by editing `ui-lovelace.yaml` (or use the card editor):

  ```yaml
 type: custom:scheduler-card
 domains:
   ...
 entities:
   ...
 groups:
   ...
  ```

</details>

## Updating

<details>
<summary>click to show updating instructions </summary>

Updating via HACS:
HACS should auto-remind you in the HACS tab when an update is available.

Updating manually:

Use `git pull` for manual installation updates.

Since most browsers will cache the Lovelace card code, you can force a refresh of the browser by editing the entry in the Lovelace resources section, by updating the URL to `?v=(n+1)` (where `n` the current value).


</details>

---

## Usage

### Creating a schedule
Click the button 'add item' in the bottom of the card, to start creating a schedule.

#### Choosing an entity and action
The card scans the entities in your HA configuration and suitable candidates should automatically show up in this view.

__Groups__
Since HA may contain many entities, the card divides the entities into different groups.
Clicking a group automatically will show the entities contained in the group.

The groups that are displayed are depending on your HA configuration.
Typically the groups are based on the _domain_ of your entities.
If you want to make changes to the groups, you can do this by defining [groups](#groups) configuration.

__Entities__
The entities that you can to control with the scheduler show up here.
Clicking a entity automatically will show the actions that you can program for this entity.

Typically an entity is a device in your house, but you can also control an `automation`, `script`, `input_boolean`, etc. You can add all entities that you want to control in the [include](#include) list.

__Actions__
The actions that you can perform for the selected entity show up here.
 Typically an action is to either 'turn on' or 'turn off' a device. But some entities have more capabilities. If you are missing an action, you can add it yourself using the [customize](#customization) configuration.


 Actions can contain a variable setting (e.g. turn on a lamp at specific brightness, or change the setpoint for a thermostat).
These can be defined in the next page.

<img src="https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/instructions_select_entity.png?raw=true" width="500">

#### Choosing the days
After clicking the 'next' button, a new view appears.
This view is used for choosing _when_ the schedule should be active.

Choose the days of the week for which the schedule should be active.


__Every day__
 the default option. The schedule will perform the action every day at the specified time.

__Workdays__
perform action only on Monday thru Friday. 
If you have the [workday integration](https://www.home-assistant.io/integrations/workday/) installed, you can use it to define your own set of workdays.
The workday integration and its settings will be automatically detected if it is installed.
Note that if you define holidays, they will be excluded from workdays.

__Weekend__
perform action only on Saturday and Sunday. 
If you have the workday integration installed, the weekend will be considered as the inverse as workdays. This means that holidays and your 'fixed day off' are included in the weekend setting.


__Custom__
choose your own days. A list with all days of the week appears. You can select one or more days by clicking them.


#### Choosing the time

The time at which you want schedule to be activated can be set using the time picker.



The time picker shows the current time setting, and features arrow buttons to increase or decrease the hour and minutes. Note that you can infinitely loop through time.
The step size for minutes is 10 minutes by default, but can be configured to your preference.

If you have the AM/PM option enabled, 12-hour format will be used. You can click on the button to switch between AM and PM.

__Sunrise / sunset mode__

If you have the [sun](https://www.home-assistant.io/integrations/sun/) integration in HA, a button with sun/moon icon shows up on the right. This is the _mode button_, which allows you to switch from a fixed time, to time relative to sunrise or sunset.  
The card allows you to choose a time that is 2 hours around sunrise or sunset. The button will be disabled if the current time is not in this range.

In sunrise/sunset mode, the time picker will show the offset relative to sunrise/sunset. The time offset is automatically calculated from fixed time.
The _sunrise/sunrise button_ will show a sun icon when offset is relative to sunrise, or a moon icon when offset is relative sunset.
The _before/after button_ indicates whether the offset is applied in positive direction (so triggers after sunrise/sunset), or in negative direction (before sunrise/sunset).
Also here, buttons can be clicked to toggle.

:warning: **Important**: _What you see is what you get_ here. If you want to store time as relative to sunrise or sunset, make sure that you have this _mode_ activated when you click the save button.

<img src="https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/instructions_timepicker.png?raw=true" width="400">

---


### Creating a time scheme

A time scheme is a more advanced type of schedule, which allows multiple actions during the day through the use of timeslots.

#### Timeslots
A timeslot defines a time range during which you want an entity to be in a certain state.
Every timeslot has a start time and end time, together with an action.

An action defined for a timeslot will *normally* be executed when the time reaches the starting time of the slot. 
So in this sense the behaviour is not different compared to a a normal schedule.

But there are differences:
* If you create (or edit) a new time scheme: the schedule will determine which timeslot is active, and trigger this action immediately.
* If you enable a disabled time scheme: the schedule will determine which timeslot is active, and trigger this action immediately.
* If HA is restarted: the schedule will determine which timeslot is active, and trigger this action immediately.
* If the entity (used in the action) is *unavailable* when the action needs to be triggered: the schedule will wait for this entity to become *available* (anything other than *unavailable*), and then trigger the action. Of course only while the timeslot is active.

After a timeslot has triggered the action, the schedule will wait for the next timeslot.
So, you can keep controlling your entity as you want without worrying that the schedule will not re-trigger its action again.

:warning: **Note** At the end of the timeslot, there is no action executed.
This means that if you turn on a device during a timeslot, you will have to add a second timeslot to turn it off.
It is *highly recommended* (but not required) to assign actions to every timeslot, such that the behaviour for the whole day is defined.

#### Time scheme editor

The time scheme editor allows you to configure the timeslots of your schedule and visualizes the result.

A time scheme starts at 00:00 and ends at 23:59, so it covers a full day. Depending on the selected days, the schedule continues with the first slot of next day after the last one ended. So usually the first and last slot should have the same action.

__Draggable markers__
The card shows a bar with multiple time markers which you can drag/slide to change the duration of the timeslots.
The time step is currently limited to 15 mins intervals.

__Selectable timeslots__
By clicking on a timeslot, it becomes selected and will have highlighted color.
When a timeslot is selected, you can assign an action to it.

__Divide or merging of timeslots__
When a timeslot is selected, you can click the '+' or '-' buttons to either divide (split in two) or merge (combine with the next slot)) the selected timeslot.

:warning: **Note** Due to the limited width of the Lovelace cards in HA, it might be difficult to make a short timeslot. 
Since there is not really a way to fix this, it's recommended to use a PC or use your phone on landscape mode when creating a time scheme.

<img src="https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/timescheme_example.png?raw=true" width="600">

---
### Options panel
The options panel gives you access to additional settings that you can set up for schedules.

The options panel is called the way it is, because all settings here are *optional*. So it is OK to ignore it if you don't miss any of its functions.

#### Condition editor

The condition editor allows you to define a set of rules which need to pass before the action may be executed.
Conditions are currently limited to checking the state of (other) HA entities (so not their attributes). States may be numeric, on/off or string type. Date/time format is not supported.

The editor allows you to make rules in various ways: logic *AND*, *OR*, *NOT* functions, as well as *below* and *above* for numeric states.
You can combine multiple entities if needed.

All entities having `states` configured will show up in the editor.
For more information on this, see [conditions](#conditions).

:warning: **Note**: Conditions are only evaluated at the time the actions should fire. This means that if the conditions are not met, the timer event will be skipped. It will not be re-evaluated when any of the entities involved in the conditions change.

#### Period
The *period* option allows you to define a range of dates (or a single date) for which the schedule needs to be active.

If the *period* option:
* is not used, a schedule will repeat on a daily/weekly basis as defined by the [days](#choosing-the-days) input (unless it is configured to do otherwise via [trigger behaviour](#behaviour-after-completion)).
* Is used, a schedule will only be executed within the defined date range (which may be a single date). This can be combined with [days](#choosing-the-days) input to provide additional restrictions.

If the combination of the defined end date + time(s) is in the past, the schedule becomes *completed*. 
A completed schedule will:
* Show up with grey text in the scheduler-card in the overview and appears in the bottom of the list with the time to the next triggering in the past.
* Not perform any actions and needs to be manually editted to become useful again.

#### Behaviour after completion

The *behaviour after completion* option can be used to control repetition behaviour of a schedule.

Completion of a schedule is defined as follows:
* For a normal schedule (having a single time), completion is reached after the configured time has passed (and after the corresponding action(s) have been executed).
* For a time scheme (having one or more timeslots), completion is reached after the last timeslot has passed.
* In case a [period](#period) is assigned to a schedule, completion is reached when the configured time (or last timeslot) on the end date has passed. In this case the *repeat* option is not available (for more info see [period](#period)).

| Selected Option  | Behaviour                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Repeat (default) | Schedule will repeat again on the next allowed day (as defined by the [days](#choosing-the-days)).                                         |
| Stop             | Schedule will disable (turn off) itself after completion.<br>It has to be re-enabled by the user or through automation in order to repeat. |
| Delete           | Schedule will remove itself after completion.                                                                                              |


#### Name

By default, all schedules will have an automatically generated entity ID and friendly name.
This means they could be hard to find back in the entity registry.

By defining your own friendly name, this will assigned to the entity, and the entity ID of the entity will be based on this name as well.
If you leave the field empty, the automatically generated name shall be used instead.

## Configuration

The configuration of the card can be done via the UI editor or in YAML.
Some (advanced) configuration options (such as `customize`) are YAML-only currently.

Configuration is not *necessary*, except for defining a set of entities which you want to control with the card, which is done via `include`.

### Options

| Name                     | Type           | Default                     | Description                                                                                                                                                                                                                                                                                                   |
| ------------------------ | -------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`                   | string         | **Required**                | `custom:scheduler-card`                                                                                                                                                                                                                                                                                       |
| `standard_configuration` | boolean        | *true*                      | Use the [standard configuration](#standard-configuration) as a base configuration.                                                                                                                                                                                                                            |
| `discover_existing`      | boolean        | *true*                      | Show previously created schedules in the card, also if the related entities are not included in the configuration.<br>Set to `false` if you have multiple scheduler-cards.<br>See [schedule discovery](#schedule-discovery) for more info.                                                                    |
| `include`                | list           | none                        | List of filters to determine which HA entities are available for creating schedules.<br> See [include](#include) for more info.                                                                                                                                                                               |
| `exclude`                | list           | none                        | List of filters to determine which HA entities are **not** available for creating schedules.<br> See [exclude](#exclude) for more info.                                                                                                                                                                       |
| `groups`                 | list           | none                        | Organize the entities menu. <br>See [groups](#groups) for more info.                                                                                                                                                                                                                                          |
| `customize`              | dictionary     | none                        | Customize the available actions or visualization of entities.   <br>See [customize](#customize) for more info.                                                                                                                                                                                                |
| `title`                  | boolean/string | *true*                      | Provide a text to replace the title of the card.<br> Set to `false` to hide the title.                                                                                                                                                                                                                        |
| `time_step`              | number         | 10                          | Set the time step (in minutes) for the time picker                                                                                                                                                                                                                                                            |
| `sort_by`                | string/list    | `relative-time`,<br>`state` | Order in which schedules appear in the list. Choose from:<ul> <li>`relative-time`: duration until next task</li><li>`title`: displayed [primary info](#primary-info)</li><li>`state`: enabled/disabled status</ul>Note that `state` currently is the only option which can be combined with a second option.. |
| `show_header_toggle`     | boolean        | *false*                     | Show a switch at the top of the card that can be used to enable/disable the complete list.                                                                                                                                                                                                                    |
| `show_add_button`        | boolean        | *true*                      | Show button for creating new schedules.                                                                                                                                                                                                                                                                       |
| `display_options`        | dictionary     | none                        | Configure which properties are displayed in the overview.<br>See [display options](#display-options) for more info.                                                                                                                                                                                           |
| `tags`                   | string/list    | none                        | Filter schedules on one or more tags.<br>See [tags](#tags) for more info.                                                                                                                                                                                                                                     |
| `exclude_tags`           | string/list    | none                        | Eliminate items from the schedules filtered by `tags`.<br>See [tags](#tags) for more info.                                                                                                                                                                                                                    |
### Standard configuration

The card includes a _standard configuration_.
It is intended to make setting up the card easy.
The standard configuration consists of the following features:
* Discovery of devices (entities) of various types in your HA config and making them available for creating schedules
* Defining actions per entity based on their capabilities
* Icons for groups, entities and actions

When including an entity, the standard configuration will automatically detect which actions are supported by it, and will make these available.
Also it has icons for most entity types and actions.

:warning: **Warning**: You can provide `standard_configuration:false` in the card configuration to disable it completely for full control. If so, you will need to configure all actions and properties via `customize`.


### Adding entities

#### Include

The `include` configuration allows you to pick entities from your HA config that you can use for creating schedules.

You can either provide the full `entity_id` of the entities, or only the domain.

The list supports wildcards (*) as well. It is recommended to use quotes ("") around your input, else it may be wrongly interpreted.

<u>Example:</u>

```yaml
include:
  - climate.my_thermostat # include an individual entity
  - light # include all light entities
  - "*garden*" # include all entities containing the word 'garden'
  ...
```
#### Exclude

The `exclude` configuration allows you to remove entities from your HA config from appearing in the scheduler.

The `exclude` list works on top of the `include` list, so it behaves like *'ADD (includes) EXCEPT (excludes)'*.

Like with `include`, you can either provide the full `entity_id` of the entities, or the domain, or use wildcards.


```yaml
include:
  - light # include all light entities
exclude:
  - light.my_light_that_i_never_use # exclude
```


### Groups
The `groups` configuration provides the capability of organizing the entities.
To be clear, they have nothing to do with the [group](https://www.home-assistant.io/integrations/group/) integration in Home Assistant.

By default, entities will be grouped based on their type (domain). 
Entities that are assigned to your own defined group will not be grouped by type.

| Name    | Type   | Default            | Description                                                                                                                                                                                 |
| ------- | ------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name    | string | (same as group_id) | Displayed name for group                                                                                                                                                                    |
| icon    | string | none               | Displayed icon for group                                                                                                                                                                    |
| include | list   | none               | List of filters to determine which of the entities belong in this group.<br>This has the same functionality as the [include](#include) filter for defining the entities in the card.        |
| exclude | list   | none               | List of filters to determine which of the entities do not belong in this group.<br>This has the same functionality as the [exclude](#exclude) filter for defining the entities in the card. |  |

<u>Example:</u>

*Place all `light` entities in group labelled "lighting"*
```yaml
groups:
  - name: "Lighting"
    icon: "hass:ceiling-light"
    include:
      - light
```
Result:

![groups example](https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/groups_example.png?raw=true)

### Schedule discovery

The card checks for the created schedules in your HA config and show them in the overview page.

The schedule discovery is a feature that will ensure that **all** your schedules will be there.

What is the benefit of this feature?

It could occur that you make changes in the configuration, resulting in previously created schedules to become hidden.
For example, you made a schedule for controlling a `fan`.
The day after you decide to remove the `fan` domain from the card. But you forgot to delete the previously created schedule.

Without the discovery, you now have a schedule that is hidden from the card, but will keep running. You cannot remove or change it anymore (unless via the HA configuration panel).

Discovery makes sure that you will always find it back in the card.
The feature can be turned on/off through the `discover_existing` option.

For your protection, it is enabled by default.

:warning: **Tip**: You should set `discover_existing:false` if you want to use multiple cards. Else you will see each created schedule in every card.


### Customize
With the `customize` configuration you can specify configuration for specific HA entities.

:warning: **Tip**: You can use entities `configuration` in combination with the standard configuration. The configurations will be merged.

#### Options
| Name            | Type        | Default               | Description                                                                                                                                                                                                       |
| --------------- | ----------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| entity          | key         | **Required**          | Entity id (or filter).<br> Filter works the same as `include` so you can also use it for multiple entities.                                                                                                       |
| actions         | list        | none                  | See [actions](#actions)                                                                                                                                                                                           |
| name            | string      | (take from HA config) | Displayed name for entity                                                                                                                                                                                         |
| icon            | string      | (take from HA config) | Displayed icon for entity                                                                                                                                                                                         |
| states          | list or map | none                  | Possible states of this entities, for using it in a condition.<br> See [conditions](#conditions) for more info.                                                                                                   |
| exclude_actions | list        | none                  | Hide actions from the card.<br>Enter a list with names of actions to hide as they displayed in the card (including translation).<br>E.g. '*turn on at 40%*' would hide the created action from the example below. |
#### Actions
An action defines **what** needs to be done when a schedule timer expires.

An action is similar to a [service call](https://www.home-assistant.io/docs/scripts/service-calls/) in HA. It requires a `service` with optionally additional parameters given by `service_data`.

Actions are linked to their entities, so the entity ID is sent together with the service call, it is not needed to add it to the `service_data`).

| Name         | Type   | Default           | Description                                            |
| ------------ | ------ | ----------------- | ------------------------------------------------------ |
| service      | string | **Required**      | Service to be executed                                 |
| service_data | map    | none              | Additional parameters to use for the service call      |
| variables    | map    | none              | Add variables. See [action variable](#action-variable) |
| name         | string | (same as service) | Displayed name for action                              |
| icon         | string | "flash"           | Displayed icon for action                              |

:warning: **Note**: Templates (jinja code) are not supported at this point.

<u>Example:</u>

*Adding an action to turn on a light with 40% brightness*
  ```yaml
customize:
    light.my_lamp:
      name: "Dining light"
      icon: "hass:ceiling-light"
      actions:
        - service: turn_on
          service_data:
            brightness: 100 # note that brightness is from 0-255 so 100 = 40%
          name: "Turn on at 40%"
          icon: "hass:lightbulb-on-outline"
  ```
Result:

![customize example](https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/entities_example.png?raw=true)


**Customizing actions from standard configuration**

How actions in customize are processed:
* If the action matches with a previously defined action, your action will replace the default action.
* If the action does not match with an existing action, the card will create a new action.

Actions are compared based on matching `service` and `service_data` (note that variables are not considered).


:warning: **Note**: If a match is found, your action will *replace* (and not *modify*) the default action.<br>This means that you are expected to (re-)define name, icon, and variable configuration.

#### Numeric action variable

Some devices allow to operate on a variable working point. For example lights can be dimmed with a `brightness`, fans can spin at a `speed` etc.

By providing an action variable, the card allows you to choose the setting you want to apply with the action.

| Name                                 | Type    | Default       | Description                                                                                                                                                                                           |
| ------------------------------------ | ------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field                                | map     | **Required**  | field name in the `service_data` that is represented by this variable                                                                                                                                 |
| &nbsp;&nbsp;&nbsp;&nbsp;name         | string  | same as field | Name under which the variable is visible in the card                                                                                                                                                  |
| &nbsp;&nbsp;&nbsp;&nbsp;unit         | string  | " "           | Displayed unit                                                                                                                                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;min          | number  | **Required**  | Minimum value that can be set. If not provided, it will be read from the entity attributes.                                                                                                           |
| &nbsp;&nbsp;&nbsp;&nbsp;max          | number  | **Required**  | Maximum value that can be set. If not provided, it will be read from the entity attributes.                                                                                                           |
| &nbsp;&nbsp;&nbsp;&nbsp;step         | number  | **Optional**  | Step size                                                                                                                                                                                             |
| &nbsp;&nbsp;&nbsp;&nbsp;scale_factor | number  | **Optional**  | Scale factor to apply when calling service.<br>E.g. scale_factor for `brightness` of a light is set to 2.55, since it is defined in HA in range 0-255, while the card displays 0-100.                 |
| &nbsp;&nbsp;&nbsp;&nbsp;optional     | boolean | false         | Setting the variable is optional, the action can also be executed without this variable. <br>If `optional:true` is provided, a checkbox will be shown that needs to be selected to apply the variable |

**Example**

The Xiaomi Air Purifier can be controlled using the [Xiaomi Miio](https://www.home-assistant.io/integrations/xiaomi_miio/#service-xiaomi_miiofan_set_favorite_level-air-purifiers-only) integration.
To be able to set the speed of this device in your action, you can use:
```yaml
customize:
  fan.xiaomi_purifier:
    actions:
      - service: xiaomi_miio.fan_set_favorite_level
        name: "set speed"
        variables:
          level:
            name: "Speed"
            min: 1
            max: 16
```
You can now select the speed for this action in the schedule editor:

![action variable example](https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/action_variable_example.png?raw=true)

#### List action variable

With some actions, you can provide an option from a limited list of options.
For example, setting the value of an `input_select`, but also the operation mode of a thermostat.

By providing the list variable, the card allows you to choose the option when you set up the action.

| Name                                                  | Type   | Default       | Description                                                                   |
| ----------------------------------------------------- | ------ | ------------- | ----------------------------------------------------------------------------- |
| field                                                 | map    | **Required**  | field name in the `service_data` that is represented by this variable         |
| &nbsp;&nbsp;&nbsp;&nbsp;name                          | string | same as field | Name under which the variable is visible in the card                          |
| &nbsp;&nbsp;&nbsp;&nbsp;options                       | list   | **Required**  | List of options to choose from                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | **Required**  | Option value (which is passed with together with the field as `service_data`) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name  | string | same as value | Name to show for the option                                                   |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon  | string | none          | Icon to show with the option                                                  |

**Example**

Setting the operation mode of a thermostat.

Note that this configuration will already be set up when using _standard configuration_.

```yaml
customize:
  climate.my_thermostat:
    name: My thermostat
    icon: thermometer
    actions:
      - service: set_hvac_mode
        name: Set mode
        icon: "hass:settings"
        variables: 
          hvac_mode:
            name: Operation mode
            options:
              - value: heat
                icon: "hass:fire"
              - value: cool
                icon: "hass:snowflake"
              - value: "off"
                icon: "hass:power"
```
Now the list of options become visible when you set up the action:

![action variable example](https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/action_variable_list_example.png?raw=true)


#### Conditions

If you want to use a specific entity as a condition in a schedule, this can be configured by defining it in `customize` as well.

To do so, you will need to tell the card which states the entity can have, which is done using the `states` parameter.

There are two options for this:
1. Define a list of possible states
2. Define a numeric range for the state

If an entity has its states defined, it will automatically show up when creating a condition.

Example of defining a state list:
```yaml
customize:
  input_boolean.my_condition_entity:
    states: ['on','off']
```

Example of defining a numeric range:
```yaml
customize:
  sensor.my_other_condition_entity:
    states: {min: 0, max: 100, step: 1, unit: '%'}
```


### Display options
From v1.9.0, it is possible to configure what is displayed in the overview list.
By default, the card will display the entity + action on the first line, and on the second line the remaining time until the schedule will be triggered. For timeslots, there will be a display of the extra actions.

:warning: **Note**: This is a YAML-only feature currently, Not available in the UI editor.

Supported options for `display_options`:
| Name             | Type           | Default                                          | Description                                                            |
| ---------------- | -------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| `primary_info`   | string or list | `- "{entity}: {action}"`<br>`- additional-tasks` | Displayed text on the first line.<br>Choose from the properties below. |
| `secondary_info` | string or list | `relative-time`                                  | Displayed text on the second line<br>Choose from the properties below. |
| `icon`           | string         | "action"                                         | Choose which icon is displayed (`action` or `entity`)                  |

For creating multiple lines, enter a list of multiple properties. Empty items will be automatically skipped.

For combining multiple properties in a single line, use wildcards (with property in brackets). Make sure to wrap your text in quotes.

:warning: **Pro-tip**: You can use HTML for formatting the lines. So for example: `<b>{entity}</b>` will print the name in bold text.


The following properties are available:
| Name               | Description                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | Friendly name of the schedule (as configured in the 'options' panel)<br>Only if a custom name is defined (the generated ID will not be displayed). |
| `entity`           | Friendly name of the entity which is involved in the action.                                                                                       |
| `action`           | Description of the action that will be executed when the timer is expired.<sup>1</sup>                                                             |
| `relative-time`    | Duration until the schedule is triggered (if the schedule is enabled).<sup>1</sup>                                                                 |
| `time`             | Configured time for the schedule.<sup>1</sup>                                                                                                      |
| `days`             | Configured days for the schedule.                                                                                                                  |
| `additional-tasks` | The amount of remaining tasks/actions (other than the displayed one).<br>Only for time schemes, otherwise this property is skipped.                |
| `tags`             | Show tags assigned to schedule. See [tags](#tags).                                                                                                 |

<sup>1</sup> For *time schemes*, the displayed value corresponds to the closest timeslot.

Example (this is actually the default format):
```yaml
display_options:
  primary_info:
    - "{entity}: {action}"
    - additional-tasks
  secondary_info: relative-time
  icon: "hass:action"
```


### Tags
If you want to use multiple scheduler-cards in your Lovelace dashboard, it can be difficult to separate the schedules which show up in each card (with [include](#include) you can only control which <u>entities</u> are controlled by which cards).
With `tags` you can filter out schedules and assign them to their own cards.


To start using tags, edit the card configuration and assign `tags` to the scheduler card.

*Example:*
```yaml
type: custom:scheduler-card
#...rest of card configuration
tags: holiday
```

The effect of assigning tags:
- Only schedules with a matching tag will show up (unless `discover_existing` is set to *true*.
- All schedules created with this card will be automatically assigned with this tag.
- You can modify tags of a schedule by clicking 'Options' when editing/creating a schedule.

**Notes:**
- You can also assign multiple tags to the card. In this case they will not be automatically applied to newly created  (you should choose this via 'options'). 
- You can also assign multiple tags to a schedule. This allows you to make them appear in multiple cards (each with card having its own tag).
- You can assign `tags: none` to a card if you want to have only schedules without a tag showing up here.
- You can assign `tags: enabled` or `tags: disabled` to a card if you want to include (respectively) all enabled or disabled schedules.
- The option to assign tags on schedules is only available on cards which have the `tags` option set.

:warning: **Tip**: If you want to start using tags you will have to go through your current schedules and assign them with tags.
 You can  temporarily set `discover_existing: true` to make also schedules accessible which don't have the correct tag (yet).
You can also make the tags for schedules show up in the overview through `display_options`.

**Example usage**:

Consider the following situation:
- Card A should contain all normal (everyday) schedules.
- Card B should contain only holiday schedules.
- The normal schedules contain tasks to turn on the garden lights at 19:00 and turn them off again at 23:00.
- The holiday schedules contain tasks to turn on the dining lights at 17:00 and turn them off again at 22:00.

Since both cards have the light domain [included](#include), the created schedules would normally show up in both cards, which is not desirable.

Now by assigning `tags` to the card configurations, you can filter them. 

Config for card A:
```yaml
type: custom:scheduler-card
title: Normal schedule
#...rest of card configuration
tags: none
```
Config for card B:
```yaml
type: custom:scheduler-card
title: Holiday schedule
#...rest of card configuration
tags: holiday
```

Result:

![tags example](https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/tags_example.png?raw=true)


**Excluding tags**

For more advanced filtering it is possible to define `exclude_tags` to the card.

The tag or tags defined in `exclude_tags` will be used to hide schedules from a card.

The `exclude_tags` function works on top of the `tags` function, so you can eliminate schedules from the ones which are included via `tags`.

*Example use-case*

* All schedules for the holiday program are assigned with tag `holiday`.
* All schedules which occur in the weekend are assigned with tag `weekend`.
* By assigning `tags: weekend` and `exlude_tags: holiday` only the weekend schedules which are not part of the holiday program will be shown.


## Translations

The card is available in multiple languages. The card will automatically detect the appropriate translation based on the language setting for your user account in HA.

Currently the following languages are supported:

| Language    | Code(s)    | Status / Remarks  |
| ----------- | ---------- | ----------------- |
| Čeština     | cs         |                   |
| Deutsch     | de         |                   |
| **English** | en         | Default language. |
| Eesti       | et         |                   |
| Español     | es, es_419 |                   |
| Français    | fr         |                   |
| עִברִית       | he         |                   |
| Italiano    | it         |                   |
| Latviešu    | lv         |                   |
| Magyar      | hu         |                   |
| Polski      | pl         |                   |
| Português   | pt, pt-br  |                   |
| Русский     | ru         |                   |
| Română      | ro         |                   |
| Slovenščina  | sl         |                   |
| Slovenský  | sk         |                   |
| Suomalainen  | fi        |                   |
| Nederlands  | nl         |                   |
| Norsk       | no, nb, nn |                   |
| 简体中文    | zh-Hans    |                   |

The translations are maintained by users.
If you are missing a translation, or a translation needs to be improved, please contribute. Take the [english](https://github.com/nielsfaber/scheduler-card/blob/main/src/localize/languages/en.json) file as a starting point.

---

## Tips & Tricks

### Triggering multiple actions on a schedule

The scheduler-card can only be used to create schedules to trigger a single action at a certain point in time.

Recently, support has been added to trigger an action on a [group](https://www.home-assistant.io/integrations/group/) and for targeting multiple entities for the action (but they have to be of the same type).

If you want to trigger a sequence of actions (e.g. *"set fan mode + temperature setpoint for my airconditioner"*), the recommended way to do so, is by creating a script.
Scripts can be combined with variables to pass some settings which can be configured through the card.

<u>Example</u>

*Setting fan mode + heating/cooling to a certain temperature.*

scheduler-card configuration:

(note that `customize` is only available in YAML editing mode):



```yaml
customize:
  script.set_climate_livingroom:
    actions:
      - service: script.set_climate_livingroom
        name: Set climate
        icon: mdi:air-conditioner
        variables:
          hvac_mode:
            name: HVAC mode
            options:
              - value: heat
                icon: mdi:fire
              - value: cool
                icon: mdi:snowflake
              - value: 'off'
                icon: mdi:power
          temperature:
            name: Temperature
            min: 12
            max: 30
          fan_mode:
            name: Fan mode
            options:
              - value: auto
                icon: mdi:fan-auto
              - value: high
                icon: mdi:fan-speed-3
              - value: quiet
                icon: mdi:fan-speed-1

```

In `scripts.yaml`:
```yaml
set_climate_livingroom:
  alias: Set climate livingroom
  description: "Sets climate parameters for scheduler-card"
  variables:
    target_entity: climate.my_airconditioner
  sequence:
    - service: climate.set_temperature
      data:
        temperature: "{{ temperature }}" # match with variable in the card config
      target:
        entity_id: "{{ target_entity }}"
    - delay: # wait a bit, otherwise the next service call may fail
        seconds: 1
    - service: climate.set_fan_mode
      target:
        entity_id: "{{ target_entity }}"
      data:
        fan_mode: "{{ fan_mode }}" # match with variable in the card config
    - delay: # wait a bit, otherwise the next service call may fail
        seconds: 1
    - service: climate.set_hvac_mode
      target:
        entity_id: "{{ target_entity }}"
      data:
        hvac_mode: "{{ hvac_mode }}" # match with variable in the card config
  mode: single
  icon: mdi:air-conditioner

```

### Customizing built-in actions

Out of the box, scheduler looks at the properties of your HA entities to show the correct actions in the card.
In 99% of the cases this gives the right behaviour, but exceptions are always possible.
To overcome this, scheduler allows overwriting the built-in actions by your own ones.

<u>Example:</u>

The [Tuya TS0601](https://www.zigbee2mqtt.io/devices/TS0601_thermostat.html) Zigbee TRV has operation modes `off`, `heat`, `auto`.
The Scheduler Card will show an action `heat`, which sets the temperature to the desired level and sets the mode to `heat`.
However, in mode `heat` the TS0601 will remain continuously heating, i.e. it does not regulate to the desired temperature.
Instead, the `heat` action needs to be modified to use mode `auto` instead (in which it does properly regulate temperature).

This can be done via `customize` as follows:
```yaml
customize:
  climate.my_tuya_thermostat:
    exclude_actions:
      - heat       # hide the built-in action to avoid duplicates
      - set mode   # we won't use this
      - set preset # we won't use this
    actions:       # add the custom actions
      - service: set_temperature
        service_data:
          hvac_mode: auto
        variables:
          temperature:
            min: 10
            max: 25
            step: 0.5
            unit: '°C'
        icon: 'hass:fire'
        name: "heat[ to {temperature}]" # replace with local translation for 'heat' and 'to' if desired
```


---

## Troubleshooting

If you have an issue with this card, please report it [here](https://github.com/nielsfaber/scheduler-card/issues).

### Checking card version

To check which version of the card is currently active, consult the browser console logs.
The browser console logs can only be accessed via a PC (so not via phone or tablet).

[Here's](https://balsamiq.com/support/faqs/browserconsole/#:~:text=To%20open%20the%20developer%20console,(on%20Windows%2FLinux).
) an excellent guide on how to access the console logs for various browsers.

With the console logs open, access the HA dashboard containing the the scheduler card.
In the console log you should see a badge with the version that is currently active, similar to this:

<img src="https://github.com/nielsfaber/scheduler-card/blob/main/screenshots/version_badge.png?raw=true" width="250px">

In case this version does not match with the version which is installed, your browser is holding an older version of the card in its cache.
HA uses aggressive caching of the frontend, this has nothing to do with the card.

Potential ways to solve this:
* In HACS, after installing/updating the card you are asked if you want to reload your browser (and yes, you do). You can also look for the existing installation of scheduler card (under Frontend) and choose redownload (in the top right menu) to get the option again.
* Do a force refresh of the page: On windows you can do CTRL + F5 and on Apple hold down ⌘ Cmd and ⇧ Shift key and then press R.
* Clear the browser cache: [here's](https://www.refreshyourcache.com/en/home/) a good guide on how to do this on various browsers.


---


## Say thank you
If you want to make donation as appreciation of my work, you can do so via PayPal (preferred) or buy me a coffee. Thank you!

<a href="https://www.paypal.com/donate/?business=CLL4T6Y8ACXNN&no_recurring=0&item_name=Thank+you+for+supporting+my+work+on+the+Scheduler+project%2E+it+is+much+appreciated%21&currency_code=EUR" target="_blank"><img src="https://pics.paypal.com/00/s/YzlhMzI2ZjYtZDQxMi00NzNiLThmZTktOTk3MmEyYTA2Zjc0/file.PNG" width="150" /></a>
<a href="https://www.buymeacoffee.com/vrdx7mi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"></a>
