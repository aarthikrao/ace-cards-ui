import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-beautify';
import 'ace-builds/src-noconflict/ext-language_tools';



const THEME = 'ace/theme/github';
const LANG = 'ace/mode/javascript';

@Component({
  selector: 'app-rule-box',
  templateUrl: './rule-box.component.html',
  styleUrls: ['./rule-box.component.css']
})
export class RuleBoxComponent implements OnInit {
  @ViewChild('codeEditor', { static: true }) codeEditorElmRef: ElementRef;
  private codeEditor: ace.Ace.Editor;
  private editorBeautify;

  text: string;
  constructor() { }

  ngOnInit() {
    this.text = `age > 10`;
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 10,
      maxLines: 10,
      fontSize: 18,
      value: this.text,
      showLineNumbers:false,
      showGutter:false,
    };

    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.editorBeautify = ace.require(`ace/ext/beautify`);

    // this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
    this.codeEditor.setValue(this.text)
    this.codeEditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: false
    });


    var staticWordCompleter = {
      getCompletions: function (editor, session, pos, prefix, callback) {
        var wordList = ["age", "street", "country", "account_bal", "date_of_birth"];
        callback(null, wordList.map(function (word) {
          return {
            caption: word,
            value: word + "_ace" ,
            meta: "attribute"
          };
        }));

      }
    }

    this.codeEditor.completers = [staticWordCompleter]
  }

  beautifyContent() {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      this.editorBeautify.beautify(session);
    }
    console.log(this.codeEditor.getValue())
  }
}
