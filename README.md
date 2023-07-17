# inlang demonstration repository

This repository demonstrates a simple application that uses inlang.

- [inlang.config.js](./inlang.config.js) - The inlang configuration file.
- [resources](./resources/) - The resources are stored as JSON.
- [src](./src/) - The source code of the application.

## The Badge for more Visibilty in the Readme

You can quickly integrate this badge into your readme file. This creates more visibility for missing translations in your community.

- read more about [the badge](https://inlang.com/documentation/badge)

[![translation badge](https://inlang.com/badge?url=github.com/inlang/example)](https://inlang.com/editor/github.com/inlang/example?ref=badge)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
