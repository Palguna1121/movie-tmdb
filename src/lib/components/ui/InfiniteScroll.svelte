<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let hasMore: boolean = true;
	export let threshold: number = 0; // pixels from bottom

	const dispatch = createEventDispatcher();
	let element: HTMLDivElement;
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore) {
					dispatch('loadMore');
				}
			},
			{
				rootMargin: `${threshold}px`
			}
		);

		if (element) {
			observer.observe(element);
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div bind:this={element} class="h-4 w-full"></div>
