import { AppComponents } from '../../data/AppComponents';
import { levelData } from '../../data/LevelData';
import { ILevelData, IObserver } from '../../types';

const STORAGE_LEVEL_KEY = 'level';
const CHANGING_CLASS_CSS = 'changing';
const SIDE_BAR_CURRENT_CLASSES_CSS = ['current', 'bg-warning'];

export class LevelController implements IObserver {
    // counting starts from 0
    private currentLevel: number = Number(localStorage.getItem(STORAGE_LEVEL_KEY)); // if not, then Number(null) === 0

    private desk = AppComponents.deskComponent.desk.getNode();

    private preCodeBlock = AppComponents.htmlEditorComponent.preformattedBlock.getNode();

    private levelBadge = AppComponents.headerComponent.lvlBadge.getNode();

    private lvlPrevBtn = AppComponents.headerComponent.lvlPrevBtn.getNode();

    private lvlNextBtn = AppComponents.headerComponent.lvlNextBtn.getNode();

    private levelListInSideBarNode = AppComponents.levelBarComponent.levelList.getNode();

    private levelData: ILevelData[] = levelData;

    private totalLevels: number = this.levelData.length - 1;

    private currentLevelNodeInSidebar: Element;

    constructor() {
        this.listenLevelSwitching();
        this.currentLevelNodeInSidebar = this.levelListInSideBarNode.children[this.currentLevel];
    }

    public update(): void {
        this.startNextLevel();
    }

    public drawLevel(): void {
        const { levelComponentsOnDesk, levelMarkup } = this.levelData[this.currentLevel];

        this.desk.append(...levelComponentsOnDesk);
        this.preCodeBlock.append(levelMarkup.getNode());
        this.saveCurrentLevel();
        this.highlightCurrentLevelInSideBar(this.currentLevel);
        this.levelBadge.textContent = `Level: ${this.currentLevel + 1}`;
    }

    private startNextLevel(): void {
        if (this.currentLevel < this.totalLevels) this.currentLevel += 1;
        else this.currentLevel = 0;
        this.saveCurrentLevel();
        this.replaceCurrentTableContent();
    }

    private startPreviousLevel(): void {
        if (this.currentLevel === 0) return;
        this.currentLevel -= 1;
        this.saveCurrentLevel();
        this.replaceCurrentTableContent();
    }

    private replaceCurrentTableContent(): void {
        this.desk.classList.add(CHANGING_CLASS_CSS);
        this.desk.addEventListener('transitionend', () => {
            this.desk.classList.remove(CHANGING_CLASS_CSS);
            this.desk.innerHTML = '';
            this.preCodeBlock.innerHTML = '';
            this.drawLevel();
        });
    }

    private saveCurrentLevel(): void {
        localStorage.setItem(STORAGE_LEVEL_KEY, `${this.currentLevel}`);
    }

    private highlightCurrentLevelInSideBar(newCurrentLevel: number): void {
        this.currentLevelNodeInSidebar.classList.remove(...SIDE_BAR_CURRENT_CLASSES_CSS);
        const newCurrentLevelNode = this.levelListInSideBarNode.children[newCurrentLevel];

        newCurrentLevelNode.classList.add(...SIDE_BAR_CURRENT_CLASSES_CSS)
        this.currentLevelNodeInSidebar = newCurrentLevelNode;
    }

    private listenLevelSwitching(): void {
        this.lvlNextBtn.addEventListener('click', this.startNextLevel.bind(this));
        this.lvlPrevBtn.addEventListener('click', this.startPreviousLevel.bind(this));
    }
}
