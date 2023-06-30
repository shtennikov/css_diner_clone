import { STORAGE_LEVEL_KEY } from '../../constants';
import { AppComponents } from '../../data/AppComponents';
import { levelData } from '../../data/LevelData';
import { ILevelData, IObserver, ISubject } from '../../types';

const CHANGING_CLASS_CSS = 'changing';
const SIDE_BAR_CURRENT_CLASSES_CSS = ['current', 'bg-warning'];

export class LevelController implements IObserver, ISubject {
    // counting starts from 0
    private currentLevel: number = Number(localStorage.getItem(STORAGE_LEVEL_KEY)); // if not, then Number(null) === 0

    private desk = AppComponents.deskComponent.desk.getNode();

    private preCodeBlock = AppComponents.htmlEditorComponent.preformattedBlock.getNode();

    private levelBadge = AppComponents.headerComponent.lvlBadge.getNode();

    private lvlPrevBtn = AppComponents.headerComponent.lvlPrevBtn.getNode();

    private lvlNextBtn = AppComponents.headerComponent.lvlNextBtn.getNode();

    private levelListInSideBarNode = AppComponents.levelBarComponent.levelList.getNode();

    private resetBtn = AppComponents.levelBarComponent.resetProgressBtn.getNode();

    private levelData: ILevelData[] = levelData;

    private totalLevels: number = this.levelData.length - 1;

    private currentLevelNodeInSidebar = this.levelListInSideBarNode.children[this.currentLevel];

    private observers: IObserver[] = [];

    constructor() {
        this.listenLevelSwitching();
    }

    public update(): void {
        this.notify(this.currentLevel);
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

    public subscribe(observer: IObserver): void {
        this.observers.push(observer);
    }

    public unsubscribe(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
        }
    }

    public notify(passedLevel: number): void {
        this.observers.forEach((observer) => observer.update(passedLevel));
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

    private startSelectedLevel(event: MouseEvent): void {
        const targetNode = event.target;
        if (targetNode instanceof HTMLElement) {
            const selectedLevel = Number(targetNode.dataset.level) - 1;
            this.currentLevel = selectedLevel;
            this.highlightCurrentLevelInSideBar(this.currentLevel);
            this.replaceCurrentTableContent();
        }
    }

    private resetLevel(): void {
        this.currentLevel = 0;
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

        newCurrentLevelNode.classList.add(...SIDE_BAR_CURRENT_CLASSES_CSS);
        this.currentLevelNodeInSidebar = newCurrentLevelNode;
    }

    private listenLevelSwitching(): void {
        this.lvlNextBtn.addEventListener('click', this.startNextLevel.bind(this));
        this.lvlPrevBtn.addEventListener('click', this.startPreviousLevel.bind(this));
        this.levelListInSideBarNode.addEventListener('click', this.startSelectedLevel.bind(this));
        this.resetBtn.addEventListener('click', this.resetLevel.bind(this));
    }
}
