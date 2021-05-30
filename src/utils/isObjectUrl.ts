/**
 * Returns `true` if a given string is an objectURL. Otherwise returns `false`
 */
export default function isObjectUrl(url: string): boolean {
  if (!url) {
    return false;
  }
  // Is there a better way?
  return url.substring(0, 4) === "blob";
}
