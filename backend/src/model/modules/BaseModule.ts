import {ModuleType} from '../../interfaces';

export abstract class BaseModule {
    protected readonly id: number;
    protected readonly type: ModuleType;
    protected readonly pageId: string;
    protected place?: number;

    protected constructor(pageId: string, moduleId: number, type: ModuleType) {
        this.id = moduleId;
        this.pageId = pageId;
        this.type = type;
    }

    public setPlace(place: number) {
        this.place = place;
    }

    public getPlace() {
        return this.place;
    }

    public getPageId() {
        return this.pageId;
    }
}