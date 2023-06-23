import { Attributes, ClassesCSS } from '../../../types';
import BaseComponent from '../../../utils/BaseComponent';
import { AppView } from '../appView';

const LOGO_TEXT = 'CSS Selectors';

const CSSClasses: ClassesCSS = {
    header: ['header'],
    navBar: ['navbar', 'bg-body-tertiary'],
    navContainer: ['container'],
    navBarLogo: ['navbar-brand', 'fs-2'],
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
};

export class Header extends AppView {
    private header = new BaseComponent('header', CSSClasses.header);

    private navBar = new BaseComponent('nav', CSSClasses.navBar, this.header);

    private navContainer = new BaseComponent('div', CSSClasses.navContainer, this.navBar);

    private navBarLogo = new BaseComponent('a', CSSClasses.navBarLogo, this.navContainer);

    private navBarToggler = new BaseComponent('button', CSSClasses.navBarToggler, this.navContainer);

    private navBarTogglerIcon = new BaseComponent('span', CSSClasses.navBarTogglerIcon, this.navBarToggler);

    constructor() {
        super();
        this.navBarLogo.setTextContent(LOGO_TEXT);
        this.navBarLogo.setAttributes(headerAttributes.navBarLogo);
        this.navBarToggler.setAttributes(headerAttributes.navBarToggler);
        this.rememberElements('headerComponent', {
            header: this.header,
            navBar: this.navBar,
            navContainer: this.navContainer,
            navBarLogo: this.navBarLogo,
            navBarToggler: this.navBarToggler,
            navBarTogglerIcon: this.navBarTogglerIcon,
        });
    }

    public getComponent(): HTMLElement {
        return this.header.getNode();
    }
}
