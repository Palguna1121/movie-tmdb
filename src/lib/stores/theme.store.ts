import { writable } from 'svelte/store';
// For SvelteKit, we might need to handle browser-only local storage access
import { browser } from '$app/environment';

function createThemeStore() {
	const initialTheme = browser ? localStorage.getItem('theme') || 'dark' : 'dark';
	const { subscribe, set, update } = writable(initialTheme);

	return {
		subscribe,
		toggle: () =>
			update((current) => {
				const newTheme = current === 'dark' ? 'light' : 'dark';
				if (browser) {
					document.documentElement.classList.remove(current);
					document.documentElement.classList.add(newTheme);
					localStorage.setItem('theme', newTheme);
				}
				return newTheme;
			}),
		set: (theme: string) => {
			if (browser) {
				document.documentElement.classList.remove('light', 'dark');
				document.documentElement.classList.add(theme);
				localStorage.setItem('theme', theme);
			}
			set(theme);
		},
		init: () => {
			if (browser) {
				const theme = localStorage.getItem('theme') || 'dark';
				document.documentElement.classList.add(theme);
				set(theme);
			}
		}
	};
}

export const themeStore = createThemeStore();
