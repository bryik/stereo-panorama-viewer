/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * OverUnder Panorama Viewer component for A-Frame.
 */
AFRAME.registerComponent('overunder', {
  schema: {
    type: 'asset'
  },

  /**
   * Set if component needs multiple instancing.
   */
  multiple: false,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {

    // Texture
    var texture = new THREE.TextureLoader().load( this.data );

    // Material
    var material = new THREE.MeshBasicMaterial();
    material.map = texture;

    // Three group (makes it easier to pause/play/remove)
    var imageSpheres = new THREE.Group();

    //ImageSphere for left eye
    var leftSphere = this.createImageSphere(material, 'left');
    imageSpheres.add(leftSphere)

    //ImageSphere for right eye
    var rightSphere = this.createImageSphere(material, 'right');
    imageSpheres.add(rightSphere)

    this.el.setObject3D('imageSpheres', imageSpheres);

    this.updateTexture = false;  // Flag that determines whether to update image sphere
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    if (this.updateTexture) {
      // There is a new image, so update
      // Get imageSpheres
      var leftSphere = this.el.getObject3D('imageSpheres').children[0];
      var rightSphere = this.el.getObject3D('imageSpheres').children[1];
      // New texture
      var texture = new THREE.TextureLoader().load( this.data );
      texture.anisotropy = 16;
      // Set texture
      leftSphere.material.map = texture;
      rightSphere.material.map = texture;
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
    this.el.removeObject3D('imageSpheres');
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

    var geometry = new THREE.SphereGeometry( 5000, 64, 64 );
    var uvs = geometry.faceVertexUvs[ 0 ];
    var axis = 'y';

    // Display half
    if (side === "left") {
      for (var i = 0; i < uvs.length; i++) {
        for (var j = 0; j < 3; j++) {
          uvs[ i ][ j ][ axis ] *= 0.5;
          uvs[ i ][ j ][ axis ] += 0.5;
        }
      }
    } else {
      for (var i = 0; i < uvs.length; i++) {
        for (var j = 0; j < 3; j++) {
          uvs[ i ][ j ][ axis ] *= 0.5;
        }
      }
    }

    var sphere = new THREE.Mesh( geometry, material );
    sphere.name = (side === "left") ? "leftSphere" : "rightSphere";
    // left eye sees layer 1, right eye sees layer 2
    var layer = (side === "left") ? 1 : 2;
    sphere.layers.set(layer)
    sphere.scale.x = -1;  // like using THREE.Backside but avoids mirroring

    return sphere;
  }
});

/**
 * oscarmarinmiro's stereo component for A-Frame.
 * copied from: https://github.com/oscarmarinmiro/aframe-stereo-component
 */
AFRAME.registerComponent('stereocam', {

  schema: {
    eye: { type: 'string', default: "left"}
  },

   // Cam is not attached on init, so use a flag to do this once at 'tick'

   // Use update every tick if flagged as 'not changed yet'

   init: function(){
      // Flag to register if cam layer has already changed
      this.layer_changed = false;
   },

   tick: function(time){

      var originalData = this.data;

      // If layer never changed

      if(!this.layer_changed){

      // because stereocam component should be attached to an a-camera element
      // need to get down to the root PerspectiveCamera before addressing layers

      // Gather the children of this a-camera and identify types

      var childrenTypes = [];

      this.el.object3D.children.forEach( function (item, index, array) {
          childrenTypes[index] = item.type;
      });

      // Retrieve the PerspectiveCamera
      var rootIndex = childrenTypes.indexOf("PerspectiveCamera");
      var rootCam = this.el.object3D.children[rootIndex];

      if(originalData.eye === "both"){
          rootCam.layers.enable( 1 );
          rootCam.layers.enable( 2 );
        }
        else{
          rootCam.layers.enable(originalData.eye === 'left' ? 1:2);
        }
      }
   }
});
