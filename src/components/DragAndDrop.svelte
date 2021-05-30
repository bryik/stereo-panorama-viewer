<script>
  /**
   * This component allows the user to drag-and-drop files into their browser
   * window.
   */

  import { onMount, onDestroy } from "svelte";

  // API
  export let fileUploadHandler;

  function dragover(event) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  }

  function dragenter(event) {
    event.preventDefault();
    event.stopPropagation();
    // Make the <body/> visibly change when a file is dragged into the window.
    document.body.style.opacity = 0.5;
  }

  function dragleave(event) {
    event.preventDefault();
    event.stopPropagation();
    // Return the <body/> to normal when a file is dragged outside of the window.
    document.body.style.opacity = 1;
  }

  function drop(event) {
    event.preventDefault();
    event.stopPropagation();

    const droppedFile = event.dataTransfer.files[0];

    const newPanoUrl = URL.createObjectURL(droppedFile);
    const newFilename = droppedFile.name;
    fileUploadHandler({ newPanoUrl, newFilename });

    // Return the <body/> to normal after a file is dropped.
    document.body.style.opacity = 1;
  }

  onMount(() => {
    // Drag and drop.
    // Based on https://github.com/mrdoob/three.js/blob/master/examples/webgl_panorama_equirectangular.html
    document.addEventListener("dragover", dragover, false);
    document.addEventListener("dragenter", dragenter, false);
    document.addEventListener("dragleave", dragleave, false);
    document.addEventListener("drop", drop, false);
  });
  onDestroy(() => {
    document.removeEventListener("dragover", dragover, false);
    document.removeEventListener("dragenter", dragenter, false);
    document.removeEventListener("dragleave", dragleave, false);
    document.removeEventListener("drop", drop, false);
  });

</script>
