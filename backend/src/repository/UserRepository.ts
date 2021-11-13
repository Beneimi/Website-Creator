import { UserModel } from '../schemas/Models'
import { UserDAO } from '../interfaces'

export class UserRepository {
  public static async getUserByEmail (email:string) {
    const found = await UserModel.findOne({ email: email })
    if (!found) {
      return null
    }

    return found
  }

  public static async getUserById (id:string): Promise<UserDAO> {
    return UserModel.findById(id)
  }

  public static async getUserByUserName (userName:string): Promise<UserDAO> {
    return UserModel.findOne({ name: userName })
  }

  public static updateUserRole (user: UserDAO, role: string) {
    user.updateOne({ role: role })
  }
}
