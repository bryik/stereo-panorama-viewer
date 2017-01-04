
## Overunder Panorama Viewer

<p align="center">
  <img width="50%" src="http://i.imgur.com/yr88MXS.gif"/>
</p>

This is a utility for viewing over/under stereo panoramas on the web. Primary focus is on [Ansel](http://www.geforce.com/hardware/technology/ansel), but any panorama in the over/under format should work (e.g. [converted](https://storage.googleapis.com/cardboard-camera-converter/index.html) Cardboard Camera images).

### API

| Property |      Description      | Default Value |
|:--------:|:---------------------:|:-------------:|
|    N/A   | URL path to the image |      N/A      |

Panoramas are loaded and displayed primarily through the `overunder` component. This component takes one value: a URL (or a selector).

Example:

```html
  <a-assets>
    <img id="witness" src="../assets/witness_painter.jpg">
  </a-assets>
  <!-- Inline style -->
  <a-entity overunder="../assets/witness_painter.jpg"></a-entity>
  <!-- Selector pointing to asset -->
  <a-entity overunder="#witness"></a-entity>
```

Scenes must also have a stereocam.

```html
  <a-camera position="0 0 0" stereocam="eye:left;"></a-camera>
```

### References

See the LICENSE.
