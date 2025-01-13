/**
 * Creates a reactive store for tracking page transition animation states
 * @param {{url: string|undefined, animationState: 'Intro Started'|'Intro Ended'|undefined}} initialValue - Initial state object
 * @returns {{
 *   state: {url: string|undefined, animationState: string|undefined},
 *   set: (value: {url: string|undefined, animationState: string|undefined}) => void,
 *   update: (fn: (state: {url: string|undefined, animationState: string|undefined}) => {url: string|undefined, animationState: string|undefined}) => void
 * }} A Svelte 5 reactive store with state getter and mutation methods
 */

export function createAnimationStateStore(initialValue) {
	let state = $state(initialValue);

	function set(value) {
		state = value;
	}

	function update(fn) {
		state = fn(state);
	}

	return {
		get state() {
			return state;
		},
		set,
		update
	};
}

export const aniStateStore = createAnimationStateStore({
	url: undefined,
	animationState: undefined
});
