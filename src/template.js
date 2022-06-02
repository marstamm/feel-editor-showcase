export default [{
  "name": "Test Template",
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "id": "my.custom.FeelTask.String",
  "appliesTo": [
    "bpmn:ServiceTask"
  ],
  "properties": [
    {
      "label": "Input 1",
      "type": "String",
      "editable": true,
      "binding": {
        "type": "zeebe:taskHeader",
        "key": "myCustomProp"
      }
    },
    {
      "label": "Input 2",
      "type": "String",
      "feel": "optional",
      "editable": true,
      "binding": {
        "type": "zeebe:taskHeader",
        "key": "optionalFeelProp"
      }
    },
    {
      "label": "Input 3",
      "type": "String",
      "feel": "optional",
      "editable": true,
      "binding": {
        "type": "zeebe:taskHeader",
        "key": "optionalFeelPropActivated"
      },
      "value": "="
    },
    {
      "label": "Input 4",
      "type": "String",
      "feel": "required",
      "editable": true,
      "binding": {
        "type": "zeebe:taskHeader",
        "key": "feelProp"
      }
    }
  ],
  "entriesVisible": false
}]