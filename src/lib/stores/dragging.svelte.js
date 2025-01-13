export function createDraggingStore(initialValue = false) {
	let state = $state(initialValue);
	let prevX = null;
	let currX = null;

	const mouseMove = (event) => {
		if (event.clientX !== prevX) {
			prevX = currX;
			currX = event.clientX;
			state = true;
		}
	};

	const mouseUp = () => {
		window.removeEventListener('mousemove', mouseMove);
		setTimeout(() => {
			state = false;
		}, 1);
	};

	const mouseDown = (event) => {
		if (event.buttons === 1) {
			currX = event.clientX;
			prevX = currX;
			window.addEventListener('mousemove', mouseMove);
		}
	};

	function set(value) {
		state = value;
	}

	function update(fn) {
		state = fn(state);
	}

	function handleMouseDown(event) {
		mouseDown(event);
	}

	function handleMouseUp(event) {
		mouseUp(event);
	}

	return {
		get state() {
			return state;
		},
		set,
		update,
		handleMouseDown,
		handleMouseUp
	};
}

export const isDragging = createDraggingStore();
