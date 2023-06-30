import { STORAGE_LEVEL_KEY, STORAGE_PROGRESS_KEY } from '../../constants';
import { AppComponents } from '../../data/AppComponents';
import { levelData } from '../../data/LevelData';
import { ClassesCSS, ILevelData, IObserver, LevelStatus, ProgressData } from '../../types';
import BaseComponent from '../../utils/BaseComponent';

const CSSClasses: ClassesCSS = {
    badge: ['badge'],
    notSolvedBadge: ['badge-secondary', 'text-bg-secondary'],
    solvedWithHintBadge: ['badge-primary', 'text-bg-primary'],
};

export class ProgressController implements IObserver {
    private progressData: ProgressData;

    private levelData: ILevelData[] = levelData;

    private helpBtn = AppComponents.headerComponent.helpBtn.getNode();

    private levelListInSideBarNode = AppComponents.levelBarComponent.levelList.getNode();

    private resetBtn = AppComponents.levelBarComponent.resetProgressBtn.getNode();

    private notSolvedBadge: BaseComponent = AppComponents.levelBarComponent.notSolvedBadge;

    private solvedBadge: BaseComponent = AppComponents.levelBarComponent.solvedBadge;

    private solvedWithHintBadge: BaseComponent = AppComponents.levelBarComponent.solvedWithHintBadge;

    constructor() {
        const progressDataInStorage = localStorage.getItem(STORAGE_PROGRESS_KEY);
        this.progressData = progressDataInStorage ? JSON.parse(progressDataInStorage) : {};
        if (!progressDataInStorage) this.setUpStartingData();
    }

    public update(passedLevel: number): void {
        if (this.progressData[passedLevel] === LevelStatus.Solved) return;
        if (this.progressData[passedLevel] === LevelStatus.NotSolved) {
            this.updateSolvedLevelData(passedLevel);
            this.drawNewBadge(passedLevel, this.solvedBadge);
            return;
        }
        this.drawNewBadge(passedLevel, this.solvedWithHintBadge);
    }

    public start(): void {
        this.helpBtn.addEventListener('click', this.listenHelpButtonEvent.bind(this));
        this.resetBtn.addEventListener('click', this.resetProgress.bind(this));
    }

    private drawNewBadge(levelNumber: number, newBadge: BaseComponent): void {
        const passedLevelSideBarNode = this.levelListInSideBarNode.children[levelNumber];
        const badge = passedLevelSideBarNode.lastElementChild;
        if (badge && badge.classList.contains(CSSClasses.badge[0])) {
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
        localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(this.progressData));
    }

    private resetProgress(): void {
        this.levelData.forEach((level, index) => {
            // eslint-disable-next-line no-param-reassign
            level.levelStatus = LevelStatus.NotSolved;
            this.progressData[index] = LevelStatus.NotSolved;
            this.drawNewBadge(index, this.notSolvedBadge);
        });
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
    }

    private listenHelpButtonEvent(): void {
        this.updateWithHintLevelData();
        this.saveProgressData();
    }
}
