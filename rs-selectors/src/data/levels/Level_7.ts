import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ANIMATED_CLASS, INDENT } from '../constants';
import { ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const CORRECT_ANSWER = 'placemat:empty';

class LevelSeven extends Level {
    private itemOnDesk_1 = new BaseComponent('placemat', [ANIMATED_CLASS]);

    private itemOnDesk_2 = new BaseComponent('placemat');

    private itemOnDesk_3 = new BaseComponent('apple', null, this.itemOnDesk_2);

    private itemOnDesk_4 = new BaseComponent('placemat', [ANIMATED_CLASS]);

    constructor() {
        super();
        this.levelNumber = 7;
        this.setStatus();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    private createLevelNodesForDesk(): void {
        this.levelNodes.push(
            this.itemOnDesk_1.getNode(), // includes itemOnDesk_3
            this.itemOnDesk_2.getNode(),
            this.itemOnDesk_4.getNode()
        );
    }

    private createHTMLMarkup(): void {
        const item1Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item2Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item3Markup = new BaseComponent('span');
        const item4Markup = new BaseComponent('span', null, this.htmlMarkup);

        item1Markup.insertHTML(hljs.highlight(`<placemat />`, hljsLanguage).value);

        item2Markup.insertHTML(hljs.highlight(`\n<placemat>`, hljsLanguage).value);
        item3Markup.insertHTML(hljs.highlight(`\n${INDENT}<apple />`, hljsLanguage).value);
        item2Markup.append(item3Markup);
        item2Markup.insertHTML(hljs.highlight(`\n</placemat>`, hljsLanguage).value);

        item4Markup.insertHTML(hljs.highlight(`\n<placemat />`, hljsLanguage).value);

        this.setMutualObservation(
            [this.itemOnDesk_1, item1Markup],
            [this.itemOnDesk_2, item2Markup],
            [this.itemOnDesk_3, item3Markup],
            [this.itemOnDesk_4, item4Markup]
        );
    }
}

const seventhLevel = new LevelSeven();

export const seventhLevelData: ILevelData = {
    id: seventhLevel.getLevelNumber(),
    levelStatus: seventhLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: seventhLevel.getNodes(),
    levelMarkup: seventhLevel.getMarkup(),
};
