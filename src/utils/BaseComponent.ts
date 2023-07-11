/**
 * BaseComponent class represents a basic component for work with DOM.
 */
export default class BaseComponent {
    #node: HTMLElement;

    private observer: BaseComponent | null = null;

    constructor(tagName: string, classNames: string[] | null = null, parentComponent?: BaseComponent) {
        this.#node = document.createElement(tagName);
        if (classNames) this.#node.classList.add(...classNames);
        if (parentComponent) parentComponent.getNode().append(this.#node);
    }

    public append(child: BaseComponent): void {
        this.#node.append(child.getNode());
    }

    public appendChildren(children: BaseComponent[]): void {
        children.forEach((el) => {
            this.append(el);
        });
    }

    public setAttributes(attributes: Record<string, string>): void {
        Object.entries(attributes).forEach(([key, value]) => {
            this.#node.setAttribute(key, value);
        });
    }

    public insertHTML(html: string): void {
        this.#node.insertAdjacentHTML('beforeend', html);
    }

    public setTextContent(text: string): void {
        this.#node.textContent = text;
    }

    public getNode(): HTMLElement {
        return this.#node;
    }

    public getCloneNode(): Node {
        return this.#node.cloneNode(true);
    }

    public addClass(className: string | string[]): void {
        if (typeof className === 'string') this.#node.classList.add(className);
        else this.#node.classList.add(...className);
    }

    public removeClass(className: string): void {
        this.#node.classList.remove(className);
    }

    public addId(id: string): void {
        this.#node.id = id;
    }

    public setObserver(observer: BaseComponent): void {
        this.observer = observer;
    }

    public getObserver(): BaseComponent | null {
        return this.observer;
    }

    public destroy(): void {
        this.#node.remove();
    }
}
