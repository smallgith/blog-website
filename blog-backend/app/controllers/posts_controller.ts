import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import Post from '#models/post'
import { createPostValidator } from '#validators/post'
import { mkdir } from 'node:fs/promises'
export default class PostsController {
  private createSlug(value: string) {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  private async ensureUniqueSlug(baseSlug: string, excludePostId?: number) {
    let candidate = baseSlug
    let counter = 2

    while (true) {
      const query = Post.query().where('slug', candidate)
      if (excludePostId) {
        query.whereNot('id', excludePostId)
      }

      const existing = await query.first()
      if (!existing) return candidate

      candidate = `${baseSlug}-${counter}`
      counter += 1
    }
  }

  private async findPostByRouteParam(routeParam: string) {
    const numericId = Number(routeParam)
    if (Number.isFinite(numericId)) {
      const byId = await Post.find(numericId)
      if (byId) return byId
    }

    const bySlug = await Post.query().where('slug', routeParam).first()
    return bySlug
  }

  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10
    const search = request.input('search')
    const query = Post.query().preload('user')
    if (search) {
      query.whereILike('title', `%${search}%`)
    }
    const posts = await query.paginate(page, limit)
    console.log(posts)
    return posts
  }
  async store({ request, auth }: HttpContext) {
    const user = auth.user!
    const payload = await request.validateUsing(createPostValidator)

    const image = request.file('cover_image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    let coverImageName: string | null = null
    if (image) {
      const uploadDir = app.makePath('public', 'uploadsF')
      await mkdir(uploadDir, { recursive: true })
      await image.move(uploadDir)
      coverImageName = image.fileName ?? null
    }

    const baseSlug = this.createSlug(payload.title)
    const slug = await this.ensureUniqueSlug(baseSlug)

    const post = await user.related('posts').create({
      title: payload.title,
      content: payload.content,
      slug,
      coverImage: coverImageName,
    })

    console.log(post)
    return post
  }
  async show({ params }: HttpContext) {
    const post = await Post.query().where('slug', params.slug).preload('user').firstOrFail()
    console.log(post)
    return post
  }
  async update({ params, request, auth, response }: HttpContext) {
    const post = await this.findPostByRouteParam(params.slug)
    if (!post) {
      return response.notFound({ message: 'Post not found' })
    }

    if (post.userId !== auth.user!.id) {
      return response.unauthorized({ message: 'You cannot edit this post' })
    }
    const payload = await request.validateUsing(createPostValidator)

    const image = request.file('cover_image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })

    if (image) {
      const uploadDir = app.makePath('public', 'uploadsF')
      await mkdir(uploadDir, { recursive: true })
      await image.move(uploadDir)
      post.coverImage = image.fileName ?? null
    }

    const baseSlug = this.createSlug(payload.title)
    const slug = await this.ensureUniqueSlug(baseSlug, post.id)

    post.merge({
      title: payload.title,
      content: payload.content,
      slug,
    })
    await post.save()
    return post
  }
  async destroy({ params, response, auth }: HttpContext) {
    const post = await this.findPostByRouteParam(params.slug)
    if (!post) {
      return response.notFound({ message: 'Post not found' })
    }

    if (post.userId !== auth.user!.id) {
      return response.unauthorized({ message: 'You cannot delete this post' })
    }
    await post.delete()

    return response.json({
      message: 'Post deleted successfully',
    })
  }
}
