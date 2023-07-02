import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ANIMATED_CLASS, SMALL_CLASS } from '../../constants';
import { ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const CORRECT_ANSWER = 'plate ~ orange:not(:last-child)';

class LevelTen extends Level {
    private itemOnDesk_1 = new BaseComponent('plate');

    private itemOnDesk_2 = new BaseComponent('orange', [ANIMATED_CLASS, SMALL_CLASS]);

    private itemOnDesk_3 = new BaseComponent('orange', [ANIMATED_CLASS]);

    private itemOnDesk_4 = new BaseComponent('apple', [SMALL_CLASS]);

    private itemOnDesk_5 = new BaseComponent('plate');

    private itemOnDesk_6 = new BaseComponent('orange', [ANIMATED_CLASS, SMALL_CLASS]);

    private itemOnDesk_7 = new BaseComponent('orange', [SMALL_CLASS]);

    constructor() {
        super();
        this.levelNumber = 10;
        this.setStatus();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    private createLevelNodesForDesk(): void {
        this.levelNodes.push(
            this.itemOnDesk_1.getNode(),
            this.itemOnDesk_2.getNode(),
            this.itemOnDesk_3.getNode(),
            this.itemOnDesk_4.getNode(),
            this.itemOnDesk_5.getNode(),
            this.itemOnDesk_6.getNode(),
            this.itemOnDesk_7.getNode()
        );
    }

    private createHTMLMarkup(): void {
        const item1Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item2Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item3Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item4Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item5Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item6Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item7Markup = new BaseComponent('span', null, this.htmlMarkup);

        item1Markup.insertHTML(hljs.highlight(`<plate />`, hljsLanguage).value);
        item2Markup.insertHTML(hljs.highlight(`\n<orange class="small" />`, hljsLanguage).value);
        item3Markup.insertHTML(hljs.highlight(`\n<orange />`, hljsLanguage).value);
        item4Markup.insertHTML(hljs.highlight(`\n<apple class="small" />`, hljsLanguage).value);
        item5Markup.insertHTML(hljs.highlight(`\n<plate />`, hljsLanguage).value);
        item6Markup.insertHTML(hljs.highlight(`\n<orange class="small" />`, hljsLanguage).value);
        item7Markup.insertHTML(hljs.highlight(`\n<orange class="small" />`, hljsLanguage).value);

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

const tenthLevel = new LevelTen();

export const tenthLevelData: ILevelData = {
    id: tenthLevel.getLevelNumber(),
    levelStatus: tenthLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: tenthLevel.getNodes(),
    levelMarkup: tenthLevel.getMarkup(),
};
