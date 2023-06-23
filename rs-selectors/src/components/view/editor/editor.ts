import './editor.scss';
import { ClassesCSS } from '../../../types';
import { CssEditor } from './css-editor/css-editor';
import { HtmlEditor } from './html-editor/html-editor';
import BaseComponent from '../../../utils/BaseComponent';

const CSSClasses: ClassesCSS = {
    editorContainer: ['container'],
    editor: ['editor'],
};

export class Editor {
    private editorContainer = new BaseComponent('div', CSSClasses.editorContainer);

    private editor = new BaseComponent('div', CSSClasses.editor, this.editorContainer);

    private htmlEditor = new HtmlEditor();

    private cssEditor = new CssEditor();

    constructor() {
        const htmlEditorComponent = this.htmlEditor.getComponent();
        const cssEditorComponent = this.cssEditor.getComponent();

        this.editor.appendChildren([cssEditorComponent, htmlEditorComponent]);
    }

    public getComponent(): HTMLElement {
        return this.editorContainer.getNode();
    }
}
