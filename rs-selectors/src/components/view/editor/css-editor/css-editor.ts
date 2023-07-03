import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import { Attributes, ClassesCSS } from '../../../../types/types';
import BaseComponent from '../../../../utils/BaseComponent';
import { View } from '../../View';
import { DEFAULT_CSS_EDITOR_CONTENT } from '../../../../data/constants';

hljs.registerLanguage('css', css);
const hljsLanguage = { language: 'css' };

const ROWS_COUNT = 10;
const INPUT_PLACEHODLER = 'Type a selector';
const BUTTON_TEXT = 'Enter';

const CSSClasses: ClassesCSS = {
    cssEditor: ['css-editor'],
    editorRows: ['editor__rows'],
    buttonEnter: ['css-editor__button'],
    inputContainer: ['input_container'],
    answerInput: ['css-editor__input'],
    answerOutput: ['language-css', 'css-editor__output'],
};

const cssEditorAttributes: Attributes = {
    answerInput: {
        type: 'text',
        placeholder: INPUT_PLACEHODLER,
    },

    navBarToggler: {
        type: 'button',
        'data-bs-toggle': 'offcanvas',
        'data-bs-target': '#offcanvasRight',
        'aria-controls': 'offcanvasRight',
    },
};

export class CssEditor extends View {
    private cssEditor = new BaseComponent('div', CSSClasses.cssEditor);

    private editorRows = new BaseComponent('div', CSSClasses.editorRows, this.cssEditor);

    private inputContainer = new BaseComponent('div', CSSClasses.inputContainer, this.cssEditor);

    private answerInput = new BaseComponent('input', CSSClasses.answerInput, this.inputContainer);

    private answerOutput = new BaseComponent('pre', CSSClasses.answerOutput, this.inputContainer);

    private buttonEnter = new BaseComponent('button', CSSClasses.buttonEnter, this.cssEditor);

    constructor() {
        super();

        this.answerInput.setAttributes(cssEditorAttributes.answerInput);
        this.buttonEnter.setTextContent(BUTTON_TEXT);
        console.log(hljs.highlight(`${this.answerOutput.getNode().textContent}`, hljsLanguage).value)
        this.answerOutput.insertHTML(hljs.highlight(`${DEFAULT_CSS_EDITOR_CONTENT}`, hljsLanguage).value);
        this.fillRowsWithNumbers();

        this.rememberElements('cssEditorComponent', {
            cssEditor: this.cssEditor,
            editorRows: this.editorRows,
            answerInput: this.answerInput,
            buttonEnter: this.buttonEnter,
            answerOutput: this.answerOutput,
        });
    }

    public getComponent(): BaseComponent {
        return this.cssEditor;
    }

    private fillRowsWithNumbers(): void {
        for (let i = 1; i <= ROWS_COUNT; i += 1) {
            const row = new BaseComponent('span', [], this.editorRows);
            row.setTextContent(`${i}`);
        }
    }
}
