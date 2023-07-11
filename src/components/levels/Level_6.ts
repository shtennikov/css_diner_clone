import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ANIMATED_CLASS, INDENT, SMALL_CLASS } from '../../data/constants';
import { ILevelData } from '../../types/types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const CORRECT_ANSWER = '.small:last-child';

class LevelSix extends Level {
    private itemOnDesk_1 = new BaseComponent('plate');

    private itemOnDesk_2 = new BaseComponent('apple', [SMALL_CLASS, ANIMATED_CLASS], this.itemOnDesk_1);

    private itemOnDesk_3 = new BaseComponent('plate');

    private itemOnDesk_4 = new BaseComponent('orange', [SMALL_CLASS]);

    private itemOnDesk_5 = new BaseComponent('orange', [SMALL_CLASS, ANIMATED_CLASS]);

    constructor() {
        super();
        this.levelNumber = 6;
        this.setStatus();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    private createLevelNodesForDesk(): void {
        this.levelNodes.push(
            this.itemOnDesk_1.getNode(), // includes itemOnDesk_2
            this.itemOnDesk_3.getNode(),
            this.itemOnDesk_4.getNode(),
            this.itemOnDesk_5.getNode()
        );
    }

    private createHTMLMarkup(): void {
        const item1Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item2Markup = new BaseComponent('span');
        const item3Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item4Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item5Markup = new BaseComponent('span', null, this.htmlMarkup);

        item1Markup.insertHTML(hljs.highlight(`<plate>`, hljsLanguage).value);
        item2Markup.insertHTML(hljs.highlight(`\n${INDENT}<apple class="small">`, hljsLanguage).value);
        item1Markup.append(item2Markup);
        item1Markup.insertHTML(hljs.highlight(`\n</plate>`, hljsLanguage).value);

        item3Markup.insertHTML(hljs.highlight(`\n<plate>`, hljsLanguage).value);
        item4Markup.insertHTML(hljs.highlight(`\n<orange class="small">`, hljsLanguage).value);
        item5Markup.insertHTML(hljs.highlight(`\n<orange class="small">`, hljsLanguage).value);

        this.setMutualObservation(
            [this.itemOnDesk_1, item1Markup],
            [this.itemOnDesk_2, item2Markup],
            [this.itemOnDesk_3, item3Markup],
            [this.itemOnDesk_4, item4Markup],
            [this.itemOnDesk_5, item5Markup]
        );
    }
}

const sixthLevel = new LevelSix();

export const sixthLevelData: ILevelData = {
    id: sixthLevel.getLevelNumber(),
    levelStatus: sixthLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: sixthLevel.getNodes(),
    levelMarkup: sixthLevel.getMarkup(),
};
