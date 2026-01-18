<script lang="ts">
	import type { Movie } from '$lib/types/movie.types';
	import { getPosterUrl } from '$lib/utils/imageUrl';
	import { PATHS } from '$lib/utils/constants';

	export let movie: Movie;
</script>

<a
	href={PATHS.MOVIE_DETAIL(movie.id)}
	class="group focus:ring-primary relative block h-[320px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-zinc-800 transition-all duration-300 hover:z-10 hover:scale-105 focus:ring-2 focus:outline-none"
>
	<div class="relative aspect-[2/3] h-full w-full">
		{#if movie.poster_path}
			<img
				loading="lazy"
				src={getPosterUrl(movie.poster_path)}
				alt={movie.title}
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
				{movie.title}
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
