/**
 * BaseComponent class represents a basic component for work with DOM.
 */
export default class BaseComponent {
    #node: HTMLElement;

    constructor(tagName: string = 'div', classNames: string[] = [], parentComponent?: BaseComponent) {
        this.#node = document.createElement(tagName);
        this.#node.classList.add(...classNames);
        if (parentComponent) {
            parentComponent.getNode().append(this.#node)
        }
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
        })
    }

    public setTextContent(text: string): void {
        this.#node.textContent = text;
    }

    public getNode(): HTMLElement {
        return this.#node;
    }

    public addClass(className: string): void {
        this.#node.classList.add(className);
    }

    public destroy(): void {
        this.#node.remove();
    }
}
