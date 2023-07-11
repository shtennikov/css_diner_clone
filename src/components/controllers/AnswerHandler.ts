import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import { CSS_LANGUAGE_HLJS, DEFAULT_CSS_EDITOR_CONTENT, STORAGE_LEVEL_KEY } from '../../data/constants';
import { AppComponents } from '../../data/AppComponents';
import { levelData } from '../../data/LevelData';
import { IObserver, ISubject } from '../../types/types';

hljs.registerLanguage('css', css);

const SHAKING_CLASS_CSS = 'shaking';
const INCORRECT_ANSWER_CLASS_CSS = 'incorrect';
const DELAY_INTERVAL = 150;

export class AnswerHandler implements ISubject {
    private input = AppComponents.cssEditorComponent.answerInput.getNode() as HTMLInputElement;

    private output = AppComponents.cssEditorComponent.answerOutput.getNode();

    private submitBtn = AppComponents.cssEditorComponent.buttonEnter.getNode();

    private desk = AppComponents.deskComponent.desk.getNode();

    private helpBtn = AppComponents.headerComponent.helpBtn.getNode();

    private observers: IObserver[] = [];

    public start(): void {
        document.addEventListener('keyup', this.listenInputEvent.bind(this));
        this.submitBtn.addEventListener('click', this.listenButtonEvent.bind(this));
        this.helpBtn.addEventListener('click', this.listenHelpButtonEvent.bind(this));
        this.input.addEventListener('input', this.updateOutput.bind(this));
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
        const isCorrectAnswer = Boolean(this.input.value) && this.checkIfAnswerIsCorrect(this.input.value);

        if (!isCorrectAnswer) {
            this.handleIncorrectAnswer();
            return;
        }

        this.input.value = '';
        this.notify();
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
        try {
            const foundItems = this.desk.querySelectorAll(inputValue);
            const isFoundItemsAnimated = [...foundItems].every((item) => item.classList.contains('animated'));

            return Boolean(foundItems.length && isFoundItemsAnimated);
        } catch {
            return false;
        }
    }

    private showCorrectAnswer(): void {
        const currentLevel = Number(localStorage.getItem(STORAGE_LEVEL_KEY));
        const { correctAnswer } = levelData[currentLevel];
        let delay = DELAY_INTERVAL;
        this.input.value = '';

        [...correctAnswer].forEach((letter) => {
            setTimeout(() => {
                this.input.value += letter;
                this.updateOutput();
            }, delay);
            delay += DELAY_INTERVAL;
        });
    }

    private updateOutput(): void {
        this.output.innerHTML = `${
            hljs.highlight(`${this.input.value} ${DEFAULT_CSS_EDITOR_CONTENT}`, CSS_LANGUAGE_HLJS).value
        }`;
    }

    private listenInputEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.handleAnswer();
        }
    }

    private listenButtonEvent(): void {
        this.handleAnswer();
    }

    private listenHelpButtonEvent(): void {
        this.showCorrectAnswer();
    }
}
