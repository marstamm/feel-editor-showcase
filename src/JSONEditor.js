import {basicSetup, EditorView} from "codemirror"
import {keymap} from "@codemirror/view"
import {EditorState, Compartment} from "@codemirror/state"
import {indentWithTab} from "@codemirror/commands"
import {json} from "@codemirror/lang-json"

export const Editor = function({
    onChange = () => {},
    value = "",
}) {
    let language = new Compartment;

    const changeHandler = EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange(update.state.doc.toString());
        }
      });

    let state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        changeHandler,
        language.of(json())
      ]
    })
    
    const editor = new EditorView({
      state,
      parent: document.querySelector('.contextEditor')
    })

    const setValue = function(value) {
      editor.dispatch({
        changes: {
          from: 0,
          to: editor.state.doc.length,
          insert: value,
        }
      });
    };

    return {
      editor,
      setValue
    }
}

