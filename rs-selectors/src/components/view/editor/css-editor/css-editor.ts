import { Attributes, ClassesCSS } from '../../../../types/types';
import BaseComponent from '../../../../utils/BaseComponent';
import { View } from '../../View';

const ROWS_COUNT = 10;
const INPUT_PLACEHODLER = 'Type a selector';
const BUTTON_TEXT = 'Enter';

const CSSClasses: ClassesCSS = {
    cssEditor: ['css-editor'],
    editorRows: ['editor__rows'],
    answerInput: ['language-css', 'css-editor__input'],
    buttonEnter: ['css-editor__button'],
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

    private answerInput = new BaseComponent('input', CSSClasses.answerInput, this.cssEditor);

    private buttonEnter = new BaseComponent('button', CSSClasses.buttonEnter, this.cssEditor);

    constructor() {
        super();
        this.answerInput.setAttributes(cssEditorAttributes.answerInput);
        this.buttonEnter.setTextContent(BUTTON_TEXT);
        this.fillRowsWithNumbers();
        this.rememberElements('cssEditorComponent', {
            cssEditor: this.cssEditor,
            editorRows: this.editorRows,
            answerInput: this.answerInput,
            buttonEnter: this.buttonEnter,
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
