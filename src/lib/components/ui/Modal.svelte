<script lang="ts">
	import { modalStore } from '$lib/stores/modal.store';
	import { fade, fly } from 'svelte/transition';
	import { getBackdropUrl } from '$lib/utils/imageUrl';
	import { onDestroy } from 'svelte';

	$: if ($modalStore.isOpen) {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	} else {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function close() {
		modalStore.close();
	}

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
{#if $modalStore.isOpen && $modalStore.movie}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<!-- Backdrop -->
		<div
			class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 200 }}
			on:click={close}
			role="button"
			tabindex="0"
			aria-label="Close modal"
		></div>

		<!-- content -->
		<div
			class="no-scrollbar relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-zinc-900 shadow-2xl ring-1 ring-white/10"
			in:fly={{ y: 50, duration: 300 }}
			out:fly={{ y: 50, duration: 200 }}
		>
			<button
				class="absolute top-4 right-4 z-20 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
				on:click={close}
				aria-label="Close modal"
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
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<!-- Hero Image inside Modal -->
			<div class="relative aspect-video w-full">
				{#if $modalStore.movie.backdrop_path}
					<img
						src={getBackdropUrl($modalStore.movie.backdrop_path)}
						alt={$modalStore.movie.title}
						class="h-full w-full object-cover"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"
					></div>
				{/if}

				<div class="absolute bottom-0 left-0 w-full p-8">
					<h2 id="modal-title" class="font-display mb-2 text-3xl font-bold text-white md:text-5xl">
						{$modalStore.movie.title}
					</h2>
					<div class="flex items-center gap-4 text-sm text-gray-300">
						{#if $modalStore.movie.release_date}
							<span>{$modalStore.movie.release_date.split('-')[0]}</span>
						{/if}
						<span class="flex items-center gap-1 font-bold text-yellow-400">
							<span class="material-icons text-sm">star</span>
							{$modalStore.movie.vote_average.toFixed(1)}
						</span>
					</div>
				</div>
			</div>

			<div class="space-y-6 p-8">
				<div class="flex flex-col gap-8 md:flex-row">
					<div class="flex-1 space-y-4">
						<p class="text-lg leading-relaxed text-gray-300">{$modalStore.movie.overview}</p>

						{#if $modalStore.movie.genres}
							<div class="flex flex-wrap gap-2 pt-4">
								{#each $modalStore.movie.genres as genre}
									<span
										class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300"
									>
										{genre.name}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
