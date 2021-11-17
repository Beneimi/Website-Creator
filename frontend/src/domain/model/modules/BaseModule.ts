import { ModuleType } from '../../interfaces'

export abstract class BaseModule {
    protected readonly id: string;
    protected readonly type: ModuleType;
    protected place?: number;

    protected constructor (moduleId: string, type: ModuleType, place = 0) {
      this.id = moduleId
      this.type = type
        this.place = place
    }

    public setPlace (place: number) {
        this.place = place
        return this
    }

    public getType () {
      return this.type
    }

    public getId () {
      return this.id
    }

    public getPlace () {
      return this.place
    }
}
