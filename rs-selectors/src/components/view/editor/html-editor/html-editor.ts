import { ClassesCSS } from '../../../../types';
import BaseComponent from '../../../../utils/BaseComponent';
import { AppView } from '../../appView';

const ROWS_COUNT = 10;

const CSSClasses: ClassesCSS = {
    htmlEditor: ['html-editor'],
    editorRows: ['editor__rows'],
    preformattedBlock: ['code-block'],
    codeBlock: ['language-html'],
};

export class HtmlEditor extends AppView {
    private htmlEditor = new BaseComponent('div', CSSClasses.htmlEditor);

    private editorRows = new BaseComponent('div', CSSClasses.editorRows, this.htmlEditor);

    private preformattedBlock = new BaseComponent('pre', CSSClasses.preformattedBlock, this.htmlEditor);

    private codeBlock = new BaseComponent('code', CSSClasses.codeBlock, this.preformattedBlock);

    constructor() {
        super();
        this.fillRowsWithNumbers();
        this.rememberElements('htmlEditorComponent', {
            htmlEditor: this.htmlEditor,
            editorRows: this.editorRows,
            preformattedBlock: this.preformattedBlock,
            codeBlock: this.codeBlock,
        });
    }

    public getComponent(): BaseComponent {
        return this.htmlEditor;
    }

    private fillRowsWithNumbers(): void {
        for (let i = 1; i <= ROWS_COUNT; i += 1) {
            const row = new BaseComponent('span', [], this.editorRows);
            row.setTextContent(`${i}`);
        }
    }
}
