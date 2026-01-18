<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { searchStore } from '$lib/stores/search.store';
	import { debounce } from '$lib/utils/helpers';

	export let autoFocus = false;

	const dispatch = createEventDispatcher();

	let value = $searchStore.query;
	let inputElement: HTMLInputElement;

	const debouncedSearch = debounce((query: string) => {
		dispatch('search', query);
	}, 500);

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		debouncedSearch(value);
	}

	onMount(() => {
		if (autoFocus && inputElement) {
			inputElement.focus();
		}
	});
</script>

<div class="relative mx-auto w-full max-w-xl">
	<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
		<svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	</div>
	<input
		type="text"
		bind:this={inputElement}
		class="focus:border-primary focus:ring-primary block w-full rounded-lg border border-gray-700 bg-black/50 py-3 pr-3 pl-10 leading-5 text-white placeholder-gray-400 transition-all duration-300 focus:bg-gray-900 focus:ring-1 focus:outline-none sm:text-sm"
		placeholder="Search for movies..."
		{value}
		on:input={handleInput}
	/>
</div>
