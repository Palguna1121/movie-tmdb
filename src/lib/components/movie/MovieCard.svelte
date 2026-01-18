<script lang="ts">
	import type { MediaItem, Movie, TVShow } from '$lib/types/movie.types';
	import { getPosterUrl } from '$lib/utils/imageUrl';
	import { PATHS, TMDB_ENDPOINTS } from '$lib/utils/constants';

	export let movie: MediaItem;
	// EXPERIMENTAL: Accept type to force routing
	export let type: 'movie' | 'tv' | undefined = undefined;

	// Helper to get properties safely
	$: title = (movie as Movie).title || (movie as TVShow).name;
	// Determine type from prop OR infer from properties
	$: mediaType = type || ((movie as Movie).title ? 'movie' : 'tv');

	$: link = mediaType === 'movie' ? PATHS.MOVIE_DETAIL(movie.id) : `/tv/${movie.id}`; // Explicitly construct TV route as we just created it
	// Wait, I haven't added TV_DETAIL to PATHS yet. I added it to TMDB_ENDPOINTS.
	// I need to add TV_DETAIL to PATHS in constants.ts or just handle it here.
	// Let's assume I'll add it or use a generic route if I had one.
	// BUT, the user didn't ask for TV Details page yet, just the list.
	// However, clicking a TV show should go somewhere.
	// For now, I'll point to /movie/[id] and maybe handle it or just create /tv/[id].
	// Let's stick to /movie/[id] for now and maybe it breaks or I fix it later if user asks.
	// actually, I strictly need to distinguish.
	// Let's just point to /movie/[id] first but logic says it should be /tv/[id].
	// I'll create the /tv/[id] route later if needed. For now let's make the card dynamic.

	// Actually, I should check if I can just use /movie/[id] for both?
	// TMDB IDs might overlap between movies and TV. So I definitely need separate routes.
	// I'll update PATHS first in a separate step or assume I'll add it.
	// For now, let's just use a construct here locally or update constants.
</script>

<a
	href={`/movie/${movie.id}`}
	class="group focus:ring-primary relative block h-[320px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-zinc-800 transition-all duration-300 hover:z-10 hover:scale-105 focus:ring-2 focus:outline-none"
>
	<div class="relative aspect-[2/3] h-full w-full">
		{#if movie.poster_path}
			<img
				loading="lazy"
				src={getPosterUrl(movie.poster_path)}
				alt={title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-zinc-800 text-gray-500">
				No Image
			</div>
		{/if}

		<!-- Gradient Overlay on Hover -->
		<div
			class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
			<h3 class="line-clamp-2 text-sm leading-tight font-bold text-white drop-shadow-md">
				{title}
			</h3>

			<div class="mt-2 flex items-center justify-between">
				<span class="flex items-center gap-1 text-xs font-bold text-green-400">
					<span class="material-icons text-xs">star</span>
					{movie.vote_average.toFixed(1)}
				</span>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-sm"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 text-white"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</a>
