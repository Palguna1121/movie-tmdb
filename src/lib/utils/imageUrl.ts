import { TMDB_CONFIG } from '$lib/config/tmdb.config';

type ImageSize = 'backdrop' | 'poster' | 'profile';

export function getImageUrl(path: string | null, sizeType: ImageSize = 'poster'): string {
	if (!path) return 'https://i.pinimg.com/736x/b0/66/f5/b066f5d09d23cd25b8c712a0529c9d80.jpg';

	// Determine the specific size string based on type and config
	// In a real app, you might want to allow passing specific size strings like 'w500' too
	let size = TMDB_CONFIG.imageSizes[sizeType];

	return `${TMDB_CONFIG.imageBaseURL}/${size}${path}`;
}

export function getBackdropUrl(path: string | null): string {
	return getImageUrl(path, 'backdrop');
}

export function getPosterUrl(path: string | null): string {
	return getImageUrl(path, 'poster');
}

export function getProfileUrl(path: string | null): string {
	return getImageUrl(path, 'profile');
}
