<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { tmdbService } from '$lib/services/tmdb.service';
	import { getBackdropUrl, getPosterUrl } from '$lib/utils/imageUrl';
	import LoadingSkeleton from '$lib/components/ui/LoadingSkeleton.svelte';
	import type { MovieDetail, Cast, Video } from '$lib/types/movie.types';

	import { loadingStore } from '$lib/stores/loading.store';

	let movie: MovieDetail | null = null;
	let cast: Cast[] = [];
	let trailer: Video | null = null;
	let error: string | null = null;

	$: movieId = $page.params.id;

	// React to ID changes
	$: if (movieId) {
		loadMovie(parseInt(movieId));
	}

	async function loadMovie(id: number) {
		loadingStore.show();
		error = null;
		try {
			const [movieData, creditsData, videosData] = await Promise.all([
				tmdbService.getMovieDetails(id),
				tmdbService.getMovieCredits(id),
				tmdbService.getMovieVideos(id)
			]);

			movie = movieData;
			cast = creditsData.cast.slice(0, 10);
			trailer =
				videosData.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube') || null;
		} catch (e) {
			console.error(e);
			error = 'Failed to load movie details.';
		} finally {
			loadingStore.hide();
		}
	}
</script>

{#if error}
	<div class="bg-background-dark flex min-h-screen items-center justify-center">
		<p class="text-red-500">{error}</p>
	</div>
{:else if movie}
	<div class="relative min-h-screen overflow-hidden pb-20">
		<!-- Backdrop Hero -->
		<div class="absolute inset-0 h-[70vh] w-full">
			{#if movie.backdrop_path}
				<img
					src={getBackdropUrl(movie.backdrop_path)}
					alt={movie.title}
					class="h-full w-full object-cover"
				/>
			{/if}
			<div
				class="from-background-light dark:from-background-dark via-background-light/60 dark:via-background-dark/80 absolute inset-0 bg-gradient-to-t to-transparent"
			></div>
		</div>

		<div class="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
			<div class="flex flex-col items-start gap-8 md:flex-row lg:gap-12">
				<!-- Poster -->
				<div
					class="hidden w-72 flex-shrink-0 skew-y-1 transform overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:skew-y-0 md:block"
				>
					<img src={getPosterUrl(movie.poster_path)} alt={movie.title} class="h-auto w-full" />
				</div>

				<!-- Info -->
				<div class="min-w-0 flex-1 space-y-6 text-gray-900 dark:text-white">
					<h1 class="font-display text-4xl leading-tight font-black break-words md:text-6xl">
						{movie.title}
					</h1>

					{#if movie.tagline}
						<p class="text-xl font-light text-gray-500 italic dark:text-gray-400">
							"{movie.tagline}"
						</p>
					{/if}

					<div class="flex flex-wrap items-center gap-4 text-sm font-medium">
						<span
							class="flex items-center gap-1 rounded bg-yellow-500/10 px-2 py-1 font-bold text-yellow-500"
						>
							<span class="material-icons text-sm">star</span>
							{movie.vote_average.toFixed(1)}
						</span>
						<span>{movie.release_date.split('-')[0]}</span>
						<span class="h-1 w-1 rounded-full bg-gray-400"></span>
						<span>{movie.runtime} min</span>
						<span class="h-1 w-1 rounded-full bg-gray-400"></span>
						<div class="flex gap-2">
							{#each movie.genres as genre}
								<span class="text-primary cursor-pointer hover:underline">{genre.name}</span>
							{/each}
						</div>
					</div>

					<p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
						{movie.overview}
					</p>

					<div class="flex flex-wrap gap-4 pt-4">
						{#if trailer}
							<a
								href={`https://www.youtube.com/watch?v=${trailer.key}`}
								target="_blank"
								class="bg-primary shadow-glow flex transform items-center gap-2 rounded-md px-8 py-3 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-red-700"
							>
								<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"
									><path d="M8 5v14l11-7z" /></svg
								>
								Watch Trailer
							</a>
						{/if}
						<button
							class="rounded-md border border-white/20 bg-white/10 px-8 py-3 text-lg font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
						>
							Add to List
						</button>
					</div>

					<!-- Cast -->
					<div class="space-y-4 pt-8">
						<h3 class="text-xl font-bold">Top Cast</h3>
						<div class="no-scrollbar flex gap-4 overflow-x-auto pb-4">
							{#each cast as actor}
								<div class="group w-24 flex-shrink-0 text-center">
									<div
										class="group-hover:border-primary mb-2 h-24 w-24 overflow-hidden rounded-full border-2 border-transparent transition-all"
									>
										{#if actor.profile_path}
											<img
												src={getPosterUrl(actor.profile_path)}
												alt={actor.name}
												class="h-full w-full object-cover"
											/>
										{:else}
											<div class="flex h-full w-full items-center justify-center bg-gray-700">
												?
											</div>
										{/if}
									</div>
									<p class="truncate text-xs font-bold">{actor.name}</p>
									<p class="truncate text-[10px] text-gray-500">{actor.character}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
