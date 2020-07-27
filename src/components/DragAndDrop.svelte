<script>
  // This component allows the user to drag-and-drop images into their browser
  // window.

  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

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

  // Event handlers.
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

    const droppedFile = event.dataTransfer.files[0];

    dispatch("drop", {
      filename: droppedFile.name,
      objectUrl: URL.createObjectURL(droppedFile)
    });
    document.body.style.opacity = 1;
  }
</script>
