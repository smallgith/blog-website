import app from '@adonisjs/core/services/app'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  private getDuplicateMessage(error: unknown) {
    const message =
      typeof error === 'object' && error && 'message' in error && typeof error.message === 'string'
        ? error.message
        : ''

    const code =
      typeof error === 'object' && error && 'code' in error && typeof error.code === 'string'
        ? error.code
        : ''

    const isDuplicateError =
      code === '23505' ||
      code === 'ER_DUP_ENTRY' ||
      message.toLowerCase().includes('duplicate key value violates unique constraint')

    if (!isDuplicateError) {
      return null
    }

    const constraintMatch = message.match(/constraint "([^"]+)"/i)
    const constraint = constraintMatch?.[1] ?? ''

    const constraintMessageMap: Record<string, string> = {
      posts_slug_unique: 'A post with this slug already exists. Please choose a different title.',
      users_email_unique: 'Email already exists. Please login or use another email.',
    }

    return constraintMessageMap[constraint] ?? 'Duplicate value. Please use a different value.'
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    const duplicateMessage = this.getDuplicateMessage(error)
    if (duplicateMessage) {
      return ctx.response.status(409).json({
        message: duplicateMessage,
      })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
