import { AppComponents } from '../../data/AppComponents';
import { IObserver, ISubject } from '../../types';

const SHAKING_CLASS_CSS = 'shaking';
const INCORRECT_ANSWER_CLASS_CSS = 'incorrect';

export class AnswerHandler implements ISubject {
    private input = AppComponents.cssEditorComponent.answerInput.getNode() as HTMLInputElement;

    private submitBtn = AppComponents.cssEditorComponent.buttonEnter.getNode();

    private desk = AppComponents.deskComponent.desk.getNode();

    private observers: IObserver[] = [];

    public start(): void {
        this.input.addEventListener('keyup', this.listenInputEvent.bind(this));
        this.submitBtn.addEventListener('click', this.listenButtonEvent.bind(this));
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

    public notify(): void {
        this.observers.forEach((observer) => observer.update());
    }

    private handleAnswer(): void {
        if (!this.input.value) return;
        const isCorrectAnswer = this.checkIfAnswerIsCorrect(this.input.value);

        if (isCorrectAnswer) this.notify();
        else this.handleIncorrectAnswer();
    }

    private handleIncorrectAnswer(): void {
        this.input.classList.add(INCORRECT_ANSWER_CLASS_CSS);
        this.desk.classList.add(SHAKING_CLASS_CSS);

        this.desk.addEventListener('animationend', () => {
            this.input.classList.remove(INCORRECT_ANSWER_CLASS_CSS);
            this.desk.classList.remove(SHAKING_CLASS_CSS);
        });
    }

    private checkIfAnswerIsCorrect(inputValue: string): boolean {
        const foundItems = this.desk.querySelectorAll(inputValue);
        const isFoundItemsAnimated = [...foundItems].every((item) => item.classList.contains('animated'));

        return Boolean(foundItems.length && isFoundItemsAnimated);
    }

    private listenInputEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.handleAnswer();
        }
    }

    private listenButtonEvent(): void {
        this.handleAnswer();
    }
}
