# stereo-panorama-viewer

View stereoscopic panoramas in your browser!

## local development

Install the dependencies...

```bash
cd stereo-panorama-viewer
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see the app running.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## building

To create an optimised version of the app:

```bash
npm run build
```

## deployment

`stereo-panorama-viewer` automatically deploys to GitHub Pages every time a commit is pushed to the `master` branch.

## notes

- This repo used to be called "overunder-aframe". It has been renamed to be more
  descriptive and to refocus on a core feature: displaying stereo panoramas.
