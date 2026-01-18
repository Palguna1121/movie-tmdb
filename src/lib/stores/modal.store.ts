import { writable } from 'svelte/store';
import type { Movie, MovieDetail } from '$lib/types/movie.types';

interface ModalState {
	isOpen: boolean;
	movie: MovieDetail | null; // Detailed movie info
	videoId: string | null; // Youtube video ID if needed
}

function createModalStore() {
	const { subscribe, set, update } = writable<ModalState>({
		isOpen: false,
		movie: null,
		videoId: null
	});

	return {
		subscribe,
		open: (movie: MovieDetail) => set({ isOpen: true, movie, videoId: null }),
		close: () => set({ isOpen: false, movie: null, videoId: null }),
		setVideo: (videoId: string) => update((state) => ({ ...state, videoId }))
	};
}

export const modalStore = createModalStore();
