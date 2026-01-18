import { writable } from 'svelte/store';
import type { Movie } from '$lib/types/movie.types';

export interface MoviesState {
	trending: Movie[];
	popular: Movie[];
	topRated: Movie[];
	upcoming: Movie[];
	loading: boolean;
	error: string | null;
}

function createMoviesStore() {
	const { subscribe, set, update } = writable<MoviesState>({
		trending: [],
		popular: [],
		topRated: [],
		upcoming: [],
		loading: false,
		error: null
	});

	return {
		subscribe,
		setTrending: (movies: Movie[]) => update((state) => ({ ...state, trending: movies })),
		setPopular: (movies: Movie[]) => update((state) => ({ ...state, popular: movies })),
		setTopRated: (movies: Movie[]) => update((state) => ({ ...state, topRated: movies })),
		setUpcoming: (movies: Movie[]) => update((state) => ({ ...state, upcoming: movies })),
		setLoading: (loading: boolean) => update((state) => ({ ...state, loading })),
		setError: (error: string | null) => update((state) => ({ ...state, error })),
		reset: () =>
			set({ trending: [], popular: [], topRated: [], upcoming: [], loading: false, error: null })
	};
}

export const moviesStore = createMoviesStore();
