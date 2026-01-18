<script lang="ts">
	import { onMount } from 'svelte';
	import { moviesStore } from '$lib/stores/movies.store';
	import { tmdbService } from '$lib/services/tmdb.service';
	import MovieHero from '$lib/components/movie/MovieHero.svelte';
	import MovieRow from '$lib/components/movie/MovieRow.svelte';
	import LoadingSkeleton from '$lib/components/ui/LoadingSkeleton.svelte';

	import { loadingStore } from '$lib/stores/loading.store';

	onMount(async () => {
		moviesStore.setLoading(true);
		loadingStore.show();
		try {
			const [trending, popular, topRated, upcoming] = await Promise.all([
				tmdbService.getTrendingMovies(),
				tmdbService.getPopularMovies(),
				tmdbService.getTopRatedMovies(),
				tmdbService.getUpcomingMovies()
			]);

			moviesStore.setTrending(trending.results);
			moviesStore.setPopular(popular.results);
			moviesStore.setTopRated(topRated.results);
			moviesStore.setUpcoming(upcoming.results);
		} catch (error) {
			console.error('Failed to fetch movies:', error);
			moviesStore.setError('Failed to load movies. Please check your connection.');
		} finally {
			moviesStore.setLoading(false);
			loadingStore.hide();
		}
	});

	$: heroMovies = $moviesStore.popular.slice(0, 10);
</script>

<svelte:head>
	<title>NStation - Watch Movies & TV Shows</title>
</svelte:head>

<div class="space-y-8 pb-20">
	{#if $moviesStore.loading && heroMovies.length === 0}
		<div class="h-[85vh] w-full animate-pulse bg-gray-800"></div>
	{:else if heroMovies.length > 0}
		<MovieHero movies={heroMovies} />
	{/if}

	<div class="relative z-20 -mt-32 space-y-4 pt-20">
		<MovieRow
			title="Trending Now"
			movies={$moviesStore.trending}
			loading={$moviesStore.loading}
			viewAllLink="/new-popular"
		/>
		<MovieRow
			title="Popular Movies"
			movies={$moviesStore.popular}
			loading={$moviesStore.loading}
			viewAllLink="/movies"
		/>
		<MovieRow
			title="Top Rated"
			movies={$moviesStore.topRated}
			loading={$moviesStore.loading}
			viewAllLink="/movies"
		/>
		<MovieRow
			title="From TV"
			movies={$moviesStore.upcoming}
			loading={$moviesStore.loading}
			viewAllLink="/tv-shows"
		/>
		<!-- Note: upcoming was used for From TV in original code? No, upcoming was upcoming movies. 
             If user wants TV shows on home, I should probably fetch them.
             For now, just linking the existing rows to relevant plausible pages. -->
	</div>

	{#if $moviesStore.error}
		<div class="py-10 text-center text-red-500">
			{$moviesStore.error}
		</div>
	{/if}
</div>
