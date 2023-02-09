import $ from 'jquery';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule,
  } from 'bpmn-js-properties-panel';

import {
  ZeebeVariableResolverModule
} from "@bpmn-io/variable-resolver";

import ZeebeBehaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

import VariableProvider from "@bpmn-io/variable-resolver/lib/VariableProvider";

import ZeebeBpmnModdle from 'zeebe-bpmn-moddle/resources/zeebe.json'

import diagramXML from '../resources/simple.bpmn';
import { context } from './variableContext';
import { Editor } from './JSONEditor';
import { is } from 'bpmn-js/lib/util/ModelUtil';

var container = $('#js-drop-zone');

var canvas = $('#js-canvas');

var textArea = $('.contextEditor > textarea');

let result = context;

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

  result[currentSelection.id] = json;

  bpmnModeler.get('eventBus').fire('commandStack.changed');
}

class AdditionalVariableProvider extends VariableProvider {

  getVariables(element) {

    const res = result[element.id];

    if(res) {
      return JSON.parse(JSON.stringify(res));
    }

    // if (!is(element, 'bpmn:Process')) {
    //   console.log(element);
    //   return;
    // }

    // console.log('getVariables', result);

    // return result;

  }
}

let currentSelection = undefined;

function connectToEditor(eventBus, canvas) {

  eventBus.on('selection.changed', function(e) {
    const rootElement = canvas.getRootElement();
  
    const selected = e.newSelection[0];

    currentSelection = selected || rootElement;

    editor.setValue(JSON.stringify(result[currentSelection.id] || [], null, 2));
    // console.log('selection.changed', e);
  })

}

const AdditionalVariableModule = {
  __init__: [
    'additionalVariableProvider',
    'connectToEditor'
  ],
  additionalVariableProvider: [ 'type', AdditionalVariableProvider ],
  connectToEditor: [ 'type', connectToEditor ]
};

const editor = Editor({
  onChange: changeCb,
  value: JSON.stringify(context, null, 2)
})


const bpmnModeler = new BpmnModeler({
  container: canvas,
  propertiesPanel: {
    parent: '#js-properties-panel'
  },
  additionalModules: [
    ZeebeBehaviorsModule,
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    ZeebePropertiesProviderModule,
    ZeebeVariableResolverModule,
    AdditionalVariableModule
  ],
  moddleExtensions: {
    zeebe: ZeebeBpmnModdle
  },
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