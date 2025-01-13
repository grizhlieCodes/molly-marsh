/**
 * Finds the index of the largest number in an array
 * @param {number[]} arr - Array of numbers to search
 * @returns {number} Index of the largest value, or -1 if array is empty
 */
export const indexOfMax = (arr) => {
	if (arr.length === 0) {
		return -1;
	}

	var max = arr[0];
	var maxIndex = 0;

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			maxIndex = i;
			max = arr[i];
		}
	}

	return maxIndex;
};

/**
 * Generates a UUID v4 (random) string
 * @returns {string} UUID in format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export const generateUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

/**
 * Creates a breadcrumb navigation array from a URL path
 * @param {string} newUrl - URL path to convert (e.g., "/blog/post-title")
 * @returns {Array<{text: string, link: string}>} Array of breadcrumb objects with text and cumulative links
 */
export const generateBreadcrumbs = (newUrl) => {
	const splitUrl = newUrl.split(/(?=\/)/);

	const result = [];
	splitUrl.forEach((link, index) => {
		let linkData = { text: '', link: '' };
		const trimmedLink = link
			.slice(1)
			.replaceAll('-', ' ')
			.split(' ')
			.map((x) => x.charAt(0).toUpperCase() + x.slice(1))
			.join(' ')
			.replace(',', ' ');
		linkData.text = trimmedLink;

		for (let i = 0; i <= index; i++) {
			linkData.link = linkData.link + splitUrl[i];
		}
		result.push(linkData);
	});

	return result;
};

/**
 * Serializes non-Plain Old JavaScript Objects (non-POJOs) into a serializable format
 * using structuredClone for deep copying
 *
 * @param {object | null} value - The object to be serialized
 * @returns {object | null} A serializable deep clone of the input object
 *
 * @example
 * // Serializing a complex object with methods or non-serializable properties
 * const complexObj = { date: new Date(), method: () => {} };
 * const serialized = serializeNonPOJOs(complexObj);
 * // Result: { date: "2024-01-12T00:00:00.000Z" }
 */
export const serializeNonPOJOs = (value: object | null) => {
	return structuredClone(value);
};

// =================================================
// Below was used in Adie's website for various date-rendering logic

// Content Organization Utilities
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Adds appropriate suffix to a day number (1st, 2nd, 3rd, etc.)
 * @param {number} day - Day of the month (1-31)
 * @returns {string} Day with appropriate suffix
 * @throws {Error} If day is not between 1 and 31
 */
function addDaySuffix(day) {
	if (day > 31 || day < 1) {
		throw new Error('Day must be between 1 and 31');
	}

	const suffixes = ['th', 'st', 'nd', 'rd'];
	const value = day % 100;

	return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}

/**
 * Initializes year-based structure for notes organization
 * @param {Array} notesArray - Array of note objects with content.date
 * @param {Array} targetArray - Array to populate with year-based structure
 */
const addNotesYears = (notesArray, targetArray) => {
	let allNoteYears = [...new Set(notesArray.map((n) => new Date(n.content.date).getFullYear()))];
	allNoteYears.forEach((y) => {
		targetArray.push({
			year: y,
			months: months
				.slice()
				.reverse()
				.map((month) => ({ month, articles: [] }))
		});
	});
};

/**
 * Organizes notes into their respective year and month buckets
 * @param {Array} notesArray - Array of note objects with content.date
 * @param {Array} targetArray - Structured array of years and months to populate
 */
const addMonthsToYears = (notesArray, targetArray) => {
	notesArray.forEach((note) => {
		const noteDate = new Date(note.content.date);
		const noteYear = noteDate.getFullYear();
		const targetYearIndex = targetArray.findIndex((target) => target.year === noteYear);
		const noteMonthName = months[noteDate.getMonth()];
		const targetMonthIndex = targetArray[targetYearIndex].months.findIndex(
			(month) => month.month === noteMonthName
		);

		const noteDay = noteDate.getDate();
		const suffix = addDaySuffix(noteDay);
		targetArray[targetYearIndex].months[targetMonthIndex].articles.push({ ...note, suffix });
	});
};

/**
 * Sorts years in ascending or descending order
 * @param {'newest'|'oldest'} orderBy - Sort direction
 * @param {Array} targetArray - Array of year objects to sort
 */
const orderNoteYears = (orderBy, targetArray) => {
	targetArray.sort((a, b) => (orderBy === 'newest' ? b.year - a.year : a.year - b.year));
};

/**
 * Sorts notes within each month by date (newest first)
 * @param {Array} targetArray - Structured array of years and months
 */
const orderNotesInMonthsByNewestNote = (targetArray) => {
	targetArray.forEach((year) => {
		year.months.forEach((month) => {
			month.articles.sort((a, b) => {
				return new Date(b.content.date).getDate() - new Date(a.content.date).getDate();
			});
		});
	});
};

/**
 * Organizes content into a hierarchical structure by year and month
 * @param {Array} contentArray - Array of content items with dates
 * @param {Array} outputArray - Array to populate with organized content
 */
export const organiseWrittenContent = (contentArray, outputArray) => {
	addNotesYears(contentArray, outputArray);
	addMonthsToYears(contentArray, outputArray);
	orderNoteYears('newest', outputArray);
	orderNotesInMonthsByNewestNote(outputArray);
};

/**
 * Formats a date string into DD-MMM-YYYY format
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date (e.g., "15-Jan-2024")
 */
export function formatNoteDate(dateString) {
	const date = new Date(dateString);
	const day = date.getDate();
	const year = date.getFullYear();
	const month = months[date.getMonth()];

	return `${day}-${month}-${year}`;
}
