import BaseComponent from '../src/utils/BaseComponent';

describe('BaseComponent', () => {
    let parentComponent: BaseComponent;
    let baseComponent: BaseComponent;

    beforeEach(() => {
        parentComponent = new BaseComponent('div');
        baseComponent = new BaseComponent('span', ['class1', 'class2'], parentComponent);
    });

    afterEach(() => {
        parentComponent.destroy();
    });

    describe('constructor', () => {
        it('should create a new BaseComponent instance with the specified tag name and class names', () => {
            expect(baseComponent.getNode().tagName).toBe('SPAN');
            expect(baseComponent.getNode().classList).toContain('class1');
            expect(baseComponent.getNode().classList).toContain('class2');
        });

        it('should append the new BaseComponent instance to the parent component', () => {
            expect(parentComponent.getNode().querySelector('span')).toBe(baseComponent.getNode());
        });
    });

    describe('append', () => {
        it('should append a child BaseComponent to the current component', () => {
            const childComponent = new BaseComponent('a');

            baseComponent.append(childComponent);

            expect(baseComponent.getNode().querySelector('a')).toBe(childComponent.getNode());
        });
    });

    describe('appendChildren', () => {
        it('should append an array of child BaseComponents to the current component', () => {
            const childComponent1 = new BaseComponent('a');
            const childComponent2 = new BaseComponent('b');
            const childComponent3 = new BaseComponent('c');

            baseComponent.appendChildren([childComponent1, childComponent2, childComponent3]);

            expect(baseComponent.getNode().querySelector('a')).toBe(childComponent1.getNode());
            expect(baseComponent.getNode().querySelector('b')).toBe(childComponent2.getNode());
            expect(baseComponent.getNode().querySelector('c')).toBe(childComponent3.getNode());
        });
    });

    describe('setAttributes', () => {
        it('should set attributes on the current component', () => {
            const attributes = {
                href: 'https://example.com',
                target: '_blank',
                rel: 'noopener noreferrer',
            };

            baseComponent.setAttributes(attributes);

            const node = baseComponent.getNode();
            expect(node.getAttribute('href')).toBe(attributes.href);
            expect(node.getAttribute('target')).toBe(attributes.target);
            expect(node.getAttribute('rel')).toBe(attributes.rel);
        });
    });

    describe('insertHTML', () => {
        it('should insert HTML content before the end of the current component', () => {
            const html = '<strong>Hello, world!</strong>';

            baseComponent.insertHTML(html);

            expect(baseComponent.getNode().innerHTML).toContain(html);
        });
    });

    describe('setTextContent', () => {
        it('should set the text content of the current component', () => {
            const text = 'Hello, world!';

            baseComponent.setTextContent(text);

            expect(baseComponent.getNode().textContent).toBe(text);
        });
    });

    describe('getNode', () => {
        it('should return the underlying DOM node of the current component', () => {
            const node = baseComponent.getNode();

            expect(node.tagName).toBe('SPAN');
        });
    });

    describe('getCloneNode', () => {
        it('should return a clone of the underlying DOM node of the current component', () => {
            const cloneNode = baseComponent.getCloneNode();
            if (cloneNode instanceof HTMLElement) {
                expect(cloneNode).not.toBe(baseComponent.getNode());
                expect(cloneNode.tagName).toBe('SPAN');
                expect(cloneNode.classList).toContain('class1');
                expect(cloneNode.classList).toContain('class2');
            }
        });
    });

    describe('addClass', () => {
        it('should add a class name to the current component', () => {
            baseComponent.addClass('class3');

            expect(baseComponent.getNode().classList).toContain('class3');
        });

        it('should add multiple class names to the current component', () => {
            baseComponent.addClass(['class3', 'class4']);

            expect(baseComponent.getNode().classList).toContain('class3');
            expect(baseComponent.getNode().classList).toContain('class4');
        });
    });

    describe('removeClass', () => {
        it('should remove a class name from the current component', () => {
            baseComponent.removeClass('class2');

            expect(baseComponent.getNode().classList).not.toContain('class2');
        });
    });

    describe('addId', () => {
        it('should set the id of the current component', () => {
            const id = 'component1';

            baseComponent.addId(id);

            expect(baseComponent.getNode().id).toBe(id);
        });
    });

    describe('setObserver', () => {
        it('should set an observer for the current component', () => {
            const observer = new BaseComponent('div');

            baseComponent.setObserver(observer);

            expect(baseComponent.getObserver()).toBe(observer);
        });
    });

    describe('getObserver', () => {
        it('should return the observer of the current component', () => {
            const observer = new BaseComponent('div');
            baseComponent.setObserver(observer);

            expect(baseComponent.getObserver()).toBe(observer);
        });
    });

    describe('destroy', () => {
        it('should remove the current component from the DOM', () => {
            baseComponent.destroy();

            expect(parentComponent.getNode().querySelector('span')).toBeNull();
        });
    });
});
