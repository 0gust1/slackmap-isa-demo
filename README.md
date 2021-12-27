# Slackmap rework - front-end draft

## Intro / context

This is a first attempt to explore the rewrite of the Slackmap frontend. At the moment, this is only a technical proof of concept.

There is the beginning of an app shell, with various components, that will need to be enriched and implemented when the slackmap rework roadmap will be clearer.

This front-end uses the existing data from the slackmap API, and at the moment, only displays the map, the clusters of spots and the spots.

### What's next ?

This tehcnical POC enabled me to: 
- start a reverse-engineering of the existing slackmap API
- take a first look at the backend technical stack of the existing slackmapAPI
- do a review and first benchmark of geodata cloud solution providers
- envision the first steps of a rework of the slackmap application

Now, we should discuss with the ISA and related volounteers:
- the current status of the project
- the structuring technical choices : IAM (Identity and Access Management), data persistence/storage
- the roadmap
- the features expected and their scopes in the roadmap

All of this with the guiding principles:
- openeness
- resiliency/durability


I have a lot of recommendations and proposals, but we must discuss together.

### Architecture:

This project is: 
- a front-end UI 
- a ultra-thin backend layer acting as a proxy to the current slackmap API (mostly to abstract out the slackmap API and avoid CORS issues with the front-end app).

As the user pans and zooms the interactive map component, XHR requests are issued to the thin backend (which in turn queries the existing slackmap API) querying clusters of slackline spots or spots, depending on the current map zoom level.

### Technical stack:
This current project uses:
- Sveltekit (and Svelte)
- typescript
- tailwindcss
- leaflet
- for the map tiles & cartographic info : cartoDB, ESRI and OpenStreetMap data

This demo is currently deployed using Vercel, at https://slackmap-isa-demo-0gust1.vercel.app

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.
