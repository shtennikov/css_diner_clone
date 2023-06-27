import { AppComponents } from '../../data/AppComponents';
import { Components } from '../../types';

export class View {
    protected rememberElements(componentName: string, components: Components): void {
        AppComponents[componentName] = components;
    }
}
