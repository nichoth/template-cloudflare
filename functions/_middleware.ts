import type { Env } from '../_functions/types'

/**
 * Return a 401 response if basic auth credentials are invalid,
 * or null if auth passes.
 */
function checkBasicAuth (
    request:Request,
    env:Env
):Response|null {
    const authHeader = request.headers.get('Authorization')
    const expectedUser = env.BASIC_AUTH_USER || 'staging'
    const expectedPass = env.BASIC_AUTH_PASSWORD

    const unauthorized = new Response('Unauthorized', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Staging", charset="UTF-8"'
        }
    })

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return unauthorized
    }

    const decoded = atob(authHeader.slice(6))
    const colonIndex = decoded.indexOf(':')
    if (colonIndex === -1) return unauthorized

    const user = decoded.slice(0, colonIndex)
    const pass = decoded.slice(colonIndex + 1)

    if (user !== expectedUser || pass !== expectedPass) {
        return unauthorized
    }

    return null
}

/**
 * Handle headers.
 */
export const onRequest:PagesFunction<Env> = async (ctx) => {
    if (ctx.env.BASIC_AUTH_PASSWORD) {
        const authResponse = checkBasicAuth(ctx.request, ctx.env)
        if (authResponse) return authResponse
    }

    if (ctx.request.method === 'OPTIONS') {
        if (ctx.env.NODE_ENV === 'development') {
            const res = new Response(null, {
                headers: {
                    'access-control-allow-methods': 'PUT,OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers':
                        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Access-Control-Max-Age': '2592000',
                    'Access-Control-Allow-Credentials': 'true',
                }
            })

            return res
        }

        const res = new Response(null, {
            headers: {
                'access-control-allow-methods': 'PUT,OPTIONS',
                'Access-Control-Allow-Origin': 'https://vanishing.page',
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Max-Age': '2592000',
                'Access-Control-Allow-Credentials': 'true',
            }
        })

        return res
    }

    return await ctx.next()
}
