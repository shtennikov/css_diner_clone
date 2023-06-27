import BaseComponent from '../../utils/BaseComponent';

const MOUSEOVER_MARKUP_CSS_CLASS = 'mouseover_markup';
const MOUSEOVER_DESK_CSS_CLASS = 'mouseover_desk';

export class Level {
    protected setMutualObservation(...args: [BaseComponent, BaseComponent][]): void {
        args.forEach(([elementOnDesk, htmlMarkup]) => {
            elementOnDesk.setObserver(htmlMarkup);
            htmlMarkup.setObserver(elementOnDesk);

            this.addMouseOverEventHandler(elementOnDesk, htmlMarkup);
            this.addMouseOutEventHandler(elementOnDesk, htmlMarkup);
        });
    }

    protected addMouseOverEventHandler(elementOnDesk: BaseComponent, htmlMarkup: BaseComponent): void {
        elementOnDesk.getNode().addEventListener('mouseover', (event) => {
            event.stopPropagation();
            elementOnDesk.addClass(MOUSEOVER_DESK_CSS_CLASS);
            elementOnDesk.getObserver()?.addClass(MOUSEOVER_MARKUP_CSS_CLASS);
        });
        htmlMarkup.getNode().addEventListener('mouseover', (event) => {
            event.stopPropagation();
            htmlMarkup.addClass(MOUSEOVER_MARKUP_CSS_CLASS);
            htmlMarkup.getObserver()?.addClass(MOUSEOVER_DESK_CSS_CLASS);
        });
    }

    protected addMouseOutEventHandler(elementOnDesk: BaseComponent, htmlMarkup: BaseComponent): void {
        elementOnDesk.getNode().addEventListener('mouseout', () => {
            elementOnDesk.removeClass(MOUSEOVER_DESK_CSS_CLASS);
            elementOnDesk.getObserver()?.removeClass(MOUSEOVER_MARKUP_CSS_CLASS);
        });
        htmlMarkup.getNode().addEventListener('mouseout', () => {
            htmlMarkup.removeClass(MOUSEOVER_MARKUP_CSS_CLASS);
            htmlMarkup.getObserver()?.removeClass(MOUSEOVER_DESK_CSS_CLASS);
        });
    }
}
