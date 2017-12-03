# proxify - (proof-of-concept) API proxy

Consuming APIs with SPAs reveals the API key to the end user. This is not the
desired behavior, as one wants to keep his API key a secret.

This package starts an `express` server that proxies all `POST` requests to the
API specified in the `API_URL` environment variable. The API key can be
specified with `API_KEY`.

## Usage

### Locally

Create a `.env` file in this project root with the following settings:

```bash
API_URL=http://the-api-to-consume.example.com
API_KEY=123-456-789
```

To start the proxy simply run:

```bash
node index.js
```

The proxy server is now available on `http://localhost:3000`. You can override the port
by using the `PORT` environment variable.

#### Usage with `hotel`

To use this package with [`hotel`](https://github.com/typicode/hotel/), run the
following command in the project root:

```bash
hotel add 'node index.js --port $PORT' --name proxify --change-origin
```

After starting the server, the page should be available via `http://proxify.dev`

### Production deployment

While usage of this project in a deployment environment is probably not
recommended it's possible to deploy it to a server running
[Dokku](http://dokku.viewdocs.io/dokku/).

```bash
git remote add dokku dokku@my-dokku-host.example.com:proxify
git push dokku master
```

## Background

The project was conceived, while I was trying to consume the RMV API with a
VueJS application. The RMV API expects the API key to be provided inside the URL
as a parameter `?accessId=123-456-789`.

Many thanks to [the blog post of Travis
Horn](https://travishorn.com/creating-a-node-js-proxy-to-secure-your-third-party-api-key-e305f2c951da)
that guided me through the setup of this project.

