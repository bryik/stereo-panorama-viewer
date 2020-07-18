export function getQuerystring() {
  const { location } = window;
  return new URLSearchParams(location.search);
}

/**
 * Updates the querystring.
 * Based on https://stackoverflow.com/a/56777426/6591491
 * @param {Object} dict - The key/values in this object will become the key/values of the
 *  querystring. e.g. {msg: "hello"} => http://192.168.1.2:8000/?msg=hello
 *  If a value is null, the key will be removed from the querystring.
 * @returns {undefined}
 */
export function updateQuerystring(dict) {
  const { location } = window;
  const querystring = new URLSearchParams(location.search);

  // Update
  Object.entries(dict).forEach(([key, value]) => {
    if (value === null) {
      querystring.delete(key);
    } else {
      querystring.set(key, value);
    }
  });

  // Set
  const newUrl = `${location.pathname}?${querystring.toString()}`;
  window.history.replaceState({}, "", newUrl);
}
