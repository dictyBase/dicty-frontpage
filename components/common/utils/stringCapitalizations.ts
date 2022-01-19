/**
 * capitalizeFirstCharacter converts the first character of a string to uppercase.
 */
const capitalizeFirstCharacter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

/**
 * capitalizeEveryWordInString takes a string with spaces (i.e. "other stock centers" and capitalizes each word.
 */
const capitalizeEveryWordInString = (str: string) =>
  str
    .split(" ")
    .map((item) => capitalizeFirstCharacter(item))
    .join(" ")

export { capitalizeEveryWordInString, capitalizeFirstCharacter }
