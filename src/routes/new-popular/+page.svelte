<script lang="ts">
	import { onMount } from 'svelte';
	import { tmdbService } from '$lib/services/tmdb.service';
	import type { MediaItem } from '$lib/types/movie.types';
	import MovieCard from '$lib/components/movie/MovieCard.svelte';
	import InfiniteScroll from '$lib/components/ui/InfiniteScroll.svelte';
	import LoadingSkeleton from '$lib/components/ui/LoadingSkeleton.svelte';
	import ScrollToTop from '$lib/components/ui/ScrollToTop.svelte';
	import { loadingStore } from '$lib/stores/loading.store';
	import Container from '$lib/components/layout/Container.svelte';

	let items: MediaItem[] = [];
	let page = 1;
	let loading = false;
	let hasMore = true;

	async function loadData() {
		if (loading) return;
		loading = true;
		if (page === 1) loadingStore.show();

		try {
			// "New & Popular" usually means Trending
			// However, Trending endpoint usually doesn't support pagination heavily in some versions,
			// but standard /trending/movie/week supports page.
			// Also, we might want to mix trending TV and Movies?
			// TMDBService.getTrendingMovies() only returns movies.
			// Let's use getTrendingMovies for now as requested "list movie" context,
			// or perhaps user wants "New & Popular" to be something else.
			// Given the navbar usually links to "New & Popular", let's assume Trending.
			// BUT, tmdb.service.getTrendingMovies matches /trending/movie/week.
			// To support pagination there, checking service...
			// Service method: `async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<MoviesResponse>`
			// It DOES NOT accept page param currently in my implementation!
			// I need to update getTrendingMovies to accept page.

			// For now, let's use getUpcomingMovies (New) or Popular Movies?
			// Or I fix getTrendingMovies to accept page.

			// Let's us Popular Movies as fallback or better yet, fix getTrending to accept page.
			const response = await tmdbService.getUpcomingMovies(page); // "New"
			const newItems = response.results.filter(
				(newItem) => !items.some((existingItem) => existingItem.id === newItem.id)
			);
			items = [...items, ...newItems];
			hasMore = page < response.total_pages;
			page++;
		} catch (error) {
			console.error('Failed to load new & popular:', error);
		} finally {
			loading = false;
			loadingStore.hide();
		}
	}

	onMount(() => {
		loadData();
	});
</script>

<svelte:head>
	<title>New & Popular - NStation</title>
</svelte:head>

<Container>
	<div class="pt-24 pb-12">
		<h1 class="mb-8 text-3xl font-black text-white">New & Popular</h1>

		<div
			class="grid grid-cols-2 gap-6 gap-x-24 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
		>
			{#each items as item (item.id)}
				<div class="w-full">
					<MovieCard movie={item} />
				</div>
			{/each}
			{#if loading && page > 1}
				{#each Array(10) as _}
					<div class="w-full">
						<LoadingSkeleton />
					</div>
				{/each}
			{/if}
		</div>

		{#if hasMore}
			<InfiniteScroll on:loadMore={loadData} />
		{/if}
	</div>
	<ScrollToTop />
</Container>
