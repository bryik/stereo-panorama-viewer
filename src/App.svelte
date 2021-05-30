<script lang="ts">
  import { onMount } from "svelte";

  import Instructions from "./components/Instructions.svelte";
  import Scene from "./components/Scene.svelte";
  import DragAndDrop from "./components/DragAndDrop.svelte";
  import * as Window from "./utils/Window";
  import isObjectUrl from "./utils/isObjectUrl.js";

  /**
   * Represents a URL to a stereo panorama image.
   * Can be:
   *   - a direct link to a remote image (e.g. "https://i.imgur.com/PgAHSy8.jpg")
   *   - an objectURL to a local image (happens when a user uploads an image)
   */
  type PanoUrl = string | null;
  let panoUrl: PanoUrl = null;

  // The name of the uploaded image.
  let filename: string | null = null;

  // Controls the visibility of the <Instructions/>
  let instructionsVisible = true;

  onMount(async () => {
    // Read and apply settings from querystring.
    const querystring = Window.getQuerystring();

    if (querystring.has("embedded")) {
      // Hide instructions to make the UI less cluttered.
      instructionsVisible = false;
    }

    if (querystring.has("url")) {
      panoUrl = querystring.get("url");
    } else {
      // No URL provided in the querystring, so show a default panorama.
      panoUrl = "https://i.imgur.com/PgAHSy8.jpg";
    }
  });

  interface fileUploadHandlerParams {
    newPanoUrl: string;
    newFilename?: string;
    shouldUpdateQuerystring?: string;
  }
  const fileUploadHandler = ({
    newPanoUrl,
    newFilename,
    shouldUpdateQuerystring,
  }: fileUploadHandlerParams) => {
    // Update panoUrl
    if (isObjectUrl(panoUrl)) {
      // The current panoUrl is an ObjectURL, so dispose of it.
      URL.revokeObjectURL(panoUrl);
    }
    panoUrl = newPanoUrl;

    // Update filename
    // If no newFilename is provided, then reset to `null`.
    filename = newFilename ?? null;

    // Update Window querystring
    if (shouldUpdateQuerystring) {
      Window.updateQuerystring({ url: panoUrl });
    }
  };

</script>

<DragAndDrop {fileUploadHandler} />
<Instructions
  {panoUrl}
  {filename}
  visible={instructionsVisible}
  {fileUploadHandler}
/>
<Scene {panoUrl} />
