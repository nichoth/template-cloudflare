# template cloudflare ![tests](https://github.com/nichoth/template-cloudflare/actions/workflows/nodejs.yml/badge.svg)

A template for applications using [preact](https://preactjs.com/), [htm](https://github.com/developit/htm/tree/master), [typescript](https://www.typescriptlang.org/), and [cloudflare](https://www.cloudflare.com/) as host. Use [tape-run](https://github.com/juliangruber/tape-run) for tests in a browser environment.

See [template-ts-preact-htm-app](https://github.com/nichoth/template-ts-preact-htm-app) for the same thing, but not using cloudflare.

See [template-ts-preact-htm](https://github.com/nichoth/template-ts-preact-htm) for something similar, but for dependency modules.

## use

1. Use the template button in github. Or clone this then `rm -rf .git && git init`. 
2. Then `npm i && npm init`.
3. Edit the source code in `src/`.
4. Write docs -- `mv README.example.md README.md` + edit the readme file

## featuring

* `preversion` npm hook -- lint.
* `postversion` npm hook -- `git push && git push --tags`
* eslint via [eslint-config-standard](https://github.com/standard/eslint-config-standard) -- `npm run lint`
* test in a browser environment via `tape-run` -- see `npm test`. Includes `tap` testing tools -- [tapzero](https://github.com/bicycle-codes/tapzero) and [tap-spec](https://www.npmjs.com/package/tap-spec)
* CI via github actions
* routing via [route-event](https://github.com/nichoth/route-event) and [@bicycle-codes/routes](https://github.com/bicycle-codes/routes)

## develop

Start a localhost server, and serve the cloudinary serverless functions locally. Note the lambda functions are accessible at the path `/api/*`.

```sh
npm start
```

## architecture

See [this article](https://gomakethings.com/easier-state-management-with-preact-signals/) for more details about application architecture.

We create application state and logic in the file [./src/state.ts](./src/state.ts). This exports static functions, creates a state object, and sets up URL routing.

In the view code, you would call the functions exposed in [state](./src/state.ts) with a state instance in response to application events.

## Notes

### [headers + cloudflare functions](https://developers.cloudflare.com/pages/configuration/headers/)

> [!WARNING]  
> Custom headers defined in the _headers file are not applied to responses from
> Functions, even if the Function route matches the URL pattern. If your Pages
> application uses Functions, you must migrate any behaviors from the _headers
> file to the Response object in the appropriate /functions route. When altering
> headers for multiple routes, you may be interested in [adding middleware](https://developers.cloudflare.com/pages/functions/middleware/)
> for shared behavior.
