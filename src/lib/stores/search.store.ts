import { writable } from 'svelte/store';
import type { Movie } from '$lib/types/movie.types';

function createSearchStore() {
	const { subscribe, set, update } = writable({
		query: '',
		results: [] as Movie[],
		loading: false,
		error: null as string | null
	});

	return {
		subscribe,
		setQuery: (query: string) => update((state) => ({ ...state, query })),
		setResults: (results: Movie[]) => update((state) => ({ ...state, results })),
		setLoading: (loading: boolean) => update((state) => ({ ...state, loading })),
		reset: () => set({ query: '', results: [], loading: false, error: null })
	};
}

export const searchStore = createSearchStore();
