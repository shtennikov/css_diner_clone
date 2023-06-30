import './levelBar.scss';
import { Attributes, ClassesCSS, ILevelData, LevelStatus } from '../../../types';
import BaseComponent from '../../../utils/BaseComponent';
import { View } from '../View';
import { levelData } from '../../../data/LevelData';

const SOLVED_BADGE_TEXT = 'solved';
const NOT_SOLVED_BADGE_TEXT = 'not solved';
const SOLVED_WITH_HINT_BADGE_TEXT = 'solved with hint';
const RESET_BUTTON_TEXT = 'Reset progress';

const CSSClasses: ClassesCSS = {
    levelBar: ['offcanvas', 'offcanvas-end'],
    barHeader: ['offcanvas-header'],
    barBody: ['offcanvas-body'],
    barTitle: ['offcanvas-title'],
    barCloseButton: ['btn-close'],
    levelList: ['list-group'],
    level: ['list-group-item', 'list-group-item-action'],
    badge: ['badge', 'badge-pill'],
    notSolvedBadge: ['badge-secondary', 'text-bg-secondary'],
    solvedBadge: ['badge-success', 'text-bg-success'],
    solvedWithHintBadge: ['badge-primary', 'text-bg-primary'],
    resetBtn: ['btn', 'btn-outline-danger'],
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
    resetBtn: {
        type: 'button',
    },
};

export class LevelBar extends View {
    private levelBar = new BaseComponent('div', CSSClasses.levelBar);

    private barHeader = new BaseComponent('div', CSSClasses.barHeader, this.levelBar);

    private barBody = new BaseComponent('div', CSSClasses.barBody, this.levelBar);

    private barTitle = new BaseComponent('h5', CSSClasses.barTitle, this.barHeader);

    private barCloseButton = new BaseComponent('button', CSSClasses.barCloseButton, this.barHeader);

    private resetProgressBtn = new BaseComponent('button', CSSClasses.resetBtn, this.barBody);

    private levelList = new BaseComponent('div', CSSClasses.levelList, this.barBody);

    private notSolvedBadge = new BaseComponent('span', CSSClasses.badge);

    private solvedBadge = new BaseComponent('span', CSSClasses.badge);

    private solvedWithHintBadge = new BaseComponent('span', CSSClasses.badge);

    constructor() {
        super();
        this.resetProgressBtn.setAttributes(sideBarAttributes.resetBtn);
        this.resetProgressBtn.setTextContent(RESET_BUTTON_TEXT);
        this.levelBar.setAttributes(sideBarAttributes.levelSideBar);
        this.barTitle.setAttributes(sideBarAttributes.barTitle);
        this.barCloseButton.setAttributes(sideBarAttributes.barCloseButton);
        this.createBadges();
        this.fillLevelList(levelData);
        this.rememberElements('levelBarComponent', {
            resetProgressBtn: this.resetProgressBtn,
            levelBar: this.levelBar,
            barHeader: this.barHeader,
            barBody: this.barBody,
            barTitle: this.barTitle,
            barCloseButton: this.barCloseButton,
            levelList: this.levelList,
            notSolvedBadge: this.notSolvedBadge,
            solvedBadge: this.solvedBadge,
            solvedWithHintBadge: this.solvedWithHintBadge,
        });
    }

    public getComponent(): HTMLElement {
        return this.levelBar.getNode();
    }

    private fillLevelList(data: ILevelData[]): void {
        data.forEach((dataItem) => this.createSideBarElement(dataItem));
    }

    private createBadges(): void {
        this.notSolvedBadge.addClass(CSSClasses.notSolvedBadge);
        this.notSolvedBadge.setTextContent(NOT_SOLVED_BADGE_TEXT);
        this.solvedBadge.addClass(CSSClasses.solvedBadge);
        this.solvedBadge.setTextContent(SOLVED_BADGE_TEXT);
        this.solvedWithHintBadge.addClass(CSSClasses.solvedWithHintBadge);
        this.solvedWithHintBadge.setTextContent(SOLVED_WITH_HINT_BADGE_TEXT);
    }

    private setBadges(currentNode: HTMLElement, status: LevelStatus): void {
        switch (status) {
            case LevelStatus.NotSolved:
                currentNode.append(this.notSolvedBadge.getCloneNode());
                break;
            case LevelStatus.Solved:
                currentNode.append(this.solvedBadge.getCloneNode());
                break;
            case LevelStatus.SolvedWithHint:
                currentNode.append(this.solvedWithHintBadge.getCloneNode());
                break;
            default:
                break;
        }
    }

    private createSideBarElement(dataItem: ILevelData): void {
        const level = new BaseComponent('div', CSSClasses.level, this.levelList);
        const levelNode = level.getNode();
        level.setAttributes({ 'data-level': `${dataItem.id}` });
        level.setTextContent(`Level ${dataItem.id}`);
        this.setBadges(levelNode, dataItem.levelStatus);
    }
}
