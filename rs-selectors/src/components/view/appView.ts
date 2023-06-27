import { Editor } from './editor/editor';
import { Footer } from './footer/footer';
import { GameDesk } from './gameDesk/gameDesk';
import { Header } from './header/header';
import { LevelBar } from './levelBar/levelBar';

export class AppView {
    private header = new Header();

    private footer = new Footer();

    private levelBar = new LevelBar();

    private editor = new Editor();

    private desk = new GameDesk();

    public render(): void {
        document.body.append(
            this.header.getComponent(),
            this.desk.getComponent(),
            this.editor.getComponent(),
            this.levelBar.getComponent(),
            this.footer.getComponent()
        );
    }
}
