<script lang="ts">
	import type { Movie } from '$lib/types/movie.types';
	import { getBackdropUrl } from '$lib/utils/imageUrl';
	import { PATHS } from '$lib/utils/constants';
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';

	export let movies: Movie[] = [];

	let currentIndex = 0;
	let interval: ReturnType<typeof setInterval>;

	$: currentMovie = movies[currentIndex];

	onMount(() => {
		startInterval();
	});

	onDestroy(() => {
		stopInterval();
	});

	function startInterval() {
		stopInterval();
		if (movies.length > 1) {
			interval = setInterval(() => {
				currentIndex = (currentIndex + 1) % movies.length;
			}, 5000); // 5 second interval as requested
		}
	}

	function stopInterval() {
		if (interval) clearInterval(interval);
	}

	// Optional: Pause on hover
	function handleMouseEnter() {
		stopInterval();
	}

	function handleMouseLeave() {
		startInterval();
	}
</script>

{#if currentMovie}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="relative flex h-[85vh] w-full items-center justify-start overflow-hidden bg-black"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
	>
		{#key currentMovie.id}
			<div class="absolute inset-0 z-0" in:fade={{ duration: 700 }} out:fade={{ duration: 700 }}>
				{#if currentMovie.backdrop_path}
					<img
						src={getBackdropUrl(currentMovie.backdrop_path)}
						alt={currentMovie.title}
						class="h-full w-full object-cover"
					/>
				{/if}
				<!-- Gradient Overlays -->
				<div
					class="from-background-light dark:from-background-dark via-background-light/60 dark:via-background-dark/60 absolute inset-0 bg-gradient-to-r to-transparent"
				></div>
				<div
					class="from-background-light dark:from-background-dark absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
				></div>
			</div>
		{/key}

		<div class="relative z-10 mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Key block for text content to animate it as well -->
			{#key currentMovie.id}
				<div class="max-w-2xl space-y-6" in:fade={{ duration: 500, delay: 200 }}>
					<div class="flex items-center gap-3">
						<span
							class="bg-primary shadow-primary/40 rounded px-2 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-lg"
							>Trending #{currentIndex + 1}</span
						>
					</div>

					<h1
						class="font-display line-clamp-2 text-5xl leading-tight font-black text-gray-900 drop-shadow-xl md:text-7xl dark:text-white"
					>
						{currentMovie.title}
					</h1>

					<div
						class="flex items-center gap-4 text-sm font-medium text-gray-700 md:text-base dark:text-gray-300"
					>
						<span class="font-bold text-green-600 dark:text-green-400"
							>{Math.round(currentMovie.vote_average * 10)}% Match</span
						>
						<span>{currentMovie.release_date?.split('-')[0]}</span>
						<span
							class="flex items-center gap-1 rounded border border-gray-400 px-1.5 py-0.5 text-xs dark:border-gray-500"
							>HD</span
						>
					</div>

					<p
						class="line-clamp-3 max-w-xl text-lg leading-relaxed text-gray-800 drop-shadow-sm dark:text-gray-300"
					>
						{currentMovie.overview}
					</p>

					<div class="flex items-center gap-4 pt-4">
						<a
							href={PATHS.MOVIE_DETAIL(currentMovie.id)}
							class="flex transform items-center gap-2 rounded bg-white px-8 py-3 font-bold text-black shadow-xl transition-all hover:scale-105 hover:bg-gray-200"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
									clip-rule="evenodd"
								/>
							</svg>
							Play
						</a>
						<a
							href={PATHS.MOVIE_DETAIL(currentMovie.id)}
							class="flex items-center gap-2 rounded bg-gray-500/30 px-8 py-3 font-bold text-white backdrop-blur-md transition-all hover:bg-gray-500/50 dark:bg-gray-600/40"
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
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							More Info
						</a>
					</div>
				</div>
			{/key}
		</div>

		<!-- Slider Indicators -->
		<div class="absolute right-4 bottom-24 z-20 flex gap-2 md:right-10">
			{#each movies as _, i}
				<button
					class="h-1 rounded-full transition-all duration-300 {i === currentIndex
						? 'w-8 bg-white'
						: 'w-4 bg-white/40 hover:bg-white/60'}"
					on:click={() => (currentIndex = i)}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>
	</div>
{:else}
	<div class="h-[85vh] w-full animate-pulse bg-gray-900"></div>
{/if}
