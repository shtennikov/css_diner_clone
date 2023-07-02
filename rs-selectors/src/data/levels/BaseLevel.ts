import { STORAGE_PROGRESS_KEY } from '../constants';
import { ClassesCSS, LevelStatus, ProgressData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';

const MOUSEOVER_MARKUP_CSS_CLASS = 'mouseover_markup';
const MOUSEOVER_DESK_CSS_CLASS = 'mouseover_desk';

const CSSClasses: ClassesCSS = {
    codeBlock: ['language-html'],
};

export abstract class Level {
    protected levelNumber = 0;

    protected status: LevelStatus = LevelStatus.NotSolved;

    protected levelNodes: HTMLElement[] = [];

    protected htmlMarkup = new BaseComponent('code', CSSClasses.codeBlock);

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
