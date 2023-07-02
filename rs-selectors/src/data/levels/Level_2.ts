import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ANIMATED_CLASS, INDENT, SMALL_CLASS } from '../constants';
import { ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const CORRECT_ANSWER = '.small';

class LevelTwo extends Level {
    private firstItemOnDesk = new BaseComponent('orange');

    private secondItemOnDesk = new BaseComponent('plate');

    private thirdItemOnDesk = new BaseComponent('apple', [SMALL_CLASS, ANIMATED_CLASS], this.secondItemOnDesk);

    private fourthItemOnDesk = new BaseComponent('apple', null, this.secondItemOnDesk);

    private fifthItemOnDesk = new BaseComponent('apple', [SMALL_CLASS, ANIMATED_CLASS]);

    constructor() {
        super();
        this.levelNumber = 2;
        this.setStatus();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    private createLevelNodesForDesk(): void {
        this.levelNodes.push(
            this.firstItemOnDesk.getNode(),
            this.secondItemOnDesk.getNode(), // includes thirdItemOnDesk and fourthItemOnDesk
            this.fifthItemOnDesk.getNode()
        );
    }

    private createHTMLMarkup(): void {
        const firstItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const secondItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const thirdItemMarkup = new BaseComponent('span');
        const fourthItemMarkup = new BaseComponent('span');
        const fifthItemMarkup = new BaseComponent('span', null, this.htmlMarkup);

        firstItemMarkup.insertHTML(hljs.highlight(`<orange />`, hljsLanguage).value);
        secondItemMarkup.insertHTML(hljs.highlight(`\n<plate>`, hljsLanguage).value);
        thirdItemMarkup.insertHTML(hljs.highlight(`\n${INDENT}<apple class="small" />`, hljsLanguage).value);
        fourthItemMarkup.insertHTML(hljs.highlight(`\n${INDENT}<apple />`, hljsLanguage).value);

        secondItemMarkup.appendChildren([thirdItemMarkup, fourthItemMarkup]);

        secondItemMarkup.insertHTML(hljs.highlight(`\n</plate>`, hljsLanguage).value);
        fifthItemMarkup.insertHTML(`\n${hljs.highlight(`<apple class="small" />`, hljsLanguage).value}`);

        this.setMutualObservation(
            [this.firstItemOnDesk, firstItemMarkup],
            [this.secondItemOnDesk, secondItemMarkup],
            [this.thirdItemOnDesk, thirdItemMarkup],
            [this.fourthItemOnDesk, fourthItemMarkup],
            [this.fifthItemOnDesk, fifthItemMarkup]
        );
    }
}

const secondLevel = new LevelTwo();

export const secondLevelData: ILevelData = {
    id: secondLevel.getLevelNumber(),
    levelStatus: secondLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: secondLevel.getNodes(),
    levelMarkup: secondLevel.getMarkup(),
};
