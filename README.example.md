# project name

Docs here

## staging

The staging branch is protected by HTTP basic auth. To set credentials, add
environment variables in the Cloudflare Pages dashboard scoped to the staging
branch (Settings → Environment variables):

| Variable            | Required | Default    | Description               |
| ------------------- | -------- | ---------- | ------------------------- |
| `BASIC_AUTH_PASSWORD` | yes    | —          | Password for basic auth   |
| `BASIC_AUTH_USER`   | no       | `staging`  | Username for basic auth   |

Leave these variables unset in production — auth is only enforced when
`BASIC_AUTH_PASSWORD` is present.

## develop

```
npm start
```
