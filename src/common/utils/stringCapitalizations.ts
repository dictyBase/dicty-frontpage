/**
 * capitalizeFirstCharacter converts the first character of a string to uppercase.
 */
const capitalizeFirstCharacter = (string_: string) =>
  string_.charAt(0).toUpperCase() + string_.slice(1)

/**
 * capitalizeEveryWordInString takes a string with spaces (i.e. "other stock centers" and capitalizes each word.
 */
const capitalizeEveryWordInString = (string_: string) =>
  string_
    .split(" ")
    .map((item) => capitalizeFirstCharacter(item))
    .join(" ")

export { capitalizeEveryWordInString, capitalizeFirstCharacter }
