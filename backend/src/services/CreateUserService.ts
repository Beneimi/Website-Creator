import { NewUserData } from '../interfaces'
import { registerValidation } from '../validation'
import { UserModel } from '../schemas/Models'
import { UserRepository } from '../repository/UserRepository'
import { getHashedPassword } from '../security'
import { HtmlError } from '../error/HtmlError'
import { User } from '../domain/model/User'

export class CreateUserService {
  public static async process (userData: NewUserData) {
    // Validation
    const validationResult = registerValidation(userData)
    if (validationResult.error) {
      throw new HtmlError(400, validationResult.error.details.map(d => d.message).join(', and '))
    }

    // Duplication check

    const emailExist = await UserRepository.getUserByEmail(userData.email)
    if (emailExist) {
      throw new HtmlError(400, 'Account already exists with this email')
    }

    // Hash
    const hashedPassword = await getHashedPassword(userData.password)
    const user = new User(userData.name, userData.email, hashedPassword, 'user')

    try {
      return await new UserModel(user).save()
    } catch (err) {
      throw new HtmlError(500, 'User has not been saved')
    }
  }
}
