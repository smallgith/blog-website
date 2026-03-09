// -- Active: 1772454019913@@127.0.0.1@5432@blog_db
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import app from '@adonisjs/core/services/app'
import { createReadStream, existsSync } from 'node:fs'
import { basename, extname } from 'node:path'
import { controllers } from '#generated/controllers'
import PostsController from '#controllers/posts_controller'
import AuthController from '#controllers/auth_controller'
import CommentsController from '#controllers/comments_controller'
import LikesController from '#controllers/likes_controller'
import BookmarksController from '#controllers/bookmarks_controller'
import ProfilesController from '#controllers/profiles_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router.get('/uploadsF/:file', async ({ params, response }) => {
  const fileName = basename(params.file)
  const filePath = app.makePath('public', 'uploadsF', fileName)

  if (!existsSync(filePath)) {
    return response.notFound({ message: 'Image not found' })
  }

  const extension = extname(fileName).toLowerCase()
  const mimeType =
    extension === '.png'
      ? 'image/png'
      : extension === '.jpg' || extension === '.jpeg'
        ? 'image/jpeg'
        : 'application/octet-stream'

  response.header('Cache-Control', 'public, max-age=86400')
  response.type(mimeType)
  return response.stream(createReadStream(filePath))
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('/profile', [controllers.Profile, 'show'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')

// router.get('/posts',[PostsController,'index'])
// router.post('/posts', [PostsController, 'store'])

// router.get('/posts/:slug', [PostsController, 'show'])

// router.put('/posts/:id',[PostsController,'update'])

// router.delete('/posts/:id',[PostsController,'destroy'])

router.resource('posts', PostsController).apiOnly().use('*', middleware.auth()).params({
  posts: 'slug',
})
router.post('/posts/:id/comments', [CommentsController, 'store']).use(middleware.auth())
router.post('/posts/:id/like', [LikesController, 'like']).use(middleware.auth())
router.delete('/posts/:id/like', [LikesController, 'unlike']).use(middleware.auth())
router.post('/posts/:id/bookmark', [BookmarksController, 'store']).use(middleware.auth())
router.delete('/posts/:id/bookmark', [BookmarksController, 'destroy']).use(middleware.auth())
router.get('/bookmarks', [BookmarksController, 'index']).use(middleware.auth())
router.get('/me', [ProfilesController, 'me']).use(middleware.auth())
router.get('/users/:id', [ProfilesController, 'show'])
router.get('/users/:id/posts', [ProfilesController, 'posts'])
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
