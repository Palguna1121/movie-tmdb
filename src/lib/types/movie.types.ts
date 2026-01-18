export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	vote_average: number;
	release_date: string;
	genre_ids?: number[];
	video?: boolean;
	adult?: boolean;
	popularity?: number;
	vote_count?: number;
	media_type?: 'movie';
}

export interface TVShow {
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	vote_average: number;
	first_air_date: string;
	genre_ids?: number[];
	popularity?: number;
	vote_count?: number;
	media_type?: 'tv';
}

export type MediaItem = Movie | TVShow;

export interface MovieDetail extends Movie {
	genres: Genre[];
	runtime: number;
	status: string;
	tagline: string;
	budget: number;
	revenue: number;
	homepage: string;
	imdb_id: string;
	original_language: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface Cast {
	id: number;
	name: string;
	profile_path: string | null;
	character: string;
	order: number;
}

export interface Video {
	id: string;
	key: string;
	name: string;
	site: string;
	type: string;
}

export interface ApiResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export type MoviesResponse = ApiResponse<Movie>;
export type TVShowsResponse = ApiResponse<TVShow>;
