# scheduler-card

This project is still a work-in-progress. Feel free to use it, but some functions may contain bugs at this point.

## Introduction
This is a Lovelace card for Homeassistant that can be used to create a time schedule for your smart devices.
You can create new rules, modify existing rules and temporarily disable rules.

The card works on top of the [scheduler custom component](https://github.com/nielsfaber/scheduler-component). You *will* need it this as well.

See it in action:

![alt text](https://github.com/nielsfaber/scheduler-card/blob/master/screenshots/Demonstration.gif?raw=true "demonstration video")

## Installation

1. Clone this repository into the `www`-directory: `git clone https://github.com/nielsfaber/scheduler-card.git` Alternatively, download this repository as a zip and extract the `*.js` files into `www/scheduler-card`.

2. Add a reference to the card in the resources section of `ui-lovelace.yaml`:

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

## Updating

Update using `git pull` in the `www/scheduler-card` or overwrite the `*.js` files to update.
Refresh your browser cache or update url in the ui-lovelace to `?v=(n+1)`


## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:scheduler-card`
| domains | map | none | See [domains](#domains)
| entities | map | none | See [entities](#entities)
| groups | map | none | See [groups](#groups)

## Domains
The `domain:` option defines the entity domains that are available for choosing when creating a scheduler item.
By defining one or more actions for the domain, all entities in home assistant under this domain will become available for choosing in combination with the actions.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| domain | key | **Required** | Entity domain from home assistant
| actions | list | **Required** | See actions
| group | string | none | Group under which the entities need to be displayed
| icon | string | none | Displayed icon for entities in the domain (overwrites HA config)

## Entities
The `entities:` option defines the individual entities that are available for choosing when creating a scheduler item.
By defining one or more actions for the entity, these will become available for choosing in combination with the entity.
The entity configuration may be used to overrule the domain configuration.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| entity | key | **Required** | Entity id from home assistant
| actions | list | none | See actions
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
        - service: turn_off
          icon: lightbulb-off-outline 
  ```

## Groups
The `groups:` option provides the capability of organizing the entities.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| group_id | key | **Required** | Identifier for group
| name | string | (same as group_id) | Displayed name for group
| icon | string | "folder" | Displayed icon for group

Example:
  ```yaml
groups:
    lights:
      name: "Lighting"
      icon: lightbulb
  ```
## Action
The actions define what needs to be done when a scheduler timer is expired.
Actions are linked to their entities, so the entity ID is send together with the service call.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| service | string | **Required** | `Service to be executed
| service_data | map | none | Additional parameters for the service call
| name | string | (take from service) | Displayed name for action
| icon | string | "flash" | Displayed icon for action
