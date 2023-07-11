import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { STORAGE_PROGRESS_KEY, XML_LANGUAGE_HLJS } from '../../data/constants';
import { ClassesCSS, LevelStatus, ProgressData } from '../../types/types';
import BaseComponent from '../../utils/BaseComponent';

hljs.registerLanguage('xml', xml);

const MOUSEOVER_MARKUP_CSS_CLASS = 'mouseover_markup';
const MOUSEOVER_DESK_CSS_CLASS = 'mouseover_desk';

const CSSClasses: ClassesCSS = {
    codeBlock: ['language-html'],
    tooltip: ['tooltip_tag'],
};

export abstract class Level {
    protected levelNumber = 0;

    protected status: LevelStatus = LevelStatus.NotSolved;

    protected levelNodes: HTMLElement[] = [];

    protected htmlMarkup = new BaseComponent('code', CSSClasses.codeBlock);

    protected tooltip = new BaseComponent('div', CSSClasses.tooltip);

    public getLevelNumber(): number {
        return this.levelNumber;
    }

    public getNodes(): HTMLElement[] {
        return this.levelNodes;
    }

    public getMarkup(): BaseComponent {
        return this.htmlMarkup;
    }

    public getStatus(): LevelStatus {
        return this.status;
    }

    protected setStatus(): void {
        const progressDataInStorage = localStorage.getItem(STORAGE_PROGRESS_KEY);
        if (progressDataInStorage) {
            const progressDataObject: ProgressData = JSON.parse(progressDataInStorage);
            const currentLevelStatus = progressDataObject[this.levelNumber - 1];
            this.status = currentLevelStatus || LevelStatus.NotSolved;
        }
    }

    protected setMutualObservation(...args: [BaseComponent, BaseComponent][]): void {
        args.forEach(([elementOnDesk, htmlMarkup]) => {
            elementOnDesk.setObserver(htmlMarkup);
            htmlMarkup.setObserver(elementOnDesk);

            this.addMouseOverEventHandler(elementOnDesk, htmlMarkup);
            this.addMouseOutEventHandler(elementOnDesk, htmlMarkup);
        });
    }

    protected showTooltip(elementOnDesk: BaseComponent, htmlMarkup: BaseComponent): void {
        const rect = elementOnDesk.getNode().getBoundingClientRect();
        const x = rect.left;
        const y = rect.top;
        const tagCurrentElement = htmlMarkup.getNode().children[0].textContent?.trim();

        this.tooltip.insertHTML(hljs.highlight(`${tagCurrentElement}`, XML_LANGUAGE_HLJS).value);

        document.body.append(this.tooltip.getNode());
        this.tooltip.getNode().style.left = `${x}px`;
        this.tooltip.getNode().style.top = `${y - 50}px`;

        const tooltipWidth = this.tooltip.getNode().offsetWidth;
        const windowWidth = window.innerWidth;
        const availableSpaceRight = windowWidth - x;

        // If there is not enough space for the tooltip on the right, change its position
        if (tooltipWidth > availableSpaceRight) {
            const leftOffset = x - tooltipWidth / 2;
            this.tooltip.getNode().style.left = `${leftOffset}px`;
        }
    }

    protected hideTooltip(): void {
        this.tooltip.getNode().innerHTML = '';
        this.tooltip.destroy();
    }

    protected addMouseOverEventHandler(elementOnDesk: BaseComponent, htmlMarkup: BaseComponent): void {
        elementOnDesk.getNode().addEventListener('mouseover', (event) => {
            event.stopPropagation();
            this.showTooltip(elementOnDesk, htmlMarkup);
            elementOnDesk.addClass(MOUSEOVER_DESK_CSS_CLASS);
            elementOnDesk.getObserver()?.addClass(MOUSEOVER_MARKUP_CSS_CLASS);
        });
        htmlMarkup.getNode().addEventListener('mouseover', (event) => {
            event.stopPropagation();
            this.showTooltip(elementOnDesk, htmlMarkup);
            htmlMarkup.addClass(MOUSEOVER_MARKUP_CSS_CLASS);
            htmlMarkup.getObserver()?.addClass(MOUSEOVER_DESK_CSS_CLASS);
        });
    }

    protected addMouseOutEventHandler(elementOnDesk: BaseComponent, htmlMarkup: BaseComponent): void {
        elementOnDesk.getNode().addEventListener('mouseout', () => {
            this.hideTooltip();
            elementOnDesk.removeClass(MOUSEOVER_DESK_CSS_CLASS);
            elementOnDesk.getObserver()?.removeClass(MOUSEOVER_MARKUP_CSS_CLASS);
        });
        htmlMarkup.getNode().addEventListener('mouseout', () => {
            this.hideTooltip();
            htmlMarkup.removeClass(MOUSEOVER_MARKUP_CSS_CLASS);
            htmlMarkup.getObserver()?.removeClass(MOUSEOVER_DESK_CSS_CLASS);
        });
    }
}
