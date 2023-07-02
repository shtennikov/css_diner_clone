import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { INDENT } from '../../constants';
import { ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const ANIMATED_CLASS = 'animated';
const CORRECT_ANSWER = 'plate > apple';

class LevelFive extends Level {
    private itemOnDesk_1 = new BaseComponent('plate');

    private itemOnDesk_2 = new BaseComponent('placemat', null, this.itemOnDesk_1);

    private itemOnDesk_3 = new BaseComponent('apple', null, this.itemOnDesk_2);

    private itemOnDesk_4 = new BaseComponent('plate');

    private itemOnDesk_5 = new BaseComponent('apple', [ANIMATED_CLASS], this.itemOnDesk_4);

    constructor() {
        super();
        this.levelNumber = 5;
        this.setStatus();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    private createLevelNodesForDesk(): void {
        this.levelNodes.push(
            this.itemOnDesk_1.getNode(), // includes itemOnDesk_2, itemOnDesk_3
            this.itemOnDesk_4.getNode() // includes itemOnDesk_5
        );
    }

    private createHTMLMarkup(): void {
        const item1Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item2Markup = new BaseComponent('span');
        const item3Markup = new BaseComponent('span');
        const item4Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item5Markup = new BaseComponent('span');

        item1Markup.insertHTML(hljs.highlight(`<plate>`, hljsLanguage).value);
        item2Markup.insertHTML(hljs.highlight(`\n${INDENT}<placemat>`, hljsLanguage).value);
        item1Markup.append(item2Markup);
        item3Markup.insertHTML(hljs.highlight(`\n${INDENT}${INDENT}<apple />`, hljsLanguage).value);
        item2Markup.append(item3Markup);
        item2Markup.insertHTML(hljs.highlight(`\n${INDENT}</placemat>`, hljsLanguage).value);
        item1Markup.insertHTML(hljs.highlight(`\n</plate>`, hljsLanguage).value);

        item4Markup.insertHTML(hljs.highlight(`\n<plate>`, hljsLanguage).value);
        item5Markup.insertHTML(hljs.highlight(`\n${INDENT}<apple />`, hljsLanguage).value);
        item4Markup.append(item5Markup);
        item4Markup.insertHTML(hljs.highlight(`\n</plate>`, hljsLanguage).value);

        this.setMutualObservation(
            [this.itemOnDesk_1, item1Markup],
            [this.itemOnDesk_2, item2Markup],
            [this.itemOnDesk_3, item3Markup],
            [this.itemOnDesk_4, item4Markup],
            [this.itemOnDesk_5, item5Markup]
        );
    }
}

const fifthLevel = new LevelFive();

export const fifthLevelData: ILevelData = {
    id: fifthLevel.getLevelNumber(),
    levelStatus: fifthLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: fifthLevel.getNodes(),
    levelMarkup: fifthLevel.getMarkup(),
};
