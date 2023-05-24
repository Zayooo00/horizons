export function capitalizeFirstLetterAndLowercaseRest(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function capitalizeFirstLetterOnly(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function convertToLowercase(string) {
  return string.toLowerCase();
}

export function formatLinkPath(string) {
  return string.toLowerCase().replace(/ /g, '-');
}

export function revertFormatLinkPath(string) {
  return string
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
