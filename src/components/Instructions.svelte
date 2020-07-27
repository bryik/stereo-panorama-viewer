<script>
  // This component explains how to use the app and provides a way to enter
  // direct links to panoramas.

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import GithubCorner from "./GithubCorner.svelte";
  import isObjectUrl from "../utils/isObjectUrl.js";

  // API
  export let visible = true;
  export let panoUrl = null;
  export let filename = null;

  // Local state
  let minimized = false;
  let urlInputValue = "";
  const examples = [
    {
      url: "https://i.imgur.com/PgAHSy8.jpg",
      label: "Red pond (The Witness)"
    },
    {
      url: "https://i.imgur.com/xLc3Kj7.jpg",
      label: "Reaching out (The Witness)"
    },
    {
      url: "https://i.imgur.com/xlrCeyV.jpg",
      label: "Kaer Morhen Balcony (Witcher 3)"
    },
    {
      url: "https://i.imgur.com/hD2QXlF.jpg",
      label: "Mount Kilimanjaro (real life)"
    }
  ];

  $: {
    // Reset url input when a panorama is drag-and-dropped or uploaded.
    if (isObjectUrl(panoUrl)) {
      urlInputValue = "";
    } else {
      // A remote URL has been loaded, so update url input to reflect this.
      urlInputValue = panoUrl;
    }
  }

  function toggleMinimized() {
    minimized = !minimized;
  }

  function handleFormSubmit() {
    dispatch("submission", {
      url: urlInputValue
    });
  }

  function handleFileUpload(event) {
    const uploadedFile = event.target.files[0];
    const fileObjectUrl = URL.createObjectURL(uploadedFile);
    dispatch("upload", {
      filename: uploadedFile.name,
      objectUrl: fileObjectUrl
    });
  }

  function handleFileClick() {
    const fileInput = document.getElementById("file-upload");
    fileInput.click();
  }
</script>

<style>
  .instructions {
    position: absolute;
    z-index: 10;
    top: 1rem;
  }

  button {
    border: none;
  }

  summary {
    cursor: pointer;
  }

  @media screen and (min-width: 30em) {
    .instructions {
      left: 1rem;
    }
  }
</style>

<div style={!visible && `display: none`}>
  {#if minimized}
    <div
      class="instructions glow br2 ph3 pv2 mb2 dib bg-near-white fr o-20"
      style="cursor: pointer;"
      on:click={toggleMinimized}>
      ...
    </div>
  {:else}
    <form
      on:submit|preventDefault={handleFormSubmit}
      class="instructions avenir ma3 pa3 bg-near-white br3 shadow-4">
      <GithubCorner repoUrl="https://github.com/bryik/stereo-panorama-viewer" />
      <h1 class="f4 f3-ns lh-title">Stereo Panorama Viewer</h1>
      <p class="lh-copy f5 measure">
        Drag and drop a
        <a
          href="https://developers.google.com/vr/discover/360-degree-media#common_formats">
          stacked
        </a>
        (over/under) stereo panorama into this window. Alternatively, provide a
        URL below.
      </p>

      <details>
        <summary class="f5 lh-copy">Examples</summary>
        {#each examples as { url, label }, i}
          {#if url === panoUrl}
            <p
              class="f5 lh-copy ml3 b"
              style="cursor: pointer"
              on:click={() => {
                urlInputValue = url;
                handleFormSubmit();
              }}>
              {label}
            </p>
          {:else}
            <p
              class="f5 lh-copy ml3"
              style="cursor: pointer"
              on:click={() => {
                urlInputValue = url;
                handleFormSubmit();
              }}>
              {label}
            </p>
          {/if}
        {/each}
      </details>

      <div class="pa3 black-80">
        <div class="measure-narrow">
          <label for="pano-url" class="f6 b db mb2">URL</label>
          <input
            class="input-reset ba b--black-20 pa2 mb2 dib w-100"
            type="url"
            id="pano-url"
            aria-describedby="pano-desc"
            bind:value={urlInputValue}
            placeholder="https://i.imgur.com/xLc3Kj7.jpg"
            required />
          <small id="pano-desc" class="f6 lh-copy black-60 db mb2">
            Must be a direct link to a stereo panorama hosted on a CORS-enabled
            host (e.g. Imgur).
          </small>
        </div>
      </div>
      <button
        class="f6 link dim br2 ph3 pv2 mb2 dib white bg-near-black"
        style="cursor: pointer;"
        type="submit">
        Go
      </button>
      <!--
        This is a hack to reset the <input> when panoUrl is set.
        Without this, an uploaded file persists even after the user enters a
        URL; if the same file is uploaded again, nothing happens because the
        <input> doesn't change.

        Here are the steps to reproduce the bug:
          1) Comment out the if/else
          2) Add a single <input> (e.g. from the 'if' case)
          3) Run the app
          4) Click the 'Upload' button and upload a panorama
          5) Click any example
          6) Click the 'Upload' button and upload the same panorama from (4)

        What should happen: the uploaded panorama should be displayed

        What actually happens: the panorama does not change
      -->
      {#if !isObjectUrl(panoUrl)}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          on:change={handleFileUpload}
          style="display:none"
          value="" />
      {:else}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          on:change={handleFileUpload}
          style="display:none"
          value="" />
      {/if}
      <button
        id="upload-button"
        class="f6 link dim br2 ph3 pv2 mb2 dib white bg-near-black"
        style="cursor: pointer;"
        type="button"
        on:click={handleFileClick}>
        {filename ? filename : 'Upload'}
      </button>

      <button
        id="close-button"
        type="button"
        class="f6 link dim br2 ph3 pv2 mb2 dib white bg-red fr"
        style="cursor: pointer;"
        on:click={toggleMinimized}>
        Close
      </button>
    </form>
  {/if}
</div>
