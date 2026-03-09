import { PostSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Comment from '#models/comment'
import Category from '#models/category'
import Like from '#models/like'
import Bookmark from '#models/bookmark'

export default class Post extends PostSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>

  @hasMany(() => Bookmark)
  declare bookmarks: HasMany<typeof Bookmark>
}
