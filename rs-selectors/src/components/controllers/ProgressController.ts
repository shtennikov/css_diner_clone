import { STORAGE_LEVEL_KEY, STORAGE_PASSED_LEVELS_KEY, STORAGE_PROGRESS_KEY } from '../../data/constants';
import { AppComponents } from '../../data/AppComponents';
import { levelData } from '../../data/LevelData';
import { ILevelData, LevelStatus, ProgressData } from '../../types/types';
import BaseComponent from '../../utils/BaseComponent';

const BADGE_CLASS_CSS = 'badge';

export class ProgressController {
    private progressData: ProgressData;

    private levelData: ILevelData[] = levelData;

    private helpBtn = AppComponents.headerComponent.helpBtn.getNode();

    private levelListInSideBarNode = AppComponents.levelBarComponent.levelList.getNode();

    private resetBtn = AppComponents.levelBarComponent.resetProgressBtn.getNode();

    private notSolvedBadge: BaseComponent = AppComponents.levelBarComponent.notSolvedBadge;

    private solvedBadge: BaseComponent = AppComponents.levelBarComponent.solvedBadge;

    private solvedWithHintBadge: BaseComponent = AppComponents.levelBarComponent.solvedWithHintBadge;

    private passedLevels: number = Number(localStorage.getItem(STORAGE_PASSED_LEVELS_KEY));

    constructor() {
        const progressDataInStorage = localStorage.getItem(STORAGE_PROGRESS_KEY);
        this.progressData = progressDataInStorage ? JSON.parse(progressDataInStorage) : {};
        if (!progressDataInStorage) this.setUpStartingData();
    }

    public start(): void {
        this.helpBtn.addEventListener('click', this.updateWithHintLevelData.bind(this));
        this.resetBtn.addEventListener('click', this.resetProgress.bind(this));
    }

    public updateProgress(passedLevel: number): void {
        switch (this.progressData[passedLevel]) {
            case LevelStatus.Solved:
                return;
            case LevelStatus.NotSolved:
                this.updateSolvedLevelData(passedLevel);
                this.drawNewBadge(passedLevel, this.solvedBadge);
                break;
            case LevelStatus.SolvedWithHint:
                this.drawNewBadge(passedLevel, this.solvedWithHintBadge);
                break;
            default:
                break;
        }
        this.passedLevels += 1;
        this.saveProgressData();
    }

    public getPassedLevels(): number {
        return this.passedLevels;
    }

    private drawNewBadge(levelNumber: number, newBadge: BaseComponent): void {
        const passedLevelSideBarNode = this.levelListInSideBarNode.children[levelNumber];
        const badge = passedLevelSideBarNode.lastElementChild;
        if (badge && badge.classList.contains(BADGE_CLASS_CSS)) {
            badge.remove();
            passedLevelSideBarNode.append(newBadge.getCloneNode());
        }
    }

    private setUpStartingData(): void {
        this.levelData.forEach((level, index) => {
            this.progressData[index] = level.levelStatus;
        });
        this.saveProgressData();
    }

    private saveProgressData(): void {
        localStorage.setItem(STORAGE_PASSED_LEVELS_KEY, this.passedLevels.toString());
        localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(this.progressData));
    }

    private resetProgress(): void {
        this.levelData.forEach((level, index) => {
            // eslint-disable-next-line no-param-reassign
            level.levelStatus = LevelStatus.NotSolved;
            this.progressData[index] = LevelStatus.NotSolved;
            this.drawNewBadge(index, this.notSolvedBadge);
        });
        this.passedLevels = 0;
        this.saveProgressData();
    }

    private updateSolvedLevelData(passedLevel: number): void {
        this.progressData[passedLevel] = LevelStatus.Solved;
        this.levelData[passedLevel].levelStatus = LevelStatus.Solved;
        this.saveProgressData();
    }

    private updateWithHintLevelData(): void {
        const currentLevel = Number(localStorage.getItem(STORAGE_LEVEL_KEY));
        if (this.progressData[currentLevel] === LevelStatus.Solved) return;
        this.progressData[currentLevel] = LevelStatus.SolvedWithHint;
        this.levelData[currentLevel].levelStatus = LevelStatus.SolvedWithHint;
        this.saveProgressData();
    }
}
