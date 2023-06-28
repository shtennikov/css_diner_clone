import { AppComponents } from '../../data/AppComponents';
import { levelData } from '../../data/LevelData';
import { ILevelData, IObserver } from '../../types';

const CHANGING_CLASS_CSS = 'changing';
const STORAGE_LEVEL_KEY = 'level';

export class LevelController implements IObserver {
    private currentLevel: number = Number(localStorage.getItem(STORAGE_LEVEL_KEY)); // if not, then Number(null) === 0

    private desk = AppComponents.deskComponent.desk.getNode();

    private preCodeBlock = AppComponents.htmlEditorComponent.preformattedBlock.getNode();

    private levelData: ILevelData[] = levelData;

    private totalLevels: number = this.levelData.length - 1;

    public update(): void {
        this.startNextLevel();
    }

    public drawLevel(): void {
        const { levelComponentsOnDesk, levelMarkup } = this.levelData[this.currentLevel];

        this.desk.append(...levelComponentsOnDesk);
        this.preCodeBlock.append(levelMarkup.getNode());
        this.saveCurrentLevel();
    }

    private startNextLevel(): void {
        if (this.currentLevel < this.totalLevels) this.currentLevel += 1;
        else this.currentLevel = 0;
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
}
