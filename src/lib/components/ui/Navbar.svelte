<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme.store';
	import { page } from '$app/stores';
	import { PATHS } from '$lib/utils/constants';

	let isScrolled = false;
	let isSearchOpen = false;

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 0;
		};
		window.addEventListener('scroll', handleScroll);
		themeStore.init();
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleTheme() {
		themeStore.toggle();
	}
</script>

<nav
	class="fixed top-0 z-50 w-full transition-all duration-300 {isScrolled
		? 'glass-nav bg-white/70 dark:bg-black/80'
		: 'bg-gradient-to-b from-black/80 to-transparent'}"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center gap-8">
				<a href={PATHS.HOME} class="text-primary text-2xl font-black tracking-tighter uppercase"
					>NStation</a
				>
				<div class="hidden space-x-6 md:flex">
					<a
						href={PATHS.HOME}
						class="hover:text-primary text-sm font-medium transition-colors {$page.url.pathname ===
						PATHS.HOME
							? 'text-white'
							: 'text-gray-300'}">Home</a
					>
					<a href="/" class="hover:text-primary text-sm font-medium text-gray-300 transition-colors"
						>TV Shows</a
					>
					<a href="/" class="hover:text-primary text-sm font-medium text-gray-300 transition-colors"
						>Movies</a
					>
					<a
						href={PATHS.POPULAR}
						class="hover:text-primary text-sm font-medium text-gray-300 transition-colors"
						>New & Popular</a
					>
				</div>
			</div>

			<div class="flex items-center gap-4">
				<a
					href={PATHS.SEARCH}
					class="hover:text-primary text-gray-300 transition-colors"
					aria-label="Search"
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</a>

				<div class="group relative">
					<button class="flex items-center gap-2" aria-label="User Profile">
						<div class="h-8 w-8 overflow-hidden rounded-md border border-gray-500 bg-gray-600">
							<span class="flex h-full w-full items-center justify-center text-xs text-white"
								>Nana</span
							>
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</nav>
