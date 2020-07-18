<script>
  // This component contains the A-Frame scene and implements the drag-and-drop
  // feature.

  import { onMount, onDestroy } from "svelte";

  import { remoteUrl } from "../stores.js";

  // Local state
  let scene;
  let panoDisplay;
  // droppedImage is a base64 encoded image populated after a panorama is dragged
  // and dropped.
  let droppedImage;

  onMount(() => {
    // Wait for A-Frame to load before attempting to manipulate the scene.
    if (scene.hasLoaded) {
      start();
    } else {
      scene.addEventListener("loaded", start);
    }
  });
  onDestroy(() => {
    document.removeEventListener("dragover", dragover, false);
    document.removeEventListener("dragenter", dragenter, false);
    document.removeEventListener("dragleave", dragleave, false);
    document.removeEventListener("drop", drop, false);
  });

  function start() {
    // Drag and drop.
    // Based on https://github.com/mrdoob/three.js/blob/master/examples/webgl_panorama_equirectangular.html
    document.addEventListener("dragover", dragover, false);
    document.addEventListener("dragenter", dragenter, false);
    document.addEventListener("dragleave", dragleave, false);
    document.addEventListener("drop", drop, false);
  }

  // Drag-and-drop event handlers.
  function dragover(event) {
    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect = "copy";
  }
  function dragenter(event) {
    event.preventDefault();
    event.stopPropagation();

    // Provides feedback to the user
    document.body.style.opacity = 0.5;
  }
  function dragleave(event) {
    event.preventDefault();
    event.stopPropagation();

    // Reset
    document.body.style.opacity = 1;
  }
  function drop(event) {
    event.preventDefault();
    event.stopPropagation();

    function onImageLoad(event) {
      const image = event.target.result;
      // Dispose old ObjectURL
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      URL.revokeObjectURL(droppedImage);
      droppedImage = image;
      remoteUrl.set(null);
    }

    const reader = new FileReader();
    reader.addEventListener("load", onImageLoad, false);
    reader.readAsDataURL(event.dataTransfer.files[0]);
    document.body.style.opacity = 1;
  }
</script>

<a-scene bind:this={scene}>
  <a-camera position="0 0 0" stereocam="eye:left;" />

  <a-entity
    bind:this={panoDisplay}
    rotation="0 0 0"
    overunder={!$remoteUrl ? droppedImage : $remoteUrl} />
</a-scene>
