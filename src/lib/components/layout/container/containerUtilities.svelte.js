export const getBreakpointOptions = (optionsObject, def, mm, lm, md, lg) => {
	let blokFieldType = null,
		classes;
	if (typeof def === 'object') blokFieldType = 'slider';
	if (typeof def === 'string') blokFieldType = 'select';

	if (blokFieldType === 'select') {
		classes = {
			def: def && def.length > 0 ? optionsObject.def[def] : '',
			mm: mm && mm.length > 0 ? optionsObject.mm[mm] : '',
			lm: lm && lm.length > 0 ? optionsObject.lm[lm] : '',
			md: md && md.length > 0 ? optionsObject.md[md] : '',
			lg: lg && lg.length > 0 ? optionsObject.lg[lg] : ''
		};
	} else if (blokFieldType === 'slider') {
		classes = {
			def: def && def !== 'none' ? optionsObject.def[def.value] : '',
			mm: mm && mm !== 'none' ? optionsObject.mm[mm.value] : '',
			lm: lm && lm !== 'none' ? optionsObject.lm[lm.value] : '',
			md: md && md !== 'none' ? optionsObject.md[md.value] : '',
			lg: lg && lg !== 'none' ? optionsObject.lg[lg.value] : ''
		};
	}

	return Object.values(classes).join(' ').trim().replace('  ', ' '); //lazy fix for double spacing...
};
