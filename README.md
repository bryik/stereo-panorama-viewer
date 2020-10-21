# stereo-panorama-viewer

[![Netlify Status](https://api.netlify.com/api/v1/badges/7593898f-a7d9-4896-b275-1a1494290752/deploy-status)](https://app.netlify.com/sites/stereo-panorama-viewer/deploys)

<img alt="A red pond with some UI overlaid" src="https://user-images.githubusercontent.com/12419712/87863325-9b022680-c91f-11ea-94be-1374d0b0824b.png">

View stereoscopic panoramas in your browser!

## usage

- Head to [https://spano.pyrik.dev/](https://spano.pyrik.dev/) to try it out.

### format

Only ["stacked"](https://developers.google.com/vr/discover/360-degree-media#common_formats) panoramas are supported. A "stacked" panorama is composed of two equirectangular-panoramas one on top of the other.

Two sources are:

- [NVIDIA Ansel](https://www.nvidia.com/en-us/geforce/geforce-experience/ansel/)
- Cardboard Camera (after [conversion](https://storage.googleapis.com/cardboard-camera-converter/index.html))

## query parameters

### `url`

Should contain a direct link to a panorama.

Example:

```
https://spano.pyrik.dev/?url=https%3A%2F%2Fi.imgur.com%2FPgAHSy8.jpg
```

### `embedded`

If the querystring contains `embedded`, then all UI will be hidden except for the "Enter VR" button.

Example:

```
https://spano.pyrik.dev/?embedded=&url=https%3A%2F%2Fi.imgur.com%2FPgAHSy8.jpg
```

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

`stereo-panorama-viewer` automatically deploys to Netlify every time a commit is pushed to the `master` branch.

## notes

- This repo used to be called "overunder-aframe". It has been renamed to be more
  descriptive and to refocus on a core feature: displaying stereo panoramas.

### references

- The logo/favicon uses the [photo.svg](https://github.com/tabler/tabler-icons/blob/master/icons/photo.svg) tabler-icon.
