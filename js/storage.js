/**
 * localStorage access that never throws.
 *
 * Private-mode Safari, blocked site data and quota errors all raise on access.
 * The site must render correctly with no stored preference, so every failure
 * degrades to "nothing stored" rather than propagating.
 */

export function readStored(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
