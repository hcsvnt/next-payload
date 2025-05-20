# Next.js + Payload CMS Template

This is an official TODO! by [Mateusz Hallala](https://github.com/hcsvnt).

<!-- Find it [here](https://github.com//payload-cms). -->

---

<!-- TODO:
  - add styling
 -->

<!-- You can view this as a page at /docs. -->

## Table of Contents

<!-- TODO:
  - global store info
  - linters / prettier info
  - git-hooks info
  - forms info
  - i18n info
  - bundle analyzer info
  - pnpm overrides info
  - etc
  - miscellaneous:
    - structure info
    - don't store large files
    - don't put secrets in the repo
    - don't store images in the public folder
    - etc
 -->

- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Infrastructure](#infrastructure)
- [Development](#development)
- [Production](#production)
    - [Deployment](#deployment)
    - [Security](#security)
    - [Docker](#docker)
    - [Caching](#caching)
- [Data Model](#data-model)
    - [Globals](#globals)
    - [Collections](#collections)
        - [Pages](#pages)
        - [News](#news)
        - [Media](#media)
        - [Users](#users)
        - [Third Party Access](#third-party-access)
- [Features](#features)
  <!-- - [Branded Admin Panel](#branded-admin-panel) -->
    - [Authentication](#authentication)
    - [API key authentication](#api-key-authentication)
    - [Email Service](#email-service)
    - [File storage](#file-storage)
    - [Access control](#access-control)
    - [Layout Builder](#layout-builder)
    - [Lexical editor](#lexical-editor)
    - [Previews (Published, Draft, Live)](#previews-published-draft-live)
    - [SEO](#seo)
- [SQL](#sql)
- [Questions](#questions)

---

## Environment Variables

- ## Vercel (not in .env):
    - VERCEL_ENV= the environment of your Vercel deployment, e.g. `production`
    - VERCEL_BRANCH_URL= the URL of Vercel branch deployment, e.g.
      `cms-payload-git-main-snshp.vercel.app` (main branch)
    - VERCEL_PROJECT_PRODUCTION_URL= the production URL of your Vercel project, e.g.
      `cms-payload.vercel.app` (set in vercel/settings/domains)
- ### Payload:
    - DATABASE_URI= the URI of your database, e.g. `mongodb://localhost:27017/payload`
    - PAYLOAD_SECRET= a secret key for Payload to use for encryption
    - SEO_TITLE= the title of your site to use for automatic generation of SEO
      fields
    - DRAFT_SECRET= a secret key for Payload to use for securing draft previews
    - #### Email:
        - SMTP_SERVICE= the service to use for sending emails, e.g. `gmail`
        - SMTP_USER= the email address to use for sending emails
        - SMTP_PASS= the password to use for sending emails
    - #### File Storage (choose one):
        - ##### S3:
            - S3_BUCKET= the name of the S3 bucket to use for file storage
            - S3_ACCESS_KEY_ID= the access key ID for your S3 bucket
            - S3_SECRET_ACCESS_KEY= the secret access key for your S3 bucket
        - ##### Uploadthing (default):
            - UPLOADTHING_TOKEN= the token to use for Uploadthing file storage

---

## Installation

This template uses pnpm, so\*:

```bash
pnpm install
```

If you don't have pnpm installed, check the [pnpm documentation](https://pnpm.io/installation) for instructions.

\*basically just swap 'npm' with 'pnpm' and skip 'run' in the commands.

---

## Infrastructure

To run Payload requires:

- a database along with the appropriate adapter and [environment variables](#environment-variables) - either
  [MongoDB](https://payloadcms.com/docs/database/mongodb),
  [SQLite](https://payloadcms.com/docs/database/sqlite) or
  [PostgreSQL](https://payloadcms.com/docs/database/postgres), locally or in the
  cloud (Atlas, Vercel DB, etc.) [See more](https://payloadcms.com/docs/database/overview)
- a file storage solution along with the [approriate adapter](https://payloadcms.com/docs/upload/storage-adapters) and [environment variables](#environment-variables) - either local disk, S3, or Uploadthing
  [See SQL info](#sql)
  [See more](https://payloadcms.com/docs/upload/overview)

---

## Development

1. Prepare your repository, clone and `cd` into it:
2. Fill your [environment variables](#environment-variables) - `cp .env.example
.env` and insert your values
3. Install the dependencies - `pnpm install`
4. Start the development server - `pnpm dev`
5. Open the browser and go to `http://localhost:3000/admin` (or the first free
   subsequent port if 3000 is taken)
6. Create your first user account

---

## Production

To build the production version of the app, run:

```bash
pnpm build
```

To start the production server, run:

```bash
pnpm start
```

Next.js serves the built application from the `.next` directory.

### Deployment

- Vercel - this template deploys on Vercel automatically (it's Next.js). Just
  point Vercel to your repository, add your [environmentvariables](#environment-variables) and you're good to go.
  Thanks to `utils/getServerURL` helper, we don't need to set any server/app URLs for
  Next.js or Payload.
- Self-hosting - this template can be self-hosted on any server that supports
  Node.js. Just make sure to set the appropriate
  [environment variables](#environment-variables) and use a process manager like
  PM2 to keep the instance running.

[See more](https://payloadcms.com/docs/production/deployment)

### Security

Payload has built-in security features and reasonable defaults to prevent abuse
and keep your data safe. Especially pay attention to:

- keeping your database connections secure (avoid whitelist all IPs, protect
  connection strings, etc.)
- managing [collections](#collections) [access control](#access-control)
- if using [API key authentication](#api-key-authentication) for external
  applications, make sure to keep your API keys secure
- just be reasonable and follow best practices :-P

### Docker

  <!-- TODO: check if this works -->

You can use [Docker](https://www.docker.com) to spin up this template locally. To do so, follow these steps:

1. Prepare your repository, clone and `cd` into it:
2. Fill your [environment variables](#environment-variables) - `cp .env.example
.env` and insert your values
3. Run `docker-compose up`
4. Install the dependencies - `pnpm install`
5. Start the development server - `pnpm dev`
6. Open the browser and go to `http://localhost:3000/admin` (or the first free
   subsequent port if 3000 is taken)
7. Create your first user account

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

[See more](https://payloadcms.com/docs/production/preventing-abuse)

### Caching

Next.js 15 introduced significant changes in caching:

- fetch requests will use 'no-store' by default
- GET route handlers will not cache by default
- Client-side routing will not cache page components by default

So in short THINGS DON'T CACHE BY DEFAULT. This is great for development work,
because all pages are get fresh data on every reload and thus we don't need to
bother with cache revalidation. It is also not ideal for Production, because
we're missing out on performance gains from caching.
Some built-in collections have caching enabled (pages), but you need to take care of any
new ones you add.

Learn more:

- [Caching overview](https://nextjs.org/docs/app/building-your-application/caching)
- [Fetching and caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)

---

## Data Model

Payload CMS divides data into [Collections](#collections) and
[Globals](#globals). Collections are used to store structured data like pages,
blog posts, news articles, etc. Globals are used to store data that is
shared across the site like headers, footers, or settings.

### Globals

See the [documentation](https://payloadcms.com/docs/configuration/globals) for details on how to extend this functionality.

- `Header`

    The data required by the header on your front-end like nav links.

- `Footer`

    Same as above but for the footer of your site.

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections)
docs for details on how to extend this functionality.

- #### Pages

    Pages consist of sections, each of which is a layout builder to be
    constructed from predefined blocks.

- #### News

    News is a collection of news articles. Each article has a title, a
    publication date, a summary, and a body. The body is a layout builder to be
    constructed from predefined blocks.

- #### Images

    Images is an upload type collection for images. It supports bulk upload and uses the uploadthing storage adapter.
    See [Uploads](https://payloadcms.com/docs/upload/overview) docs.

- #### Users

    Users are an auth-enabled collection that have access to the admin panel and unpublished content. See [Access Control](#access-control) for more details.

    See [Authentication Overview](https://payloadcms.com/docs/authentication/overview#authentication-overview)
    for more details.

- #### Third Party Access

    This is a collection of API keys for use with third party applications.

---

## Features

Payload comes with a lot of features out of the box, but can also be extended
with official and community plugins, as well as custom functionality - it's all
code after all.
[See documentation](https://payloadcms.com/docs/plugins/overview).

<!-- ### Branded Admin Panel

The template comes with a branded UI. This can be customized further to
client requirements.
See [Payload blog post on white-labeling](https://payloadcms.com/blog/white-label-admin-ui) for an example. -->

### Authentication

The authentication system which Payload uses internally can be utilised in
your frontend app. This can either be based on the same [Users](#users)
collection or a separate auth-enabled collection. See
[Documentation](https://payloadcms.com/docs/authentication/overview#authentication-overview)
for more details.

### API key authentication

API keys can be used to authenticate third party applications with your Payload instance. This is useful for building custom integrations or for allowing external applications to access your data. See [Documentation](https://payloadcms.com/docs/authentication/api-keys) for more details.

### Email Service

Email service is set up with nodemailer and [Hallala Work's](hallala.work@gmail.com) account. See [Documentation](https://payloadcms.com/docs/email/overview) for more details.

### File storage

Payload supports multiple file storage adapters, including local disk, S3, and Uploadthing. This template comes pre-configured with the official [Payload Uploadthing Plugin](https://payloadcms.com/docs/upload/storage-adapters/uploadthing).

### Access control

Access Control determines what a user can and cannot do with any given Document, as well as what they can and cannot see within the Admin Panel. By implementing Access Control, you can define granular restrictions based on the user, their roles (RBAC), Document data, or any other criteria your application requires.
See [Documentation](https://payloadcms.com/docs/access-control/overview) for more details.

For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

### Layout Builder

Included is a powerful builder that allows you to create custom layouts for your
pages, posts, etc. This template comes with a few predefined blocks to
get you started, but you can easily add more by creating new blocks in the
`src/blocks` directory.
[See more](https://payloadcms.com/docs/fields/blocks)

### Lexical editor

Lexical is an advanced and highly customizable rich text editor. It allows
predefining available styles at the global or field level. Additionally the same
blocks used for [Layout Builder](#layout-builder) can be allowed in rich text, too.
See [Lexical](https://payloadcms.com/docs/rich-text/overview) docs.

### Previews (Published, Draft, Live)

The following previews are available:

- Published Preview - see the published version of the document as it will
  appear on the front-end by visiting the document's URL (e.g.
  'http://my-site/my-page'), this will display the latest published version
- Draft Preview - see the draft version of the document as it will appear on the
  front-end (after publishing) by visiting using the "Preview" button in the
  Admin Panel, this will display the latest draft version of the document in a
  new tab and is secured by a secret key stored by the server
- Live Preview - see the updates to the document in real-time as you make changes
  in the Admin Panel, this will display the latest draft version of the document
  in a part of the Admin Panel

### SEO

This template comes pre-configured with the official [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) for complete SEO control from the admin panel. All SEO data is fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

<!-- TODO -->
<!-- ### Search

This template also pre-configured with the official [Payload Saerch Plugin](https://payloadcms.com/docs/plugins/search) to showcase how SSR search features can easily be implemented into Next.js with Payload. See [Website](#website) for more details. -->

<!-- TODO -->
<!-- ### Redirects

If you are migrating an existing site or moving content to a new URL, you can use the `redirects` collection to create a proper redirect from old URLs to new ones. This will ensure that proper request status codes are returned to search engines and that your users are not left with a broken link. This template comes pre-configured with the official [Payload Redirects Plugin](https://payloadcms.com/docs/plugins/redirects) for complete redirect control from the admin panel. All redirects are fully integrated into the front-end website that comes with this template. See [Website](#website) for more details. -->

---

## SQL

<!-- TODO: check Vercel DB (postgres) -->

Postgres and other SQL-based databases follow a strict schema for managing your data. In comparison to our MongoDB adapter, this means that there's a few extra steps to working with Postgres.

Note that often times when making big schema changes you can run the risk of losing data if you're not manually migrating it.

### Local development

Ideally we recommend running a local copy of your database so that schema updates are as fast as possible. By default the Postgres adapter has `push: true` for development environments. This will let you add, modify and remove fields and collections without needing to run any data migrations.

If your database is pointed to production you will want to set `push: false` otherwise you will risk losing data or having your migrations out of sync.

### Migrations

[Migrations](https://payloadcms.com/docs/database/migrations) are essentially SQL code versions that keeps track of your schema. When deployed with Postgres you will need to make sure you create and then run your migrations.

Locally create a migration

```bash
pnpm payload migrate:create
```

This creates the migration files you will need to push alongside with your new configuration.

On the server after building and before running `pnpm start` you will want to run your migrations

```bash
pnpm payload migrate
```

This command will check for any migrations that have not yet been run and try to
run them and it will keep a record of migrations that have been run in the
database.

---

## Questions?

If you have any issues or questions, reach out to [Mateusz Hallala](https://github.com/hcsvnt).
