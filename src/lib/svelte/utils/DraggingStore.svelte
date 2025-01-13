<script lang="ts">
	import { isDragging } from '$lib/stores/dragging.svelte';
</script>

<svelte:window onmousedown={isDragging.handleMouseDown} onmouseup={isDragging.handleMouseUp} />

<!-- 
    Custom solution to stop click on <Dialog> components that are inside of a
    scrollable container. 
-->
