import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async me({ auth }: HttpContext) {
    return auth.user
  }
  async show({ params } : HttpContext) {
    const user = await User.findOrFail(params.id)
    return user
  }
  async posts({ params } : HttpContext) {
  const user = await User.findOrFail(params.id)

  const posts = await user.related('posts').query().paginate(1, 10)

  return posts
}
}
