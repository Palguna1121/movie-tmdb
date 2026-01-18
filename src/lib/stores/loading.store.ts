import { writable } from 'svelte/store';

function createLoadingStore() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		set: (loading: boolean) => set(loading),
		show: () => set(true),
		hide: () => set(false)
	};
}

export const loadingStore = createLoadingStore();
