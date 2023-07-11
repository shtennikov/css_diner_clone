import BaseComponent from '../utils/BaseComponent';

export interface ClassesCSS {
    [key: string]: string[];
}

export interface ILevelData {
    readonly id: number;
    levelStatus: LevelStatus;
    readonly correctAnswer: string;
    readonly levelComponentsOnDesk: HTMLElement[];
    readonly levelMarkup: BaseComponent;
}

export interface IObserver {
    update(levelNumber?: number): void;
}

export interface ISubject {
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(levelNumber?: number): void;
}

export interface ProgressData {
    [key: string]: LevelStatus;
}

export interface LanguageHljs {
    language: string;
}

export type Attributes = Record<string, Record<string, string>>;

export type Components = Record<string, BaseComponent>;

export const enum LevelStatus {
    NotSolved,
    Solved,
    SolvedWithHint,
}
