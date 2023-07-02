import { Controller } from './controllers/Controller';
import { AppView } from './view/AppView';

export class App {
    private view = new AppView();

    private controller = new Controller();

    public start(): void {
        this.view.render();
        this.controller.start();
    }
}
