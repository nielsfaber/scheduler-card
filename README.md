# scheduler-card
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)  
This project is still a work-in-progress. Feel free to use it, but some functions may contain bugs at this point.

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
Out of the box, the card should be able to find all your `light`, `cover`, `switch` and `climate` entities with some basic actions.
If you want to use other entities and/or actions, then keep reading.

| Name | Type | Default | Description
| ---- | ---- | ------- | ----------- 
| type | string | **Required** | `custom:scheduler-card`
| domains | map | none | See [domains](#domains)
| entities | map | none | See [entities](#entities)
| groups | map | none | See [groups](#groups)
| discoverExisting | boolean | True | Always show the existing schedules, also if the related entities are not included in the configuration.
| standardConfiguration | boolean | True | Automatically list `light`, `cover`, `switch` and `climate` entities if no configuration is provided.

## Domains
With the `domain:` option, you can specify configuration options for all entities in HA of the same type (domain).

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| domain | key | **Required** | Entity domain from home assistant
| actions | list | none | See [actions](#actions)
| group | string | none | Group under which the entities need to be displayed
| icon | string | none | Displayed icon for entities in the domain (overwrites HA config)

Example:
if you want to be able to turn on/turn off different lamps in your house, you could add the following:
```yaml
domains:
  light:
    name: My lamps
    actions:
      - service: turn_on
      - service: turn_off
```

### Entities
With the `entities:` option you can specify configuration for a single entity in HA.

Note: you can use this in combination with `domain` configuration, the configurations will be merged.

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
            brightness: 100
          name: "Turn on at 40%"
          icon: lightbulb-on-outline
  ```

### Groups
The `groups:` option provides the capability of organizing the entities. 

By default, entities will be grouped based on their `domain`, but you can change this as you wish.

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
### Action
The actions define what needs to be done when a scheduler timer is expired.
Actions are linked to their entities, so the entity ID is send together with the service call (it is not needed to add this to the `service_data`.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| service | string | **Required** | Service to be executed
| service_data | map | none | Additional parameters for the service call
| name | string | (same as service) | Displayed name for action
| icon | string | "flash" | Displayed icon for action
