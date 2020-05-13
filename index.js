/* global AFRAME */

if (typeof AFRAME === "undefined") {
  throw new Error(
    "Component attempted to register before AFRAME was available."
  );
}

/**
 * OverUnder Panorama Viewer component for A-Frame.
 */
AFRAME.registerComponent("overunder", {
  schema: {
    type: "asset",
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    var self = this;
    var el = this.el;
    var url = this.data;
    this.updateTexture = false; // Flag that determines whether to update image sphere

    var container = document.createElement("div");
    document.body.appendChild(container);

    var info = document.createElement("div");
    info.style.color = "red";
    info.style.position = "absolute";
    info.style.top = "10px";
    info.style.width = "100%";
    info.style.textAlign = "center";
    info.innerHTML = "Loading!";
    container.appendChild(info);

    // instantiate a loader
    var loader = new THREE.TextureLoader();
    loader.setCrossOrigin("");

    // load a resource
    loader.load(
      // resource URL
      url,
      // Function when resource is loaded
      function (texture) {
        container.removeChild(info);
        // Material
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
        material.map = texture;

        // Three group (makes it easier to pause/play/remove)
        var imageSpheres = new THREE.Group();

        //ImageSphere for left eye
        var leftSphere = self.createImageSphere(material, "left");
        imageSpheres.add(leftSphere);

        //ImageSphere for right eye
        var rightSphere = self.createImageSphere(material, "right");
        imageSpheres.add(rightSphere);

        el.setObject3D("imageSpheres", imageSpheres);
      },
      // Function called when download progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        info.innerHTML = (xhr.loaded / xhr.total) * 100 + "% loaded";
      },
      // Function called when download errors
      function (xhr) {
        console.log("An error happened");
      }
    );
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    var self = this;
    var url = this.data;

    if (this.updateTexture) {
      var container = document.createElement("div");
      document.body.appendChild(container);
      // // There is a new image, so update
      var info = document.createElement("div");
      info.style.color = "red";
      info.style.position = "absolute";
      info.style.top = "10px";
      info.style.width = "100%";
      info.style.textAlign = "center";
      info.innerHTML = "Loading!";
      container.appendChild(info);

      // instantiate a loader
      var loader = new THREE.TextureLoader();

      // load a resource
      loader.load(
        // resource URL
        url,
        // Function when resource is loaded
        function (texture) {
          container.removeChild(info);

          // Get imageSpheres
          var leftSphere = self.el.getObject3D("imageSpheres").children[0];
          var rightSphere = self.el.getObject3D("imageSpheres").children[1];
          texture.anisotropy = 16;

          // Dispose old texture
          leftSphere.material.map.dispose();

          // Set new texture
          leftSphere.material.map = texture;
          rightSphere.material.map = texture;
        },
        // Function called when download progresses
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          info.innerHTML = (xhr.loaded / xhr.total) * 100 + "% loaded";
        },
        // Function called when download errors
        function (xhr) {
          console.log("An error happened");
        }
      );
    } else {
      // No update
      this.updateTexture = true;
    }
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () {
    this.el.removeObject3D("imageSpheres");
  },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Hides imageSpheres.
   */
  pause: function () {
    this.el.object3D.visible = false;
  },

  /**
   * Called when entity resumes.
   * Reveals imageSpheres.
   */
  play: function () {
    this.el.object3D.visible = true;
  },

  /**
   * A helper function that returns an ImageSphere mesh given a material
   * and whether it is meant for the left or right eye.
   */
  createImageSphere: function (material, side) {
    var geometry = new THREE.SphereGeometry(5000, 64, 64);
    var uvs = geometry.faceVertexUvs[0];
    var axis = "y";

    // Display half
    if (side === "left") {
      for (var i = 0; i < uvs.length; i++) {
        for (var j = 0; j < 3; j++) {
          uvs[i][j][axis] *= 0.5;
          uvs[i][j][axis] += 0.5;
        }
      }
    } else {
      for (var i = 0; i < uvs.length; i++) {
        for (var j = 0; j < 3; j++) {
          uvs[i][j][axis] *= 0.5;
        }
      }
    }

    var sphere = new THREE.Mesh(geometry, material);
    sphere.name = side === "left" ? "leftSphere" : "rightSphere";
    // left eye sees layer 1, right eye sees layer 2
    var layer = side === "left" ? 1 : 2;
    sphere.layers.set(layer);
    sphere.scale.x = -1; // like using THREE.Backside but avoids mirroring

    return sphere;
  },
});

/**
 * oscarmarinmiro's stereo component for A-Frame.
 * copied from: https://github.com/oscarmarinmiro/aframe-stereo-component
 */
AFRAME.registerComponent("stereocam", {
  schema: {
    eye: { type: "string", default: "left" },
  },

  // Cam is not attached on init, so use a flag to do this once at 'tick'

  // Use update every tick if flagged as 'not changed yet'

  init: function () {
    // Flag to register if cam layer has already changed
    this.layer_changed = false;
  },

  tick: function (time) {
    var originalData = this.data;

    // If layer never changed

    if (!this.layer_changed) {
      // because stereocam component should be attached to an a-camera element
      // need to get down to the root PerspectiveCamera before addressing layers

      // Gather the children of this a-camera and identify types

      var childrenTypes = [];

      this.el.object3D.children.forEach(function (item, index, array) {
        childrenTypes[index] = item.type;
      });

      // Retrieve the PerspectiveCamera
      var rootIndex = childrenTypes.indexOf("PerspectiveCamera");
      var rootCam = this.el.object3D.children[rootIndex];

      if (originalData.eye === "both") {
        rootCam.layers.enable(1);
        rootCam.layers.enable(2);
      } else {
        rootCam.layers.enable(originalData.eye === "left" ? 1 : 2);
      }
    }
  },
});
