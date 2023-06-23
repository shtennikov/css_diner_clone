import { Attributes, ClassesCSS, LevelData } from '../../../types';
import BaseComponent from '../../../utils/BaseComponent';
import { AppView } from '../appView';
import levelData from '../../../data/levels.json';

const CSSClasses: ClassesCSS = {
    levelBar: ['offcanvas', 'offcanvas-end'],
    barHeader: ['offcanvas-header'],
    barBody: ['offcanvas-body'],
    barTitle: ['offcanvas-title'],
    barCloseButton: ['btn-close'],
    levelList: ['list-group'],
    level: ['list-group-item', 'list-group-item-action'],
};

const sideBarAttributes: Attributes = {
    levelSideBar: {
        tabindex: '-1',
        id: 'offcanvasRight',
        'aria-labelledby': 'offcanvasRightLabel',
    },
    barTitle: {
        id: 'offcanvasRightLabel',
    },
    barCloseButton: {
        type: 'button',
        'data-bs-dismiss': 'offcanvas',
        'aria-label': 'Close',
    },
    level: {
        'aria-current': 'true',
    },
};

export class LevelBar extends AppView {
    private levelBar = new BaseComponent('div', CSSClasses.levelBar);

    private barHeader = new BaseComponent('div', CSSClasses.barHeader, this.levelBar);

    private barBody = new BaseComponent('div', CSSClasses.barBody, this.levelBar);

    private barTitle = new BaseComponent('h5', CSSClasses.barTitle, this.barHeader);

    private barCloseButton = new BaseComponent('button', CSSClasses.barCloseButton, this.barHeader);

    private levelList = new BaseComponent('div', CSSClasses.levelList, this.barBody);

    constructor() {
        super();
        this.levelBar.setAttributes(sideBarAttributes.levelSideBar);
        this.barTitle.setAttributes(sideBarAttributes.barTitle);
        this.barCloseButton.setAttributes(sideBarAttributes.barCloseButton);
        this.fillLevelList(levelData);
        this.rememberElements('levelBarComponent', {
            levelBar: this.levelBar,
            barHeader: this.barHeader,
            barBody: this.barBody,
            barTitle: this.barTitle,
            barCloseButton: this.barCloseButton,
            levelList: this.levelList,
        });
    }

    public getComponent(): HTMLElement {
        return this.levelBar.getNode();
    }

    private fillLevelList(data: LevelData[]): void {
        data.forEach((item) => {
            const level = new BaseComponent('div', CSSClasses.level, this.levelList);
            level.setAttributes(sideBarAttributes.level);
            level.setAttributes({ 'data-level': `${item.id}` });
            level.setTextContent(`Level ${item.id}`);
        });
    }
}
