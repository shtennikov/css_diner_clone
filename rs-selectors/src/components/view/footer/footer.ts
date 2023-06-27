import { Attributes, ClassesCSS } from '../../../types';
import BaseComponent from '../../../utils/BaseComponent';
import { View } from '../View';

const YEAR_FOUNDATION = '2023';
const GITHUB_LINK_TEXT = 'GitHub';
const LINK_TO_GITHUB = 'https://github.com/shtennikov';
const LINK_TO_RSS = 'https://rs.school/js/';
const LINK_TO_RSS_IMAGE = 'https://rs.school/images/rs_school_js.svg';
const RSS_IMAGE_ALT_TEXT = 'RS School';

const CSSClasses: ClassesCSS = {
    footer: ['footer', 'bg-body-tertiary'],
    footerContainer: ['container', 'text-center'],
    layoutContainer: ['row', 'align-items-center'],
    layoutColumn: ['col'],
    contentWrapper: [],
    gitHubLink: [
        'link-secondary',
        'link-offset-2',
        'link-underline-opacity-25',
        'link-underline-opacity-100-hover',
        'fs-5',
    ],
    yearFoundation: ['text-secondary'],
    rsSchoolLink: [],
    rsSchoolImage: ['rs_image', 'float-center'],
};

const footerAttributes: Attributes = {
    gitHubLink: {
        href: LINK_TO_GITHUB,
        target: '_blank',
    },

    rsSchoolLink: {
        href: LINK_TO_RSS,
        target: '_blank',
    },
    rsSchoolImage: {
        src: LINK_TO_RSS_IMAGE,
        alt: RSS_IMAGE_ALT_TEXT,
    },
};

export class Footer extends View {
    private footer = new BaseComponent('footer', CSSClasses.footer);

    private footerContainer = new BaseComponent('div', CSSClasses.footerContainer, this.footer);

    private layoutContainer = new BaseComponent('div', CSSClasses.layoutContainer, this.footerContainer);

    private layoutColumnLeft = new BaseComponent('div', CSSClasses.layoutColumn, this.layoutContainer);

    private layoutColumnCenter = new BaseComponent('div', CSSClasses.layoutColumn, this.layoutContainer);

    private layoutColumnRight = new BaseComponent('div', CSSClasses.layoutColumn, this.layoutContainer);

    private contentWrapperLeft = new BaseComponent('p', CSSClasses.contentWrapper, this.layoutColumnLeft);

    private contentWrapperRight = new BaseComponent('p', CSSClasses.contentWrapper, this.layoutColumnRight);

    private gitHubLink = new BaseComponent('a', CSSClasses.gitHubLink, this.contentWrapperLeft);

    private yearFoundation = new BaseComponent('p', CSSClasses.yearFoundation, this.layoutColumnCenter);

    private rsSchoolLink = new BaseComponent('a', CSSClasses.rsSchoolLink, this.contentWrapperRight);

    private rsSchoolImage = new BaseComponent('img', CSSClasses.rsSchoolImage, this.rsSchoolLink);

    constructor() {
        super();
        this.gitHubLink.setAttributes(footerAttributes.gitHubLink);
        this.rsSchoolLink.setAttributes(footerAttributes.rsSchoolLink);
        this.rsSchoolImage.setAttributes(footerAttributes.rsSchoolImage);
        this.gitHubLink.setTextContent(GITHUB_LINK_TEXT);
        this.yearFoundation.setTextContent(YEAR_FOUNDATION);
        this.rememberElements('footerComponent', {
            footer: this.footer,
            footerContainer: this.footerContainer,
            layoutContainer: this.layoutContainer,
            layoutColumnLeft: this.layoutColumnLeft,
            layoutColumnCenter: this.layoutColumnCenter,
            layoutColumnRight: this.layoutColumnRight,
            contentWrapperLeft: this.contentWrapperLeft,
            contentWrapperRight: this.contentWrapperRight,
            gitHubLink: this.gitHubLink,
            yearFoundation: this.yearFoundation,
            rsSchoolLink: this.rsSchoolLink,
            rsSchoolImage: this.rsSchoolImage,
        });
    }

    public getComponent(): HTMLElement {
        return this.footer.getNode();
    }
}
