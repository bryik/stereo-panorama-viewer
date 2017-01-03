
## TODO

- Add a "now-loading" message

- Support regular (non-stereo) panoramas


## aframe-viewer-component

A panorama viewing component for [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.2.0/aframe.min.js"></script>
  <script src="https://rawgit.com//master/dist/aframe-viewer-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity viewer="exampleProp: exampleVal"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-viewer-component
```

Then register and use.

```js
require('aframe');
require('aframe-viewer-component');
```
