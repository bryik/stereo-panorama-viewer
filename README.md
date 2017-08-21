
## Overunder Panorama Viewer

<p align="center">
  <img width="50%" src="https://i.imgur.com/yr88MXS.gif"/>
</p>

This is a set of utilities for viewing over/under stereo panoramas on the web and locally (without having to pay for Virtual Desktop!). Primary focus is on [Ansel](http://www.geforce.com/hardware/technology/ansel), but any panorama in the over/under format should work (e.g. [converted](https://storage.googleapis.com/cardboard-camera-converter/index.html) Cardboard Camera images).

### Overunder Component API

| Property |      Description      | Default Value |
|:--------:|:---------------------:|:-------------:|
|    N/A   | URL path to the image |      N/A      |

Panoramas are loaded and displayed primarily through the `overunder` component. This component takes one value: a URL (or a selector).

Example:

```html
  <a-entity overunder="../assets/witness_painter.jpg"></a-entity>
```

Currently there is no integration with A-Frame's asset management system. See [this issue](https://github.com/bryik/overunder-aframe/issues/5).

Scenes must also have a stereocam.

```html
  <a-camera position="0 0 0" stereocam="eye:left;"></a-camera>
```

### References

See the LICENSE.
