export default function isObjectUrl(url) {
  if (!url) {
    return false;
  }
  // Is there a better way?
  return url.substring(0, 4) === "blob";
}
