import type { Action } from 'svelte/action';

export const buttonHoverManager: Action<HTMLElement> = (node) => {
	const manipulateCoordinates = (eventType: 'mouseenter' | 'mouseleave', container: HTMLElement, event: MouseEvent) => {
		const { left, top, width } = container.getBoundingClientRect();
		const yCoordinates = event.pageX - left - window.scrollX;
		const xCoordinates = event.pageY - top - window.scrollY;
		container.style.setProperty('--before-top', `${xCoordinates}px`);
		container.style.setProperty('--before-left', `${yCoordinates}px`);
		container.style.setProperty('--before-width', eventType === 'mouseenter' ? `${width * 2.25}px` : '0px');
	};

	const handleMouseEvent = (e: MouseEvent): void => {
		const container = (e.target as HTMLElement).closest('.button-link-container') as HTMLElement;
		if (!container) return;
		if (e.type === 'mouseenter' || e.type === 'mouseleave') {
			manipulateCoordinates(e.type, container, e);
		}
	};

	node.addEventListener('mouseenter', handleMouseEvent);
	node.addEventListener('mouseleave', handleMouseEvent);

	return {
		destroy() {
			node.removeEventListener('mouseenter', handleMouseEvent);
			node.removeEventListener('mouseleave', handleMouseEvent);
		}
	};
};
