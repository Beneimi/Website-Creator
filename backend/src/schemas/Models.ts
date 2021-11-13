import {getModelForClass} from "@typegoose/typegoose";
import {Page} from "../domain/model/Page";
import {User} from "../domain/model/User";
import {BaseModule} from "../domain/model/modules/BaseModule";

export const PageModel = getModelForClass(Page)

export const ModuleModel = getModelForClass(BaseModule)

export const UserModel = getModelForClass(User)
