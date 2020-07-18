<script>
  // This component explains how to use the app and provides a way to enter
  // direct links to panoramas.

  import GithubCorner from "./GithubCorner.svelte";
  import { remoteUrl } from "../stores.js";

  // API
  export let visible = true;

  // Local state
  let urlInputValue = "";
  let minimized = false;
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

  function toggleMinimized() {
    minimized = !minimized;
  }

  function handleLoadClick() {
    remoteUrl.set(urlInputValue);
  }
</script>

<style>
  .instructions {
    position: absolute;
    z-index: 10;
    left: 1rem;
    top: 1rem;
  }

  button {
    border: none;
  }

  summary {
    cursor: pointer;
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
      on:submit|preventDefault={handleLoadClick}
      class="instructions avenir ma3 pa3 bg-near-white br3 shadow-4">
      <GithubCorner repoUrl="https://github.com/bryik/overunder-aframe" />
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
          {#if url === $remoteUrl}
            <p
              class="f5 lh-copy ml3 b"
              style="cursor: pointer"
              on:click={() => {
                urlInputValue = url;
                handleLoadClick();
              }}>
              {label}
            </p>
          {:else}
            <p
              class="f5 lh-copy ml3"
              style="cursor: pointer"
              on:click={() => {
                urlInputValue = url;
                handleLoadClick();
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
        id="load-button"
        class="f6 link dim br2 ph3 pv2 mb2 dib white bg-near-black"
        style="cursor: pointer;"
        type="submit">
        Load
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
