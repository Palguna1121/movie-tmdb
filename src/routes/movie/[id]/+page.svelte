<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { tmdbService } from '$lib/services/tmdb.service';
	import { getBackdropUrl, getPosterUrl } from '$lib/utils/imageUrl';
	import LoadingSkeleton from '$lib/components/ui/LoadingSkeleton.svelte';
	import MovieRow from '$lib/components/movie/MovieRow.svelte';
	import type { MovieDetail, Cast, Video, Movie } from '$lib/types/movie.types';

	import { loadingStore } from '$lib/stores/loading.store';

	let movie: MovieDetail | null = null;
	let cast: Cast[] = [];
	let similarMovies: Movie[] = [];
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
			const [movieResult, creditsResult, videosResult, similarResult] = await Promise.allSettled([
				tmdbService.getMovieDetails(id),
				tmdbService.getMovieCredits(id),
				tmdbService.getMovieVideos(id),
				tmdbService.getSimilarMovies(id)
			]);

			if (movieResult.status === 'fulfilled') {
				movie = movieResult.value;
			} else {
				throw new Error('Failed to load movie details');
			}

			if (creditsResult.status === 'fulfilled') {
				cast = creditsResult.value.cast.slice(0, 12);
			}

			if (similarResult.status === 'fulfilled') {
				similarMovies = similarResult.value.results.slice(0, 10);
			}

			if (videosResult.status === 'fulfilled') {
				trailer =
					videosResult.value.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube') ||
					videosResult.value.results.find((v) => v.site === 'YouTube') ||
					null;
			}
		} catch (e) {
			console.error(e);
			error = 'Failed to load movie details.';
		} finally {
			loadingStore.hide();
		}
	}

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}
</script>

{#if error}
	<div class="bg-background-dark flex min-h-screen items-center justify-center">
		<p class="text-red-500">{error}</p>
	</div>
{:else if movie}
	<div class="relative min-h-screen overflow-hidden pb-20">
		<!-- Backdrop Hero -->
		<div class="absolute inset-0 h-[80vh] w-full">
			{#if movie.backdrop_path}
				<img
					src={getBackdropUrl(movie.backdrop_path)}
					alt={movie.title}
					class="h-full w-full object-cover opacity-50"
				/>
			{/if}
			<div
				class="from-background-light dark:from-background-dark via-background-light/80 dark:via-background-dark/90 absolute inset-0 bg-gradient-to-t to-transparent"
			></div>
		</div>

		<div class="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr]">
				<!-- Left Column: Poster & Details -->
				<div class="space-y-8">
					<div
						class="skew-y-1 transform overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:skew-y-0"
					>
						<img src={getPosterUrl(movie.poster_path)} alt={movie.title} class="h-auto w-full" />
					</div>

					<!-- Official Site & Status -->
					<div class="rounded-xl bg-white/5 p-6 backdrop-blur-sm">
						<div class="space-y-4">
							<div>
								<h3 class="text-sm font-bold text-gray-400 uppercase">Status</h3>
								<p class="font-medium text-white">{movie.status}</p>
							</div>
							<div>
								<h3 class="text-sm font-bold text-gray-400 uppercase">Original Language</h3>
								<p class="font-medium text-white uppercase">{movie.original_language}</p>
							</div>
							<div>
								<h3 class="text-sm font-bold text-gray-400 uppercase">Budget</h3>
								<p class="font-medium text-white">
									{movie.budget > 0 ? formatCurrency(movie.budget) : 'N/A'}
								</p>
							</div>
							<div>
								<h3 class="text-sm font-bold text-gray-400 uppercase">Revenue</h3>
								<p class="font-medium text-white">
									{movie.revenue > 0 ? formatCurrency(movie.revenue) : 'N/A'}
								</p>
							</div>
							{#if movie.homepage}
								<a
									href={movie.homepage}
									target="_blank"
									class="block w-full rounded bg-zinc-800 py-2 text-center text-sm font-bold text-white transition-colors hover:bg-zinc-700"
								>
									Visit Website
								</a>
							{/if}
						</div>
					</div>
				</div>

				<!-- Right Column: Info, Trailer, Cast -->
				<div class="min-w-0 space-y-10">
					<!-- Header Info -->
					<div class="space-y-4">
						<h1
							class="font-display text-4xl leading-tight font-black break-words text-white md:text-6xl"
						>
							{movie.title}
						</h1>

						{#if movie.tagline}
							<p class="text-xl font-light text-gray-400 italic">
								"{movie.tagline}"
							</p>
						{/if}

						<div class="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300">
							<span
								class="flex items-center gap-1 rounded bg-yellow-500 px-2 py-1 font-bold text-black"
							>
								<span class="material-icons text-sm">star</span>
								{movie.vote_average.toFixed(1)}
							</span>
							<span>{movie.release_date.split('-')[0]}</span>
							<span class="h-1 w-1 rounded-full bg-gray-500"></span>
							<span>{movie.runtime} min</span>
							<span class="h-1 w-1 rounded-full bg-gray-500"></span>
							<div class="flex flex-wrap gap-2">
								{#each movie.genres as genre}
									<span
										class="hover:border-primary hover:text-primary cursor-default rounded-full border border-gray-600 px-3 py-0.5 text-xs text-gray-300 transition-colors"
									>
										{genre.name}
									</span>
								{/each}
							</div>
						</div>
					</div>

					<!-- Overview -->
					<div class="space-y-3">
						<h3 class="text-xl font-bold text-white">Overview</h3>
						<p class="text-lg leading-relaxed text-gray-300">
							{movie.overview}
						</p>
					</div>

					<!-- Embedded Trailer -->
					{#if trailer}
						<div class="space-y-4">
							<h3 class="flex items-center gap-2 text-xl font-bold text-white">
								<span class="material-icons text-red-600">play_circle</span>
								Official Trailer
							</h3>
							<div class="aspect-video w-full overflow-hidden rounded-xl bg-black/50 shadow-lg">
								<iframe
									src="https://www.youtube.com/embed/{trailer.key}?modestbranding=1&rel=0"
									title="YouTube video player"
									class="h-full w-full"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
							</div>
						</div>
					{/if}

					<!-- Cast -->
					<div class="space-y-4">
						<h3 class="text-xl font-bold text-white">Top Cast</h3>
						<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
							{#each cast as actor}
								<div
									class="flex items-center gap-3 rounded-lg bg-white/5 p-2 transition-colors hover:bg-white/10"
								>
									<div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-zinc-800">
										{#if actor.profile_path}
											<img
												src={getPosterUrl(actor.profile_path)}
												alt={actor.name}
												class="h-full w-full object-cover"
											/>
										{:else}
											<div
												class="flex h-full w-full items-center justify-center text-xs text-gray-500"
											>
												N/A
											</div>
										{/if}
									</div>
									<div class="min-w-0">
										<p class="truncate text-sm font-bold text-white">{actor.name}</p>
										<p class="truncate text-xs text-gray-400">{actor.character}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Button Actions -->
					<div class="flex flex-wrap gap-4">
						<button
							class="flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 font-bold text-white transition-colors hover:bg-white/20"
						>
							<span class="material-icons">add</span>
							Add to My List
						</button>
						<button
							class="flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 font-bold text-white transition-colors hover:bg-white/20"
						>
							<span class="material-icons">share</span>
							Share
						</button>
					</div>
				</div>
			</div>

			<!-- Similar Movies -->
			{#if similarMovies.length > 0}
				<div class="mt-16 border-t border-gray-800 pt-12">
					<MovieRow title="More Like This" movies={similarMovies} />
				</div>
			{/if}
		</div>
	</div>
{/if}
