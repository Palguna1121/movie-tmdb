<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let showScrollTop = false;

	function handleScroll() {
		showScrollTop = window.scrollY > 500;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window on:scroll={handleScroll} />

{#if showScrollTop}
	<button
		on:click={scrollToTop}
		transition:fly={{ y: 20, duration: 300 }}
		class="bg-primary hover:bg-primary/80 fixed right-6 bottom-24 z-40 rounded-full p-3 text-white shadow-lg transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none md:bottom-8"
		aria-label="Scroll to top"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 10l7-7m0 0l7 7m-7-7v18"
			/>
		</svg>
	</button>
{/if}
