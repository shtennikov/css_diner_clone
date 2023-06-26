import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { INDENT } from '../../constants';
import { ClassesCSS, ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './Level';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const CSSClasses: ClassesCSS = {
    smallAndAnimated: ['small', 'animated'],
    codeBlock: ['language-html'],
};

const LEVEL_NUMBER = 1;

class LevelOne extends Level {
    private levelNodes: HTMLElement[] = [];

    private htmlMarkup = new BaseComponent('code', CSSClasses.codeBlock);

    private firstItemOnDesk = new BaseComponent('apple');

    private secondItemOnDesk = new BaseComponent('plate');

    private thirdItemOnDesk = new BaseComponent('apple', CSSClasses.smallAndAnimated, this.secondItemOnDesk);

    private fourthItemOnDesk = new BaseComponent('apple', null, this.secondItemOnDesk);

    private fifthItemOnDesk = new BaseComponent('apple', CSSClasses.smallAndAnimated);

    private sixthItemOnDesk = new BaseComponent('apple', CSSClasses.smallAndAnimated);

    constructor() {
        super();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    public getNodes(): HTMLElement[] {
        return this.levelNodes;
    }

    public getMarkup(): BaseComponent {
        return this.htmlMarkup;
    }

    private createLevelNodesForDesk(): void {
        this.levelNodes.push(
            this.firstItemOnDesk.getNode(),
            this.secondItemOnDesk.getNode(), // includes thirdItemOnDesk and fourthItemOnDesk
            this.fifthItemOnDesk.getNode(),
            this.sixthItemOnDesk.getNode()
        );
    }

    private createHTMLMarkup(): void {
        const firstItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const secondItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const thirdItemMarkup = new BaseComponent('span');
        const fourthItemMarkup = new BaseComponent('span');
        const fifthItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const sixthItemMarkup = new BaseComponent('span', null, this.htmlMarkup);

        firstItemMarkup.insertHTML(hljs.highlight(`<apple />`, hljsLanguage).value);
        secondItemMarkup.insertHTML(hljs.highlight(`\n<plate>`, hljsLanguage).value);
        thirdItemMarkup.insertHTML(hljs.highlight(`\n${INDENT}<apple class="small" />`, hljsLanguage).value);
        fourthItemMarkup.insertHTML(hljs.highlight(`\n${INDENT}<apple />`, hljsLanguage).value);

        secondItemMarkup.appendChildren([thirdItemMarkup, fourthItemMarkup]);

        secondItemMarkup.insertHTML(hljs.highlight(`\n</plate>`, hljsLanguage).value);
        fifthItemMarkup.insertHTML(`\n${hljs.highlight(`<apple class="small" />`, hljsLanguage).value}`);
        sixthItemMarkup.insertHTML(hljs.highlight(`\n<apple class="small" />`, hljsLanguage).value);

        this.setMutualObservation(
            [this.firstItemOnDesk, firstItemMarkup],
            [this.secondItemOnDesk, secondItemMarkup],
            [this.thirdItemOnDesk, thirdItemMarkup],
            [this.fourthItemOnDesk, fourthItemMarkup],
            [this.fifthItemOnDesk, fifthItemMarkup],
            [this.sixthItemOnDesk, sixthItemMarkup]
        );
    }
}

const firstLevel = new LevelOne();

export const firstLevelData: ILevelData = {
    id: LEVEL_NUMBER,
    levelComponentsOnDesk: firstLevel.getNodes(),
    levelMarkup: firstLevel.getMarkup(),
};
