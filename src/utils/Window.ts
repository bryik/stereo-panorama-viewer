/**
 * Retrieves and parses the querystring of the Window URL.
 */
export function getQuerystring() {
  const { location } = window;
  return new URLSearchParams(location.search);
}

/**
 * Given an object, updates the Window URL's querystring to match.
 *
 * If the value associated with a key is `null`, that key/value pair will be
 * removed from the Window URL's querystring.
 *
 * For example,
 *
 *  window.location.href = "http://192.168.1.2:8000/?msg=hello"
 *  updateQuerystring({msg: null, user: "Joe"});
 *  // window.location.href is now "http://192.168.1.2:8000/?user=Joe"

 * Based on https://stackoverflow.com/a/56777426/6591491
 */
export function updateQuerystring(dict: { [key: string]: any }): void {
  // Retrieve the current querystring
  const querystring = getQuerystring();

  // Apply key/values from `dict`
  Object.entries(dict).forEach(([key, value]) => {
    if (value === null) {
      querystring.delete(key);
    } else {
      querystring.set(key, value);
    }
  });

  // Replace window.location.url
  const newUrl = `${window.location.pathname}?${querystring.toString()}`;
  window.history.replaceState({}, "", newUrl);
}
