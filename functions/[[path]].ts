import type { Env } from '../_functions/types'

/**
 * Catch-all route so that _middleware.ts applies to all requests,
 * including those for static assets.
 */
export const onRequest:PagesFunction<Env> = async (ctx) => {
    return ctx.next()
}
