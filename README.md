# scheduler-card <!-- omit in TOC -->
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)  

- [Introduction](#introduction)
- [Installation](#installation)
- [Updating](#updating)
- [Usage](#usage)
  - [Creating a schedule](#creating-a-schedule)
    - [Choosing an entity and action](#choosing-an-entity-and-action)
    - [Choosing the days](#choosing-the-days)
    - [Choosing the time](#choosing-the-time)
- [Configuration](#configuration)
  - [Introduction](#introduction-1)
  - [Overview](#overview)
  - [Quick start guide: using the standard configuration](#quick-start-guide-using-the-standard-configuration)
    - [Adding a domain](#adding-a-domain)
    - [Removing a domain](#removing-a-domain)
    - [Adding or removing specific entities](#adding-or-removing-specific-entities)
  - [Schedule discovery](#schedule-discovery)
  - [Using multiple cards](#using-multiple-cards)
    - [Step 1: Make sure your configuration has no overlap](#step-1-make-sure-your-configuration-has-no-overlap)
    - [Step 2: Disable the schedule discovery](#step-2-disable-the-schedule-discovery)
  - [Domains](#domains)
    - [Options](#options)
    - [Examples](#examples)
  - [Entities](#entities)
    - [Options](#options-1)
    - [Examples](#examples-1)
  - [Actions](#actions)
    - [Options](#options-2)
    - [Numeric action variable](#numeric-action-variable)
    - [List action variable](#list-action-variable)
  - [Groups](#groups)
    - [Options](#options-3)
    - [Examples](#examples-2)
- [Translations](#translations)
- [FAQ](#faq)
  - [*Can I make a schedule that checks a condition before executing the action?*](#can-i-make-a-schedule-that-checks-a-condition-before-executing-the-action)
  - [*How do i check which version i am using?*](#how-do-i-check-which-version-i-am-using)
  - [*How do I fix error 'Failed to call service scheduler/add. Service not found.' ?*](#how-do-i-fix-error-failed-to-call-service-scheduleradd-service-not-found-)
  - [*Why is there no such scheduler in HA yet?*](#why-is-there-no-such-scheduler-in-ha-yet)
- [Troubleshooting](#troubleshooting)
- [Say thank you](#say-thank-you)

## Introduction
This is a Lovelace card for Home Assistant that can be used to create a time schedule for your smart devices.
You can create new rules, modify existing rules and temporarily disable rules.

The card works on top of the [scheduler custom component](https://github.com/nielsfaber/scheduler-component). You *will* need it this as well.

See it in action:

![alt text](https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/Demonstration.gif?raw=true "demonstration video")

## Installation
<details>
<summary>click to show installation instructions </summary>

HACS installation:
1. Add `https://github.com/nielsfaber/scheduler-card` as a custom frontend repository.
2. Click on "Install" under the new card that just popped up.

Manual installation

1. Download the latest release of `scheduler-card.js` [here](https://github.com/nielsfaber/scheduler-card/releases) and place it into `www/scheduler-card`.

2. Use the GUI to add `/local/scheduler-card/scheduler-card.js?v=0`, or add a reference to the card in the resources section of `configuration.yaml`:

```yaml
resources:
  - url: /local/scheduler-card/scheduler-card.js?v=0
    type: module
```

 3. Add the card in the view where you want it to be shown:

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

Since most browsers will cache the Lovelace card code, you can force a refresh of  the browser by editing the entry in the `resources:` section in  `ui-lovelace.yaml`, by updating the version to `?v=(n+1)` (where `n` the current value).


</details>

---

## Usage

:construction: WIP More usage instructions should follow soon.



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

Typically an entity is a device in your house, but you can also control an `automation`, `script`, `input_boolean`, etc. If you are missing one or more entities, you can add these yourself using the [entities](#entities) or [domains](#domains) configuration.

__Actions__
The actions that you can perform for the selected entity show up here.
 Typically an action is to either 'turn on' or 'turn off' a device. But some entities have more capabilities. If you are missing an action, you can add it yourself to either entity or the complete domain (group) using the [actions](#actions) configuration.


 Actions can contain a variable setting (e.g. turn on a lamp at specific brightness, or change the setpoint for a thermostat).
These can be defined in the next page.

<img src="https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/instructions_select_entity.png?raw=true" width="500">

#### Choosing the days
After clicking the 'next' button, a new view appears.
This view is used for choosing _when_ the schedule should be active.

Choose the days of the week for which the schedule should be active.


__Every day__
 the default option. The schedule will perform the action every day at the specified time.

__Weekdays__
perform action only on Monday thru Friday. Typically weekdays are the same as working days, but it may depend on your country. Holidays are not taken into account as of yet.

__Custom__
choose your own days. A list with all days of the week appears. You can select one or more days by clicking them.

:construction: WIP rename _every day_ to _daily_

:construction: WIP rename _weekdays_ to _workdays_, and take into account holidays and the actual workdays in your country using the [workday sensor](https://www.home-assistant.io/integrations/workday/)

:construction: WIP add _weekends_ and make it the opposite of _workdays_

:construction: WIP add option to choose the first day of the week


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

<img src="https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/instructions_timepicker.png?raw=true" width="400">

---

## Configuration


### Introduction
The configuration of the card is in YAML.
Currently there is no UI editor provided (this may change in the future).

_Configuration is not necessary_, it is only used for customization.

The card includes a _standard configuration_.
It is intended to make setting up the card easy.
The standard configuration consists of the following:
* Discovery of devices (entities) of various types in your HA config and making them available for creating schedules
* Defining actions per entity based on their capabilities
* Icons for groups, entities and actions

:warning: **Tip**: If you want to define your own configuration, provide `standard_configuration:false` to disable it completely.


### Overview

| Name                   | Type              | Default      | Available from | Description                                                                                                                          |
| ---------------------- | ----------------- | ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| type                   | string            | **Required** | -              | `custom:scheduler-card`                                                                                                              |
| domains                | map               | none         | v1.0.0         | Configure options for multiple entities of same domain. <br>See [here](#domains) for information about domain configuration options. |
| entities               | map               | none         | v1.0.0         | Configure options for a individual entities. <br>See [here](#entities) for information about entities configuration options.         |
| groups                 | map               | none         | v1.0.0         | Organize the entities menu. <br>See [here](#groups) for information about group configuration options.                               |
| discover_existing      | boolean           | True         | v1.2.0         | Always show the existing schedules, also if the related entities are not included in the configuration.                              |
| standard_configuration | boolean           | True         | v1.2.0         | Use the [standard configuration](#about-the-standard-configuration) as a base configuration.                                         |
| title                  | boolean or string | True         | v1.2.8         | Provide your own name to overwrite the title of the card, or set to _false_ to hide the title.                                       |
| am_pm                  | boolean           | False        | v1.3.0         | Use AM/PM time notation (instead of 24 hours notation)                                                                               |
| time_step              | number            | 10           | v1.3.0         | Set the time step (in minutes) for the time picker                                                                                   |

:warning: **Tip**: It is possible to use multiple scheduler-cards in your HA config. In this case it is recommended to set `discover_existing:false` and `standard_configuration:false` in both cards to avoid duplicates.

### Quick start guide: using the standard configuration

By default, the card will show your `climate`, `cover`, `fan`, `light`, `switch` entities.
These types are called _domains_ in HA and thus are referred to as _domains_ configuration in the card.

The standard configuration has the same effect as putting the following in your card:
```yaml
domains:
  climate:
  cover:
  fan:
  light:
  switch:
```
If you don't like this set of devices, you can make changes to it.

#### Adding a domain

You can add `<domain_name>:` to include additional domains to the standard configuration.

Example: *"I would like to be able to run `script`s with the scheduler"*

```yaml
domains:
  script:
```
:warning: **Note**: Not all entity types are currently supported by the standard configuration. If you are missing something, you can make a  [feature request](https://github.com/nielsfaber/scheduler-card/issues/new) for it.

#### Removing a domain

You can use `<domain_name>:false` to exclude it from the standard configuration.

Example: *"I don't want `fan` entities to show up, but the others can stay"*

```yaml
domains:
  fan: false
```
:warning: **Note**: This notation is only applicable for `climate`, `cover`, `fan`, `light`, `switch`, since they are included by default.


#### Adding or removing specific entities

If you don't want to have the complete list of all entities in that domain, there are two options for achieving this:
1. By applying filtering to the domain
2. By providing `entities` configuration


If you don't want to customize specific entities (changing the displayed name/icon, showing specific actions), it's best to use the domain filtering.

Domain filtering is done using the `include` and `exclude` options.
With `include` you can specify which entities to add and with `exclude` you can specify which entities to hide.
You shouldn't use them together.

Scenario: *“I have a lot of lights in my house, but I only want to control some of them with the scheduler.”*

Use the include option to specify which lights you want to add:

```yaml
domain:
  light:
    include:
      - light.my_light_1
      - light.my_light_2
      - light.my_light_3
    # rest of domain config (actions, icon, etc.)
```
Scenario: *“I have a lot of lights in my house, but I only want to control all but some of them with the scheduler.”*

Use the exclude option to specify which lights you want to be ignored:

```yaml
domain:
  light:
    exclude:
      - light.my_light_that_i_never_use
    # rest of domain config (actions, icon, ...)
```


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



### Using multiple cards

It is possible to use multiple scheduler-cards in your Lovelace configuration.

For doing this, you can follow these steps.

#### Step 1: Make sure your configuration has no overlap

The easiest way to split is to split by _domain_. But it is also possible to make different grouping (for example by room): make use of the `entities` configuration (or domain filtering) if so.

Example: *"I want one card for lights, and one card for thermostats."*

Apply filtering to the _standard configuration_, to hide the domains that you don't want to see.

Card one (only has `light` enabled):
```yaml
title: "My lights"
domains:
  climate: false
  cover: false
  fan: false
  switch: false
```
Card two (only has `climate` enabled):
```yaml
title: "My thermostats"
domains:
  cover: false
  fan: false
  light: false
  switch: false
```

#### Step 2: Disable the schedule discovery
If you have multiple cards defined, you don't want the running schedules to appear twice.

Provide `discover_existing: false` to both cards, to prevent the unwanted schedules to show up. Only schedules matching your `domain` / `entities` configuration will show up.

### Domains
With the `domains` configuration you can specify configuration options for multiple HA entities of the same type (domain).

#### Options

:warning: **Tip**: By default, ALL entities that you have in HA under the configured domain will show up in the card. If you don't want this, then use `include` or `exclude` option to filter the entity ids that you want to add.

| Name    | Type   | Default      | Description                                                                |
| ------- | ------ | ------------ | -------------------------------------------------------------------------- |
| domain  | key    | **Required** | Entity domain from home assistant                                          |
| actions | list   | none         | See [actions](#actions)                                                    |
| icon    | string | none         | Displayed icon for entities in the domain (overwrites HA config)           |
| include | list   | none         | Filter the entities for this domain, only add the entity_ids in this list  |
| exclude | list   | none         | Filter the entities for this domain, leave out the entity_ids in this list |


#### Examples
Scenario: *"I want to be able to turn on/off all the lamps in my house"*
```yaml
domains:
  light:
    actions:
      - service: turn_on
      - service: turn_off
```

### Entities
With the `entities` configuration you can specify configuration for specific HA entities.

#### Options


:warning: **Tip**: You can use entities `configuration` in combination with `domains` configuration, the configurations will be merged. The `entities` configuration will overwrite `domains` configuration.

| Name    | Type   | Default               | Description                   |
| ------- | ------ | --------------------- | ----------------------------- |
| entity  | key    | **Required**          | Entity id from home assistant |
| actions | list   | none                  | See [actions](#actions)       |
| name    | string | (take from HA config) | Displayed name for entity     |
| icon    | string | (take from HA config) | Displayed icon for entity     |

#### Examples
For adding an action to turn on a light with 40% brightness, and styling the light with a custom icon and name:
  ```yaml
entities:
    light.my_lamp:
      name: "Dining light"
      icon: ceiling-light
      actions:
        - service: turn_on
          service_data:
            brightness: 40
          name: "Turn on at 40%"
          icon: lightbulb-on-outline
  ```
Result:

![entities example](https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/entities_example.png?raw=true)

### Actions
An action defines **what** needs to be done when a schedule timer expires.

#### Options

An action is similar to a [service call](https://www.home-assistant.io/docs/scripts/service-calls/) in HA. It requires a `service` with optionally additional parameters given by `service_data`.

Actions are linked to their entities, so the entity ID is sent together with the service call, it is not needed to add it to the `service_data`).

| Name         | Type   | Default           | Description                                             |
| ------------ | ------ | ----------------- | ------------------------------------------------------- |
| service      | string | **Required**      | Service to be executed                                  |
| service_data | map    | none              | Additional parameters to use for the service call       |
| variable     | map    | none              | Add a variable. See [action variable](#action-variable) |
| name         | string | (same as service) | Displayed name for action                               |
| icon         | string | "flash"           | Displayed icon for action                               |


:warning: **Note**: Templates (jinja code) are not supported at this point.

#### Numeric action variable

Some devices allow to operate on a variable working point. For example lights can be dimmed with a `brightness`, fans can spin at a `speed` etc.

By providing an action variable, the card allows you to choose the setting you want to apply with the action.

| Name                | Type        | Default       | Description                                                                                                                                                                                           |
| ------------------- | ----------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| field               | string      | **Required**  | field name in the `service_data` that is represented by this variable                                                                                                                                 |
| name                | string      | same as field | Name under which the variable is visible in the card                                                                                                                                                  |
| unit                | string      | " "           | Displayed unit                                                                                                                                                                                        |
| min                 | number      | 0             | Minimum value that can be set. If not provided, it will be read from the entity attributes.                                                                                                           |
| max                 | number      | 255           | Maximum value that can be set. If not provided, it will be read from the entity attributes.                                                                                                           |
| step                | number      | 1             | Step size                                                                                                                                                                                             |
| optional            | boolean     | false         | Setting the variable is optional, the action can also be executed without this variable. <br>If `optional:true` is provided, a checkbox will be shown that needs to be selected to apply the variable |
| ~~show_percentage~~ | ~~boolean~~ | ~~false~~     | This option is removed in v1.5.0. Use '%' as unit instead.                                                                                                                                            |

**Example**

The Xiaomi Air Purifier can be controlled using the [Xiaomi Miio](https://www.home-assistant.io/integrations/xiaomi_miio/#service-xiaomi_miiofan_set_favorite_level-air-purifiers-only) integration.
To be able to set the speed of this device in your action, you can use:
```
- service: xiaomi_miio.fan_set_favorite_level
  name: "set speed"
  variable:
    field: level
    name: "Speed"
    min: 1
    max: 16
```
You can now select the speed for this action in the schedule editor:

![action variable example](https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/action_variable_example.png?raw=true)

#### List action variable

With some actions, you can provide an option from a limited list of options.
For example, setting the value of an `input_select`, but also the operation mode of a thermostat.

By providing the list variable, the card allows you to choose the option when you set up the action.

| Name     | Type   | Default       | Description                                                                   |
| -------- | ------ | ------------- | ----------------------------------------------------------------------------- |
| field    | string | **Required**  | field name in the `service_data` that is represented by this variable         |
| name     | string | same as field | Name under which the variable is visible in the card                          |
| options  | list   | **Required**  | List of options to choose from                                                |
| -- value | string | **Required**  | Option value (which is passed with together with the field as `service_data`) |
| -- name  | string | same as value | Name to show for the option                                                   |
| -- icon  | string | none          | Icon to show with the option                                                  |

**Example**

Setting the operation mode of a thermostat.

Note that this configuration will already be set up when using _standard configuration_.

```yaml
        entities:
          climate.my_thermostat:
            name: My thermostat
            icon: thermometer
            actions:
              - service: set_hvac_mode
                name: Set mode
                icon:
                variable:
                  field: hvac_mode
                  name: Operation mode
                  options:
                    - value: heat
                      icon: fire
                    - value: cool
                      icon: snowflake
                    - value: 'off'
                      icon: power
```
Now the list of options become visible when you set up the action:

![action variable example](https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/action_variable_list_example.png?raw=true)

### Groups
The `groups` configuration provides the capability of organizing the entities.
They have nothing to do with the [group](https://www.home-assistant.io/integrations/group/) integration in Home Assistant.

#### Options

:warning: **Tip**: The card will automatically create groups based on the domains of the entities in your configuration. If you're OK with this, you don't need to configure `groups`.

| Name     | Type   | Default            | Description                                     |
| -------- | ------ | ------------------ | ----------------------------------------------- |
| group_id | key    | **Required**       | Identifier for group                            |
| name     | string | (same as group_id) | Displayed name for group                        |
| icon     | string | none               | Displayed icon for group                        |
| entities | list   | none               | [entities](#entities) to be added in this group |
| domains  | list   | none               | [domains](#domains) to be added in this group   |

#### Examples
Simple example: Place all `light` entities in group labelled "lighting" (this is part of the standard configuration):
```yaml
groups:
  lights:
    name: "Lighting"
    icon: ceiling-light
    domains: [light]
```
Result:

![groups example](https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/groups_example.png?raw=true)

## Translations

The card is available in multiple languages. The card will automatically detect the appropriate translation based on the language setting for your user account in HA.

:warning: **Important**: The language setting for your HA account is stored in the browser cache. If a translation does not work for you as expected, you should try to update your language setting on that specific device. The scheduler-card _attempts_ to update the cache based on the HA configuration as a workaround.

Currently the following languages are supported:

| Language    | Code(s)    | Available from | Status / Remarks                                                                       |
| ----------- | ---------- | -------------- | -------------------------------------------------------------------------------------- |
| Deutsch     | de         | v1.2.3         |                                                                                        |
| **English** | en         | v1.0.0         | Default language.                                                                      |
| Eesti       | et         | v1.4.0         |                                                                                        |
| Español     | es, es_419 | v1.2.8         |                                                                                        |
| Français    | fr         | v1.2.3         |                                                                                        |
| Magyar      | hu         | v1.3.0         |                                                                                        |
| Polski      | pl         | v1.2.6         |                                                                                        |
| Português   | pt, pt-br  | v1.3.0         | Translation is brazilian Portuguese, improvements may be needed for native Portuguese. |
| Русский     | ru         | v1.2.8         |                                                                                        |
| Nederlands  | nl         | v1.2.2         |                                                                                        |
| Norsk       | no, nb, nn | v1.2.8         |                                                                                        |




The translations are maintained by users.
If you are missing a translation, or a translation needs to be improved, please contribute. Take the [english](https://github.com/nielsfaber/scheduler-card/blob/master/src/localize/languages/en.json) file as a starting point.

---
## FAQ

### *Can I make a schedule that checks a condition before executing the action?*

From within the _scheduler-card_, there is unfortunately no such functionality in place.
There are two alternative ways:

__1. Use an `automation` to control when the schedule is running__

 Create an `automation` that checks for the condition, and based on this, enables or disables the schedule.
 Run service `switch.turn_off` or `switch.turn_on` with the entity_id matching your schedule.

<u>Main disadvantage</u>: the entity_id of a schedule is not easy to read: they are randomly generated, and the entity_id does not tell anything about the related entity.


__2. Use an `script` to check the condition before execution of the action__

 Create a `script` that checks for the condition, and if it passes, executes the action.
 Use the scheduler to execute this `script` (instead of the actual entity you want to control).
Currently this is considered the best option.

<u>Main disadvantage</u>: you will have to add configuration to the card to make the `script` selectable in the scheduler-card. The result will look less pretty than with other entities.

<br>

Example: _Turn on my thermostat at X degrees. but only if my window is closed_

First create the `script` (for setting up scripts see [here](https://www.home-assistant.io/integrations/script/)):
```yaml
my_script:
  fields:
    temperature: {} # allow temperature as variable field
  sequence: # sequence for multiple steps, aborts if a step fails
    - condition: state # check the condition
      entity_id: binary_sensor.my_window
      state: 'off'
    - service: climate.set_temperature # update the temperature
      data_template:
        entity_id: climate.my_thermostat
        temperature: "{{ temperature }}"

```
To add the newly created script to HA you need to restart HA (or run 'reload scripts').

Now, add the `script` entity to the card:
```yaml
type: custom:scheduler-card
(...)
entities:
  script.my_script:
    name: My thermostat script
    actions:
      - service: script.my_script # service is the same as entity_id for scripts
        name: set temperature
        variable: # add action variable to show a slider for choosing the temperature
          field: temperature
```

### *How do i check which version i am using?*

In your browser, open the console log. This is usually accessible from the developer tools (MS Edge: F12, Chrome: ctrl+shift+i). There should be a badge titled _"SCHEDULER-CARD"_ with the version number included.

<br>

### *How do I fix error 'Failed to call service scheduler/add. Service not found.' ?*

This error suggests that the [scheduler-component](https://github.com/nielsfaber/scheduler-component) is not running. Please do NOT file an issue in this repo.

<br>

### *Why is there no such scheduler in HA yet?*

Good question, ask the developers!

But let's see if we can get convince them to adopt this scheduler, simply by making it awesome :)

<br>

## Troubleshooting

If you have an issue with this card, please report it [here](https://github.com/nielsfaber/scheduler-card/issues).


---


## Say thank you
If you want to make donation as appreciation of my work, you can buy me a coffee. Thank you!

<a href="https://www.buymeacoffee.com/vrdx7mi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"></a>
