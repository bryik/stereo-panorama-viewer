<script>
  import { onMount } from "svelte";

  import Instructions from "./components/Instructions.svelte";
  import Scene from "./components/Scene.svelte";
  import DragAndDrop from "./components/DragAndDrop.svelte";
  import { getQuerystring, updateQuerystring } from "./utils/querystring.js";
  import isObjectUrl from "./utils/isObjectUrl.js";

  // If true, the instructions will be hidden.
  let instructionsVisible = true;
  let filename = null;
  let panoUrl = null;

  onMount(async () => {
    // Read and apply settings from querystring.
    const querystring = getQuerystring();

    if (querystring.has("url")) {
      // If the querystring contains a url to a panorama, update panoUrl.
      panoUrl = querystring.get("url");
    } else {
      // Navigate to the default pano.
      // No need to update the querystring, I prefer a clean URL for the home
      // page.
      panoUrl = "https://i.imgur.com/PgAHSy8.jpg";
    }

    if (querystring.has("embedded")) {
      // If the querystring contains 'embedded', hide instructions to make it
      // look less cluttered.
      instructionsVisible = false;
    }
  });

  /**
   * <DragAndDrop /> emits a "drop" event whenever a file is dropped into the
   * browser window. event.detail consists of
   *  {filename, objectUrl}
   */
  function handleImageUpload(event) {
    const { detail } = event;
    filename = detail.filename;

    if (isObjectUrl(panoUrl)) {
      URL.revokeObjectURL(panoUrl);
      updateQuerystring({ url: null });
    }
    panoUrl = detail.objectUrl;
  }

  function handleUrlSubmission(event) {
    const { detail } = event;
    filename = null;

    if (isObjectUrl(panoUrl)) {
      URL.revokeObjectURL(panoUrl);
    }
    panoUrl = detail.url;
    updateQuerystring({ url: detail.url });
  }
</script>

<DragAndDrop on:drop={handleImageUpload} />
<Instructions
  {panoUrl}
  {filename}
  visible={instructionsVisible}
  on:upload={handleImageUpload}
  on:submission={handleUrlSubmission} />
<Scene {panoUrl} />
