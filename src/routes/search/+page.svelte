<script lang="ts">
	import { searchStore } from '$lib/stores/search.store';
	import { tmdbService } from '$lib/services/tmdb.service';
	import MovieCard from '$lib/components/movie/MovieCard.svelte';
	import SearchBar from '$lib/components/ui/SearchBar.svelte';
	import LoadingSkeleton from '$lib/components/ui/LoadingSkeleton.svelte';

	async function handleSearch(event: CustomEvent<string>) {
		const query = event.detail;
		searchStore.setQuery(query);

		if (!query.trim()) {
			searchStore.setResults([]);
			return;
		}

		searchStore.setLoading(true);
		try {
			const response = await tmdbService.searchMovies(query);
			searchStore.setResults(response.results);
		} catch (error) {
			console.error(error);
		} finally {
			searchStore.setLoading(false);
		}
	}
</script>

<div class="mx-auto min-h-screen max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
	<div class="mb-12 text-center">
		<h1 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Find Movies</h1>
		<SearchBar on:search={handleSearch} autoFocus={true} />
	</div>

	{#if $searchStore.loading}
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
			{#each Array(10) as _}
				<LoadingSkeleton />
			{/each}
		</div>
	{:else if $searchStore.results.length > 0}
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
			{#each $searchStore.results as movie}
				<MovieCard {movie} />
			{/each}
		</div>
	{:else if $searchStore.query}
		<div class="mt-12 text-center text-gray-500">
			No results found for "{$searchStore.query}"
		</div>
	{/if}
</div>
