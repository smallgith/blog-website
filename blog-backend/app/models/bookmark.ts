import { BookmarkSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Post from '#models/post'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Bookmark extends BookmarkSchema {
     @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}