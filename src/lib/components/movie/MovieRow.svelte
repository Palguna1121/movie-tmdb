<script lang="ts">
	import MovieCard from './MovieCard.svelte';
	import type { MediaItem } from '$lib/types/movie.types';
	import LoadingSkeleton from '$lib/components/ui/LoadingSkeleton.svelte';

	export let title: string;
	export let movies: MediaItem[] = [];
	export let loading: boolean = false;
	export let viewAllLink: string = ''; // Optional link for "Explore All"
</script>

<div class="space-y-3">
	<div class="group mx-auto flex max-w-7xl cursor-pointer items-center gap-2 px-4 sm:px-6 lg:px-8">
		{#if viewAllLink}
			<a href={viewAllLink} class="flex items-center gap-2">
				<h2
					class="group-hover:text-primary text-xl font-bold text-gray-900 transition-colors md:text-2xl dark:text-white"
				>
					{title}
				</h2>
				<span
					class="text-primary translate-x-[-10px] text-xs font-semibold tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:translate-x-0 group-hover:opacity-100"
					>Explore All</span
				>
			</a>
		{:else}
			<h2
				class="group-hover:text-primary text-xl font-bold text-gray-900 transition-colors md:text-2xl dark:text-white"
			>
				{title}
			</h2>
		{/if}
	</div>

	<div class="group/row relative mx-auto max-w-7xl px-8 pt-2">
		<!-- Scroll Container -->
		<div
			class="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 sm:px-6 lg:px-8"
		>
			{#if loading}
				{#each Array(6) as _}
					<div class="min-w-[200px] snap-start">
						<LoadingSkeleton />
					</div>
				{/each}
			{:else}
				{#each movies as movie}
					<div class="min-w-[200px] snap-start">
						<MovieCard {movie} />
					</div>
				{/each}
			{/if}
		</div>

		<!-- Optional: Fade edges -->
		<div
			class="dark:from-background-dark pointer-events-none absolute top-0 right-0 bottom-8 w-16 bg-gradient-to-l from-white to-transparent"
		></div>
	</div>
</div>
