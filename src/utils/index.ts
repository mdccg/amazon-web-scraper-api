/**
 * 
 * @param {string} string "09,75"
 * @returns {number} 9.75
 * 
 * @param {string} string "2.147.483.748"
 * @returns {number} 2147483748
 */
export const parseNumber = (string: string): number => Number(
  string
    .replace(/\./g, '')
    .replace(',', '.')
);