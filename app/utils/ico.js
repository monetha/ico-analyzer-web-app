import { ICORatingUrlPrefix } from '../const/ico';

export function extractICONameFromUrl(icoRatingUrl) {
  if (!icoRatingUrl) {
    return null;
  }

  const url = icoRatingUrl.trim().toLowerCase();

  // Must start with ICO rating url
  if (url.indexOf(ICORatingUrlPrefix) !== 0) {
    return null;
  }

  // Remove ICO rating url prefix
  let name = url.substring(ICORatingUrlPrefix.length);

  // Remove query string if any
  [name] = name.split('?', 1);

  // Remove leading/trailing slashes
  name = name.replace(/^\/+|\/+$/g, '');

  // If extracted name has correct chars
  if (!name.match(/^[a-z0-9_-]*$/g)) {
    return null;
  }

  return name;
}
