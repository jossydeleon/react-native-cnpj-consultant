import moment from "moment";

/**
 * Capitalize first letter of each work
 * @param str text to transform
 * @returns text transformed
 */
export function capitalize(str: string) {
  return str
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

/**
 * Format date into human readable format
 * @param date date in string | date format
 * @returns date in human readable format
 */
export function parseDate(date: Date | string) {
  return moment(date).format("MMM DD, YYYY, hh:mm a");
}

/**
 * Parse string o number into a us dollar currency
 * @param str number without format
 * @returns string formatted as a dollar currency
 */
export function toDollarCurrency(amount: string | number) {
  if (typeof amount === "number") {
    return `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  } else {
    return `$${Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  }
}

/**
 * Split phone numbers if has '/' delimiter
 * @param str phone number string
 * @returns array of strings with numbers
 */
export function splitPhoneNumber(str: string) {
  return str.split("/").map((st) => st.trim());
}

/**
 * Validate string with regex
 * @param str string to be validated
 * @returns
 */
export function validation(str: string) {
  var pattern = new RegExp(/^[0-9\b]+$/);

  if (!pattern.test(str)) {
    //alert("CNPJ number is invalid");
    return { error: true, message: "CNPJ number is invalid" };
  } else if (str.length !== 14) {
    return { error: true, message: "CNPJ number needs to be 14 digits" };
  } else {
    return { error: false, message: "OK" };
  }
}
