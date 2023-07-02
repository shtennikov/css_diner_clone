import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ANIMATED_CLASS, SMALL_CLASS } from '../../constants';
import { ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const CORRECT_ANSWER = 'apple:nth-of-type(2n+2)';

class LevelNine extends Level {
    private itemOnDesk_1 = new BaseComponent('apple', [SMALL_CLASS]);

    private itemOnDesk_2 = new BaseComponent('orange');

    private itemOnDesk_3 = new BaseComponent('apple', [ANIMATED_CLASS]);

    private itemOnDesk_4 = new BaseComponent('apple');

    private itemOnDesk_5 = new BaseComponent('apple', [ANIMATED_CLASS, SMALL_CLASS]);

    constructor() {
        super();
        this.levelNumber = 9;
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
            this.itemOnDesk_5.getNode()
        );
    }

    private createHTMLMarkup(): void {
        const item1Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item2Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item3Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item4Markup = new BaseComponent('span', null, this.htmlMarkup);
        const item5Markup = new BaseComponent('span', null, this.htmlMarkup);

        item1Markup.insertHTML(hljs.highlight(`<apple class="small" />`, hljsLanguage).value);
        item2Markup.insertHTML(hljs.highlight(`\n<orange />`, hljsLanguage).value);
        item3Markup.insertHTML(hljs.highlight(`\n<apple />`, hljsLanguage).value);
        item4Markup.insertHTML(hljs.highlight(`\n<apple />`, hljsLanguage).value);
        item5Markup.insertHTML(hljs.highlight(`\n<apple class="small" />`, hljsLanguage).value);

        this.setMutualObservation(
            [this.itemOnDesk_1, item1Markup],
            [this.itemOnDesk_2, item2Markup],
            [this.itemOnDesk_3, item3Markup],
            [this.itemOnDesk_4, item4Markup],
            [this.itemOnDesk_5, item5Markup]
        );
    }
}

const ninthLevel = new LevelNine();

export const ninthLevelData: ILevelData = {
    id: ninthLevel.getLevelNumber(),
    levelStatus: ninthLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: ninthLevel.getNodes(),
    levelMarkup: ninthLevel.getMarkup(),
};
