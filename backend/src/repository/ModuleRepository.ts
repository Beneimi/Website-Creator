import {ModuleModel} from "../schemas/Models";
import {BaseModule} from "../domain/model/modules/BaseModule";

export class ModuleRepository{
    static async GetModuleById(moduleId: string) {
        return ModuleModel.findById(moduleId);
    }
}