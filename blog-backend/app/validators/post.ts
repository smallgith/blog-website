import vine from '@vinejs/vine'

export const createPostValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    slug: vine.string(),
    cover_image: vine
      .file({
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
      })
      .optional(),
    content: vine.string().minLength(10),
  })
)
