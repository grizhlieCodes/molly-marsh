export function deepFind(data, predicate, visited = new Set()) {
	// Check for null or non-object values
	if (data === null || typeof data !== 'object') {
		return predicate(data) ? data : undefined;
	}

	// Avoid circular references
	if (visited.has(data)) return undefined;
	visited.add(data);

	// If data itself matches, return it.
	if (predicate(data)) return data;

	// If it's an array, iterate over the items.
	if (Array.isArray(data)) {
		for (const item of data) {
			const found = deepFind(item, predicate, visited);
			if (found !== undefined) return found;
		}
	} else {
		// It's an object: iterate over its values.
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const found = deepFind(data[key], predicate, visited);
				if (found !== undefined) return found;
			}
		}
	}

	// If nothing found, return undefined.
	return undefined;
}

export function deepFindAll(data, predicate, visited = new Set(), results = []) {
	if (data === null || typeof data !== 'object') {
		if (predicate(data)) {
			results.push(data);
		}
		return results;
	}

	if (visited.has(data)) return results;
	visited.add(data);

	if (predicate(data)) {
		results.push(data);
	}

	if (Array.isArray(data)) {
		for (const item of data) {
			deepFindAll(item, predicate, visited, results);
		}
	} else {
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				deepFindAll(data[key], predicate, visited, results);
			}
		}
	}

	return results;
}
