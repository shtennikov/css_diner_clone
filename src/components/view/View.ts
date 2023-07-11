import { AppComponents } from '../../data/AppComponents';
import { Components } from '../../types/types';

export abstract class View {
    protected rememberElements(componentName: string, components: Components): void {
        AppComponents[componentName] = components;
    }
}
