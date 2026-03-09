import Like from '#models/like'
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class LikesController {
  async like({ params, auth }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    const existingLike = await Like.query()
      .where('post_id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (existingLike) {
      return { message: 'You already liked this post' }
    }
    const like = await post.related('likes').create({
      userId: auth.user!.id,
    })

    return like
  }
  async unlike({ params, auth, response }: HttpContext) {
    const like = await Like.query()
      .where('post_id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (!like) {
      return response.notFound({ message: 'Like not found' })
    }

    await like.delete()

    return { message: 'Post unliked successfully' }
  }
}
