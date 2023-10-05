/**
 * Replaces a string by inserting it between the start and end positions provided for a string.
 * @param {string} str - The string to replace a value from
 * @param {number} start - The position to insert at
 * @param {number} end - The position to stop text replacement at
 * @param {string} value - The string to insert
 * @return {string} The string with the replacement string added over the specified start and stop
 */
export function replaceTextBetweenStartAndEndWithNewValue(
	str: string,
	start: number,
	end: number,
	value: string
): string {
	return str.substring(0, start) + value + str.substring(end);
}

// from https://stackoverflow.com/a/52171480/8353749
export function hashString53Bit(str: string, seed: number = 0): number {
	let h1 = 0xdeadbeef ^ seed;
	let h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}

	h1 =
		Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
		Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 =
		Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
		Math.imul(h1 ^ (h1 >>> 13), 3266489909);

	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function getStartOfLineIndex(
	text: string,
	indexToStartFrom: number
): number {
	if (indexToStartFrom == 0) {
		return indexToStartFrom;
	}

	let startOfLineIndex = indexToStartFrom;
	while (startOfLineIndex > 0 && text.charAt(startOfLineIndex - 1) !== "\n") {
		startOfLineIndex--;
	}

	return startOfLineIndex;
}

/**
 * Replace the first instance of the matching search string in the text after the provided starting position.
 * @param {string} text - The text in which to do the find and replace given the starting position.
 * @param {string} search - The text to search for and replace in the provided string.
 * @param {string} replace - The text to replace the search text with in the provided string.
 * @param {number} start - The position to start the replace search at.
 * @return {string} The new string after replacing the value if found.
 */
export function replaceAt(
	text: string,
	search: string,
	replace: string,
	start: number
): string {
	if (start > text.length - 1) {
		return text;
	}

	return (
		text.slice(0, start) +
		text.slice(start, text.length).replace(search, replace)
	);
}

// based on https://stackoverflow.com/a/21730166/8353749
export function countInstances(text: string, instancesOf: string): number {
	let counter = 0;

	for (let i = 0, input_length = text.length; i < input_length; i++) {
		const index_of_sub = text.indexOf(instancesOf, i);

		if (index_of_sub > -1) {
			counter++;
			i = index_of_sub;
		}
	}

	return counter;
}

// based on https://stackoverflow.com/a/175787/8353749
export function isNumeric(str: string) {
	const type = typeof str;
	if (type != "string") return type === "number"; // we only process strings so if the value is not already a number the result is false
	return (
		!isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str))
	); // ...and ensure strings of whitespace fail
}

export function stripCr(text: string) {
	return text.replace(/\r/g, "");
}

/**
 * This function takes in a string and returns an object with key value pairs
 */
export function mapStringToKeyValuePairs(inputString: string) {
	const lines = inputString.split("\n");
	const result: {
		[x: string]: string;
	} = {};

	lines.forEach((line) => {
		const index = line.indexOf(":");
		if (index !== -1) {
			const key = line.slice(0, index).trim();
			const value = line.slice(index + 1).trim();
			if (key && value) result[key] = value;
		}
	});

	return result;
}

export const replaceOccurance = (
	text: string,
	search: string,
	replace: string,
	index: number
) => {
	const parts = text.split(search);

	if (parts.length <= index) {
		return text; // No match found or index out of range, return original text
	}

	let result = parts[0]!;

	for (let i = 1; i < parts.length; i++) {
		result += (i === index ? replace : search) + parts[i];
	}
	return result;
};
