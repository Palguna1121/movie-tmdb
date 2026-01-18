export const APP_NAME = 'NStation';

export const PATHS = {
	HOME: '/',
	MOVIES: '/movies',
	TV_SHOWS: '/tv-shows',
	POPULAR: '/new-popular', // Updated to match the new route
	MY_LIST: '/my-list',
	SEARCH: '/search',
	MOVIE_DETAIL: (id: number) => `/movie/${id}`
};

export const TMDB_ENDPOINTS = {
	TRENDING: (timeWindow: string = 'week') => `/trending/movie/${timeWindow}`,
	TRENDING_TV: (timeWindow: string = 'week') => `/trending/tv/${timeWindow}`,
	POPULAR: '/movie/popular',
	POPULAR_TV: '/tv/popular',
	TOP_RATED: '/movie/top_rated',
	TOP_RATED_TV: '/tv/top_rated',
	UPCOMING: '/movie/upcoming',
	ON_THE_AIR_TV: '/tv/on_the_air',
	SEARCH: '/search/movie',
	SEARCH_TV: '/search/tv',
	MOVIE_DETAILS: (id: number) => `/movie/${id}`,
	MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
	MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
	TV_DETAILS: (id: number) => `/tv/${id}`,
	TV_CREDITS: (id: number) => `/tv/${id}/credits`,
	TV_VIDEOS: (id: number) => `/tv/${id}/videos`,
	GENRES: '/genre/movie/list',
	GENRES_TV: '/genre/tv/list',
	MOVIE_SIMILAR: (id: number) => `/movie/${id}/similar`,
	TV_SIMILAR: (id: number) => `/tv/${id}/similar`
};
