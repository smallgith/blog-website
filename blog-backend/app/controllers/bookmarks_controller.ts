import Bookmark from '#models/bookmark'
import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookmarksController {
  async index({ auth, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const posts = await Post.query()
      .whereIn('id', (query) => {
        query.from('bookmarks').select('post_id').where('user_id', auth.user!.id)
      })
      .preload('user')
      .preload('likes')
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return posts
  }

  async store({ params, auth }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    const bookmark = await post.related('bookmarks').create({
      userId: auth.user!.id,
    })

    return bookmark
  }
  async destroy({ params, auth, response }: HttpContext) {
    const bookmark = await Bookmark.query()
      .where('post_id', params.id)
      .where('user_id', auth.user!.id)
      .first()

    if (!bookmark) {
      return response.notFound({ message: 'Bookmark not found' })
    }

    await bookmark.delete()

    return { message: 'Bookmark removed' }
  }
}
