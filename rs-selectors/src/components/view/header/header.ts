import './header.scss';
import { Attributes, ClassesCSS } from '../../../types';
import BaseComponent from '../../../utils/BaseComponent';
import { View } from '../View';

const LOGO_TEXT = 'CSS Selectors';
const PREV_BTN_TEXT = 'Prev';
const NEXT_BTN_TEXT = 'Next';
const BADGE_DEFAULT_TEXT = 'Level: 1';

const CSSClasses: ClassesCSS = {
    header: ['header'],
    navBar: ['navbar', 'bg-body-tertiary'],
    navContainer: ['container'],
    navBarLogo: ['navbar-brand', 'fs-2'],
    navBarRightSide: ['navbar-ritght-side'],
    lvlSelection: ['level_selection'],
    lvlBadge: ['badge', 'rounded-pill', 'text-bg-warning'],
    lvlBtn: ['btn', 'btn-outline-secondary'],
    navBarToggler: ['navbar-toggler'],
    navBarTogglerIcon: ['navbar-toggler-icon'],
};

const headerAttributes: Attributes = {
    navBarLogo: {
        href: '#',
    },

    navBarToggler: {
        type: 'button',
        'data-bs-toggle': 'offcanvas',
        'data-bs-target': '#offcanvasRight',
        'aria-controls': 'offcanvasRight',
    },

    lvlBtn: {
        type: 'button',
    },
};

export class Header extends View {
    private header = new BaseComponent('header', CSSClasses.header);

    private navBar = new BaseComponent('nav', CSSClasses.navBar, this.header);

    private navContainer = new BaseComponent('div', CSSClasses.navContainer, this.navBar);

    private navBarLogo = new BaseComponent('a', CSSClasses.navBarLogo, this.navContainer);

    private navBarRightSide = new BaseComponent('div', CSSClasses.navBarRightSide, this.navContainer);

    private lvlSelectionContainer = new BaseComponent('div', CSSClasses.lvlSelection, this.navBarRightSide);

    private lvlBadge = new BaseComponent('span', CSSClasses.lvlBadge, this.lvlSelectionContainer);

    private lvlPrevBtn = new BaseComponent('span', CSSClasses.lvlBtn, this.lvlSelectionContainer);

    private lvlNextBtn = new BaseComponent('span', CSSClasses.lvlBtn, this.lvlSelectionContainer);

    private navBarToggler = new BaseComponent('button', CSSClasses.navBarToggler, this.navBarRightSide);

    private navBarTogglerIcon = new BaseComponent('span', CSSClasses.navBarTogglerIcon, this.navBarToggler);

    constructor() {
        super();
        this.navBarLogo.setTextContent(LOGO_TEXT);
        this.lvlPrevBtn.setTextContent(PREV_BTN_TEXT);
        this.lvlNextBtn.setTextContent(NEXT_BTN_TEXT);
        this.lvlBadge.setTextContent(BADGE_DEFAULT_TEXT);
        this.navBarLogo.setAttributes(headerAttributes.navBarLogo);
        this.navBarToggler.setAttributes(headerAttributes.navBarToggler);
        this.lvlPrevBtn.setAttributes(headerAttributes.lvlBtn);
        this.lvlNextBtn.setAttributes(headerAttributes.lvlBtn);
        this.rememberElements('headerComponent', {
            header: this.header,
            navBar: this.navBar,
            navContainer: this.navContainer,
            navBarLogo: this.navBarLogo,
            navBarToggler: this.navBarToggler,
            navBarTogglerIcon: this.navBarTogglerIcon,
            navBarRightSide: this.navBarRightSide,
            lvlSelectionContainer: this.lvlSelectionContainer,
            lvlBadge: this.lvlBadge,
            lvlPrevBtn: this.lvlPrevBtn,
            lvlNextBtn: this.lvlNextBtn,
        });
    }

    public getComponent(): HTMLElement {
        return this.header.getNode();
    }
}
