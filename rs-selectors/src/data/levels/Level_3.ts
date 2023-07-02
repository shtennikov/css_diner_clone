import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import { ILevelData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';
import { Level } from './BaseLevel';
import { ANIMATED_CLASS } from '../../constants';

hljs.registerLanguage('xml', xml);
const hljsLanguage = { language: 'xml' };

const ID_TARGET_ELEMENT = 'rim';
const CORRECT_ANSWER = '#rim';

class LevelThree extends Level {
    private firstItemOnDesk = new BaseComponent('plate');

    private secondItemOnDesk = new BaseComponent('plate', [ANIMATED_CLASS]);

    private thirdItemOnDesk = new BaseComponent('plate');

    private fourthItemOnDesk = new BaseComponent('plate', [ANIMATED_CLASS]);

    constructor() {
        super();
        this.levelNumber = 3;
        this.setStatus();
        this.createHTMLMarkup();
        this.createLevelNodesForDesk();
    }

    private createLevelNodesForDesk(): void {
        this.secondItemOnDesk.addId(ID_TARGET_ELEMENT);
        this.fourthItemOnDesk.addId(ID_TARGET_ELEMENT);

        this.levelNodes.push(
            this.firstItemOnDesk.getNode(),
            this.secondItemOnDesk.getNode(),
            this.thirdItemOnDesk.getNode(),
            this.fourthItemOnDesk.getNode()
        );
    }

    private createHTMLMarkup(): void {
        const firstItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const secondItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const thirdItemMarkup = new BaseComponent('span', null, this.htmlMarkup);
        const fourthItemMarkup = new BaseComponent('span', null, this.htmlMarkup);

        firstItemMarkup.insertHTML(hljs.highlight(`<plate />`, hljsLanguage).value);
        secondItemMarkup.insertHTML(hljs.highlight(`\n<plate id ="rim" />`, hljsLanguage).value);
        thirdItemMarkup.insertHTML(hljs.highlight(`\n<plate />`, hljsLanguage).value);
        fourthItemMarkup.insertHTML(hljs.highlight(`\n<plate id ="rim" />`, hljsLanguage).value);

        this.setMutualObservation(
            [this.firstItemOnDesk, firstItemMarkup],
            [this.secondItemOnDesk, secondItemMarkup],
            [this.thirdItemOnDesk, thirdItemMarkup],
            [this.fourthItemOnDesk, fourthItemMarkup]
        );
    }
}

const thirdLevel = new LevelThree();

export const thirdLevelData: ILevelData = {
    id: thirdLevel.getLevelNumber(),
    levelStatus: thirdLevel.getStatus(),
    correctAnswer: CORRECT_ANSWER,
    levelComponentsOnDesk: thirdLevel.getNodes(),
    levelMarkup: thirdLevel.getMarkup(),
};
