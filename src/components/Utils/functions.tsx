/**
 * Slices a given text to a specified maximum length and appends ellipsis ("...")
 * if the text exceeds the maximum length.
 *
 * @param {string} txt - The input text to be sliced.
 * @param {number} [max=50] - The maximum length of the text before slicing. Defaults to 120.
 * @returns The sliced text with ellipsis if it exceeds the maximum length,
 *          otherwise the original text.
 */

export function txtSlicer(txt: string, max: number = 50) {
  if (txt.length > max) {
    return `${txt.slice(0, max)}...`;
  }
  return txt;
}
