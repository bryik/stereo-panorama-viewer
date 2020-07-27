<script>
  // This component contains an A-Frame scene that renders a stereo panorama
  // at a given URL.

  // API
  export let panoUrl = "https://i.imgur.com/PgAHSy8.jpg";
</script>

<a-scene>
  <a-camera position="0 0 0" stereocam="eye:left;" />

  <a-entity rotation="0 0 0" overunder={panoUrl} />
</a-scene>
