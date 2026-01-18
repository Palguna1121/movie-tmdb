export const APP_NAME = 'NStation';

export const PATHS = {
	HOME: '/',
	MOVIES: '/movies',
	TV_SHOWS: '/tv-shows',
	POPULAR: '/popular',
	MY_LIST: '/my-list',
	SEARCH: '/search',
	MOVIE_DETAIL: (id: number) => `/movie/${id}`
};

export const TMDB_ENDPOINTS = {
	TRENDING: (timeWindow: string = 'week') => `/trending/movie/${timeWindow}`,
	POPULAR: '/movie/popular',
	TOP_RATED: '/movie/top_rated',
	UPCOMING: '/movie/upcoming',
	SEARCH: '/search/movie',
	MOVIE_DETAILS: (id: number) => `/movie/${id}`,
	MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
	MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
	GENRES: '/genre/movie/list'
};
