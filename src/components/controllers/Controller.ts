import { AnswerHandler } from './AnswerHandler';
import { LevelController } from './LevelController';

export class Controller {
    private answerHandler = new AnswerHandler();

    private levelController = new LevelController();

    public start(): void {
        this.levelController.drawLevel();
        this.answerHandler.subscribe(this.levelController);
        this.answerHandler.start();
    }
}
