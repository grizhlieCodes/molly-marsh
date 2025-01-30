export const getBreakpointOptions = (optionsObject, def, mm, lm, md, lg) => {
	// console.log(optionsObject, def, mm, lm, md, lg);
	let blokFieldType = null,
		classes;
	if (typeof def === 'object') blokFieldType = 'slider';
	if (typeof def === 'string') blokFieldType = 'select';

	if (blokFieldType === 'select') {
		classes = {
			def: def !== null && def !== undefined && def && def.length > 0 ? optionsObject.def[def] : '',
			mm: mm !== null && mm !== undefined && mm && mm.length > 0 ? optionsObject.mm[mm] : '',
			lm: lm !== null && lm !== undefined && lm && lm.length > 0 ? optionsObject.lm[lm] : '',
			md: md !== null && md !== undefined && md && md.length > 0 ? optionsObject.md[md] : '',
			lg: lg !== null && lg !== undefined && lg && lg.length > 0 ? optionsObject.lg[lg] : ''
		};
	} else if (blokFieldType === 'slider') {
		classes = {
			def: def !== null && def !== undefined && def && def !== 'none' ? optionsObject.def[def.value] : '',
			mm: mm !== null && mm !== undefined && mm && mm !== 'none' ? optionsObject.mm[mm.value] : '',
			lm: lm !== null && lm !== undefined && lm && lm !== 'none' ? optionsObject.lm[lm.value] : '',
			md: md !== null && md !== undefined && md && md !== 'none' ? optionsObject.md[md.value] : '',
			lg: lg !== null && lg !== undefined && lg && lg !== 'none' ? optionsObject.lg[lg.value] : ''
		};
	}

	if (classes) {
		return Object.values(classes).join(' ').trim().replace('  ', ' '); //lazy fix for double spacing...
	} else {
		return '';
	}
};
