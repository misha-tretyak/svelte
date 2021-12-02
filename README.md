# Replace HASURA Credentials

Path: svelte_test/src/apollo.js

Replace HASURA Secret Key in headers and Hasura API in wsLink and httpLink.

# Challenge App

You have a json file with following structure (example)

```json
[
  { 
    "id": 1,
    "title": "Hello",
    "description": "World"
  },
  { 
    "id": 2,
    "title": "Hello 2",
    "description": "World 2"
  },
  { 
    "id": 3,
    "title": "Hello 3",
    "description": "World 3"
  }
]
```

Create app using postgres, hasura, and nextjs | sveltekit

Postgres must contain only 1 table `long_tails` with fields `tail` as string and `json_id` as number, with data like

```csv
tail, json_id
best-hello-ever, 1
best-hello-world-ever, 2
best-world-ever, 3
```

_`json_id` is 1-1 relation to json at top_

I want accessing app at `localhost:3000/{tail}` i.e. (`localhost:3000/best-hello-ever` etc)
to see the `title` and `description` on the screen.

- I want to see changes on my screen if I edit json and reload the page.
- Web app above must use only 1 fetch to hasura and only to hasura (no other fetches are allowed).
- App above must be reproducible on linux and mac machines, don't use clouds and must be easy to setup (1 command).
- App must have good dev experience (i.e. all that modern hot reloads etc)
- You must think about json above that it can be placed anywhere not only on local file system.

## Output we need

github repository with app above, and instructions how we can setup/work with app on local env.

## Bonus point

If you would depoy it anywhere and provide a link to app (deploy must be documented/configured too)



## Get started

Install the dependencies...

```bash
cd ChallengeApp-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

If you want to use `baseUrl` or `path` aliases within your `tsconfig`, you need to set up `@rollup/plugin-alias` to tell Rollup to resolve the aliases. For more info, see [this StackOverflow question](https://stackoverflow.com/questions/63427935/setup-tsconfig-path-in-svelte).

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
