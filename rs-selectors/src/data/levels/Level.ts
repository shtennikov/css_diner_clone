import BaseComponent from '../../utils/BaseComponent';

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
            elementOnDesk.addClass('mouseover_desk');
            elementOnDesk.getObserver()?.addClass('mouseover_markup');
        });
        htmlMarkup.getNode().addEventListener('mouseover', (event) => {
            event.stopPropagation();
            htmlMarkup.addClass('mouseover_markup');
            htmlMarkup.getObserver()?.addClass('mouseover_desk');
        });
    }

    protected addMouseOutEventHandler(elementOnDesk: BaseComponent, htmlMarkup: BaseComponent): void {
        elementOnDesk.getNode().addEventListener('mouseout', () => {
            elementOnDesk.removeClass('mouseover_desk');
            elementOnDesk.getObserver()?.removeClass('mouseover_markup');
        });
        htmlMarkup.getNode().addEventListener('mouseout', () => {
            htmlMarkup.removeClass('mouseover_markup');
            htmlMarkup.getObserver()?.removeClass('mouseover_desk');
        });
    }
}
