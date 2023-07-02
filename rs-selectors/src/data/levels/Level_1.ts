import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';
import { ANIMATED_CLASS } from '../../constants';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const CORRECT_ANSWER = 'plate';

class LevelOne extends Level {
    private firstItemOnDesk = new BaseComponent('apple');

    private secondItemOnDesk = new BaseComponent('plate', [ANIMATED_CLASS]);

    private thirdItemOnDesk = new BaseComponent('apple');

    constructor() {
        super();
        this.levelNumber = 1;
        this.setStatus();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    private createLevelNodesForDesk(): void {
        this.levelNodes.push(
            this.firstItemOnDesk.getNode(),
            this.secondItemOnDesk.getNode(),
            this.thirdItemOnDesk.getNode()
        );
    }

    private createHTMLMarkup(): void {
        const firstItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const secondItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const thirdItemMarkup = new BaseComponent('span', null, this.htmlMarkup);

        firstItemMarkup.insertHTML(hljs.highlight(`<apple />`, hljsLanguage).value);
        secondItemMarkup.insertHTML(hljs.highlight(`\n<plate />`, hljsLanguage).value);
        thirdItemMarkup.insertHTML(hljs.highlight(`\n<apple />`, hljsLanguage).value);

        this.setMutualObservation(
            [this.firstItemOnDesk, firstItemMarkup],
            [this.secondItemOnDesk, secondItemMarkup],
            [this.thirdItemOnDesk, thirdItemMarkup]
        );
    }
}

const firstLevel = new LevelOne();

export const firstLevelData: ILevelData = {
    id: firstLevel.getLevelNumber(),
    levelStatus: firstLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: firstLevel.getNodes(),
    levelMarkup: firstLevel.getMarkup(),
};
