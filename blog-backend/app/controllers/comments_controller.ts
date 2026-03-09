import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  async store({ params, request, auth } : HttpContext) {
    const post = await Post.findOrFail(params.id)

    const comment = await post.related('comments').create({
      content: request.input('content'),
      userId: auth.user!.id,
    })

    return comment
  }
}
