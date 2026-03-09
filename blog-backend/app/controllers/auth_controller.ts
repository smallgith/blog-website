import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])
    const normalizedEmail = String(data.email || '')
      .trim()
      .toLowerCase()

    const existingUser = await User.query().where('email', normalizedEmail).first()
    if (existingUser) {
      return response.conflict({
        message: 'Email already exists. Please login or use another email.',
      })
    }

    const user = await User.create({
      ...data,
      email: normalizedEmail,
    })

    return user
  }
  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return token
  }
}
