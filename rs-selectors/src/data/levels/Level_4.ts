import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ANIMATED_CLASS, INDENT, SMALL_CLASS } from '../../constants';
import { ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const CORRECT_ANSWER = 'placemat apple.small';

class LevelFour extends Level {
    private itemOnDesk_1 = new BaseComponent('apple', [SMALL_CLASS]);

    private itemOnDesk_2 = new BaseComponent('placemat');

    private itemOnDesk_3 = new BaseComponent('apple', [SMALL_CLASS, ANIMATED_CLASS], this.itemOnDesk_2);

    private itemOnDesk_4 = new BaseComponent('placemat');

    private itemOnDesk_5 = new BaseComponent('apple', [SMALL_CLASS, ANIMATED_CLASS], this.itemOnDesk_4);

    private itemOnDesk_6 = new BaseComponent('placemat');

    private itemOnDesk_7 = new BaseComponent('orange', [SMALL_CLASS], this.itemOnDesk_6);

    constructor() {
        super();
        this.levelNumber = 4;
        this.setStatus();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    private createLevelNodesForDesk(): void {
        this.levelNodes.push(
            this.itemOnDesk_1.getNode(),
            this.itemOnDesk_2.getNode(), // includes itemOnDesk_3
            this.itemOnDesk_4.getNode(), // includes itemOnDesk_5
            this.itemOnDesk_6.getNode() // includes itemOnDesk_7
        );
    }

    private createHTMLMarkup(): void {
        const item1Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item2Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item3Markup = new BaseComponent('span');
        const item4Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item5Markup = new BaseComponent('span');
        const item6Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item7Markup = new BaseComponent('span');

        item1Markup.insertHTML(hljs.highlight(`<apple class="small" />`, hljsLanguage).value);

        item2Markup.insertHTML(hljs.highlight(`\n<placemat>`, hljsLanguage).value);
        item3Markup.insertHTML(hljs.highlight(`\n${INDENT}<apple class="small" />`, hljsLanguage).value);
        item2Markup.append(item3Markup);
        item2Markup.insertHTML(hljs.highlight(`\n</placemat>`, hljsLanguage).value);

        item4Markup.insertHTML(hljs.highlight(`\n<placemat>`, hljsLanguage).value);
        item5Markup.insertHTML(hljs.highlight(`\n${INDENT}<apple class="small" />`, hljsLanguage).value);
        item4Markup.append(item5Markup);
        item4Markup.insertHTML(hljs.highlight(`\n</placemat>`, hljsLanguage).value);

        item6Markup.insertHTML(hljs.highlight(`\n<placemat>`, hljsLanguage).value);
        item7Markup.insertHTML(hljs.highlight(`\n${INDENT}<apple class="small" />`, hljsLanguage).value);
        item6Markup.append(item7Markup);
        item6Markup.insertHTML(hljs.highlight(`\n</placemat>`, hljsLanguage).value);

        this.setMutualObservation(
            [this.itemOnDesk_1, item1Markup],
            [this.itemOnDesk_2, item2Markup],
            [this.itemOnDesk_3, item3Markup],
            [this.itemOnDesk_4, item4Markup],
            [this.itemOnDesk_5, item5Markup],
            [this.itemOnDesk_6, item6Markup],
            [this.itemOnDesk_7, item7Markup]
        );
    }
}

const fourthLevel = new LevelFour();

export const fourthLevelData: ILevelData = {
    id: fourthLevel.getLevelNumber(),
    levelStatus: fourthLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: fourthLevel.getNodes(),
    levelMarkup: fourthLevel.getMarkup(),
};
