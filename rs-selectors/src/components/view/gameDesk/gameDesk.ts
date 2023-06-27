import './gameDesk.scss';
import { View } from '../View';
import { ClassesCSS } from '../../../types';
import BaseComponent from '../../../utils/BaseComponent';

const CSSClasses: ClassesCSS = {
    deskContainer: ['container', 'game'],
    desk: ['desk'],
};

export class GameDesk extends View {
    private deskContainer = new BaseComponent('div', CSSClasses.deskContainer);

    private desk = new BaseComponent('div', CSSClasses.desk, this.deskContainer);

    constructor() {
        super();
        this.rememberElements('deskComponent', {
            deskContainer: this.deskContainer,
            desk: this.desk,
        });
    }

    public getComponent(): HTMLElement {
        return this.deskContainer.getNode();
    }
}
