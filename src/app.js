import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule,
  CloudElementTemplatesPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import ZeebeBpmnModdle from 'zeebe-bpmn-moddle/resources/zeebe.json'

import diagramXML from '../resources/simple.bpmn';
import { context } from './variableContext';
import { Editor } from './JSONEditor';
// import template from './template';

console.log(context);


var container = $('#js-drop-zone');

var canvas = $('#js-canvas');

var textArea = $('.contextEditor > textarea');

console.log(textArea)

const changeCb = function(val) {
  var currentVal = val

  var json;
  try {
    json = JSON.parse(currentVal);
  }
  catch (e) {
    console.log('invalid json');
    return;
  }

  bpmnModeler.get('eventBus').fire('propertiesPanel.newVariableContext', { context: json });

}

Editor({
  onChange: changeCb,
  value: JSON.stringify(context, null, 2)
})


const bpmnModeler = new BpmnModeler({
  container: canvas,
  propertiesPanel: {
    parent: '#js-properties-panel',
    variableContext: context
  },
  additionalModules: [
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    ZeebePropertiesProviderModule,
    CloudElementTemplatesPropertiesProviderModule
  ],
  moddleExtensions: {
    zeebe: ZeebeBpmnModdle
  },
  // elementTemplates: template
});

console.log(bpmnModeler);

bpmnModeler.on('elementTemplates.errors', function(event) {
  console.log('template load errors', event.errors);
});


container.removeClass('with-diagram');

function createNewDiagram() {
  openDiagram(diagramXML);
}

async function openDiagram(xml) {

  try {

    await bpmnModeler.importXML(xml);

    container
      .removeClass('with-error')
      .addClass('with-diagram');
  } catch (err) {

    container
      .removeClass('with-diagram')
      .addClass('with-error');

    container.find('.error pre').text(err.message);

    console.error(err);
  }
}

createNewDiagram();