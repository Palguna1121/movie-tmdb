export const TMDB_CONFIG = {
	baseURL: '/api/tmdb', // Use our internal proxy
	imageBaseURL: 'https://image.tmdb.org/t/p',
	apiKey: '', // Key is now handled server-side
	imageSizes: {
		backdrop: 'original',
		poster: 'w500',
		profile: 'w185'
	}
};
