# scheduler-card
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)  

## Introduction
This is a Lovelace card for Home Assistant that can be used to create a time schedule for your smart devices.
You can create new rules, modify existing rules and temporarily disable rules.

The card works on top of the [scheduler custom component](https://github.com/nielsfaber/scheduler-component). You *will* need it this as well.

See it in action:

![alt text](https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/Demonstration.gif?raw=true "demonstration video")

## Installation

HACS installation:
1. Add `https://github.com/nielsfaber/scheduler-card` as a custom frontend repository.
2. Click on "Install" under the new card that just popped up.

<details><summary>Manual installation</summary>

1. Download the latest release of the `scheduler-card.js` [here](https://github.com/nielsfaber/scheduler-card/releases) and place it into `www/scheduler-card`.

2. Add a reference to the card in the resources section of `ui-lovelace.yaml`:

```yaml
resources:
  - url: /local/scheduler-card/scheduler-card.js?v=0
    type: module
```

</details>

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

## Updating
### Updating via HACS
HACS should auto-remind you in the HACS tab when an update is available.

### Updating manually

Use `git pull` for manual installation updates.

Since most browsers will cache the Lovelace card code, you can force a refresh of  the browser by editing the entry in the `resources:` section in  `ui-lovelace.yaml`, by updating the version to `?v=(n+1)` (where `n` the current value).

## Configuration options
Configuration is not mandatory.
Out of the box, the card should already find most of your HA entities and provide some basic actions for each.
If you want to modify which entities and/or actions can be used, then keep reading.

| Name | Type | Default | Description
| ---- | ---- | ------- | ----------- 
| type | string | **Required** | `custom:scheduler-card`
| domains | map | none | Configure options for multiple entities of same domain. <br>See [here](#domains) for information about domain configuration options.
| entities | map | none | Configure options for a individual entities. <br>See [here](#entities) for information about entities configuration options.
| groups | map | none | Organize the entities menu. <br>See [here](#groups) for information about group configuration options.
| discoverExisting | boolean | True | Always show the existing schedules, also if the related entities are not included in the configuration.
| standardConfiguration | boolean | True | Use the [standard configuration](#about-the-standard-configuration) as a base configuration.

:warning: **Tip**: It is possible to use multiple scheduler-cards in your HA config. In this case it is recommended to set `discoverExisting:false` and `standardConfiguration:false` in both cards to avoid duplicates.

### About the standard configuration
The standard configuration is intended to help you started without needing coding (yaml) skills.

Included in the standard configuration:
| Device type/domain | Supported actions | Remarks
| ------------------ | ----------------  | ----
| light | *Turn on*<br> *Turn off* | Brightness is configurable <br><br>
| switch | *Turn on*<br> *Turn off* |
| cover | *Open*<br> *Close* |
| climate | *Set temperature*<br> *Turn off* | Temperature is configurable <br><br>
| fan | *Turn on* <br> *Turn off* |

Are you missing something that should be long in the standard configuration? [Let me know](https://github.com/nielsfaber/scheduler-card/issues)

## Domains
With the `domain:` option, you can specify configuration options for multiple HA entities of the same type (domain).

By default, ALL entities that you have in HA belonging to this domain will show up in the card.

If this is undesired, you can provide the specific entities you want to `include` or provide specific entities you want to `exclude`.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| domain | key | **Required** | Entity domain from home assistant
| actions | list | none | See [actions](#actions)
| icon | string | none | Displayed icon for entities in the domain (overwrites HA config)
| include | list | none | Filter the entities for this domain, only add the entity_ids in this list 
| exclude | list | none | Filter the entities for this domain, leave out the entity_ids in this list 

Example:
if you want to be able to turn on/turn off all the lamps in your house, you could add the following:
```yaml
domains:
  light:
    actions:
      - service: turn_on
      - service: turn_off
```

### Examples with include/exclude
Scenario 1:
*“I have a lot of lights in my house, but i only want to control some of them with the scheduler.”*

– Use the include option to specify which lights you want to add:

```yaml
domain:
  light:
    include:
      - light.my_light_1
      - light.my_light_2
      - light.my_light_3
    # rest of domain config (actions, icon, ...)
```
Scenario 2:
*“I have a lot of lights in my house, but i only want to control all but some of them with the scheduler.”*

– Use the exclude option to specify which lights you want to be ignored:

```yaml
domain:
  light:
    exclude:
      - light.my_light_that_i_never_use
    # rest of domain config (actions, icon, ...)
```

### Entities
With the `entities:` option you can specify configuration for a single entity in HA.

:warning: **Tip**: You can use entities `configuration` in combination with `domain` configuration, the configurations will be merged.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entity | key | **Required** | Entity id from home assistant
| actions | list | none | See [actions](#actions)
| name | string | (take from HA config) | Displayed name for entity
| icon | string | (take from HA config) | Displayed icon for entity

Example:
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

### Action
The actions define what needs to be done when a scheduler timer is expired.
Actions are linked to their entities, so the entity ID is send together with the service call (it is not needed to add it to the `service_data`).

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| service | string | **Required** | Service to be executed
| service_data | map | none | Additional parameters to use for the service call
| variable | map | none | Add a variable. See [action variable](#action-variable)
| name | string | (same as service) | Displayed name for action
| icon | string | "flash" | Displayed icon for action

#### Action variable
Some devices work with variable setting. For example a light can have a `brightness`, fan can have a `speed` etc.
If the action is configured with a variable, the card allows you to choose the setting you want to apply with the action.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| field | string | **Required** | field name in the `service_data` that is represented by this variable
| name | string | same as field | Name under which the variable is visible in the card
| unit | string | " " | Displayed unit
| min | number | 0 | Minimum value that can be set
| max | number | 255 | Maximum value that can be set
| step | number | 1 | Step size
| optional | boolean | false | Setting the variable is optional. The action can also be executed without this variable.
| showPercentage | boolean | false | Show slider in percentage instead of from min to max.

Example:
The Xiaomi Air Purifier can be controlled using the [xiaomi miio](https://www.home-assistant.io/integrations/xiaomi_miio/) integration.
To be able to set the speed of this device in your action, you can use:
```
- service: xiaomi_miio.fan_set_favorite_level
  variable:
    field: level
    name: "Speed"
    min: 1
    max: 16
    showPercentage: true
```

### Groups
The `groups:` option provides the capability of organizing the entities. 

:warning: **Tip**: The card will automatically create groups based on the domains of the entities in your configuration.
If you're OK with this, you don't need to configure `groups`.

Make sure that the `entities` and `domains` in your groups are also included in their specific configurations.
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| group_id | key | **Required** | Identifier for group
| name | string | (same as group_id) | Displayed name for group
| icon | string | none | Displayed icon for group
| entities | list | none | [entities](#entities) to be added in this group
| domains | list | none | [domains](#domains) to be added in this group

Example:
  ```yaml
groups:
  lights:
    name: "Lighting"
    icon: lightbulb
    domains: [light]
  ```
