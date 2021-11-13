import * as joi from 'joi'
import { string } from 'joi'

export const registerValidation = (data) => {
  const registerValidationSchema = joi.object({
    name: joi.string()
      .min(5)
      .required(),
    email: joi.string()
      .email(),
    password: joi.string()
      .min(8)
      .required()
  })

  return registerValidationSchema.validate(data, { abortEarly: false })
}

export const loginValidation = (data) => {
  const loginValidationSchema = joi.object({
    email: joi.string()
      .email(),
    password: joi.string()
      .min(8)
      .required()
  })

  return loginValidationSchema.validate(data)
}

export const createValidation = (data) => {
  const createValidationSchema = joi.object({
    title: joi.string()
      .required(),
    content: joi.string()
  })

  return createValidationSchema.validate(data)
}

export const editValidation = (data) => {
  const editValidationSchema = joi.object({
    pageId: string()
      .required(),
    modules: joi.array()
      .required()
  })
  // TODO real validation

  return editValidationSchema.validate(joi.object(data))
}

export const voteValidation = (data) => {
  const voteValidationSchema = joi.object({
    pageId: string()
      .required(),
    votedId: joi.string()
      .required(),
    moduleId: joi.string()
      .required()
  })
  // TODO real validation

  return voteValidationSchema.validate(data)
}

export const emailValidation = (data) => {
  const emailValidationSchema = joi.object({
    email: joi.string()
      .email()
  })

  return emailValidationSchema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
