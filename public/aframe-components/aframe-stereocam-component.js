/* global AFRAME */

if (typeof AFRAME === "undefined") {
  throw new Error(
    "Component attempted to register before AFRAME was available."
  );
}

/**
 * A modified version of oscarmarinmiro's stereo component for A-Frame.
 * copied from: https://github.com/oscarmarinmiro/aframe-stereo-component
 */
AFRAME.registerComponent("stereocam", {
  schema: {
    eye: { type: "string", default: "left" },
  },

  update: function (oldData) {
    const data = this.data;
    const el = this.el;

    const camera = el.object3D.children.find(
      (c) => c.type === "PerspectiveCamera"
    );

    if (!camera) {
      console.warn("stereocam could not find PerspectiveCamera");
      return;
    }

    if (data.eye === "both") {
      camera.layers.enable(1);
      camera.layers.enable(2);
    } else {
      camera.layers.enable(data.eye === "left" ? 1 : 2);
    }
  },
});
