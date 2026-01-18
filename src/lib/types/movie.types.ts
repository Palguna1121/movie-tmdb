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
}

export interface MovieDetail extends Movie {
	genres: Genre[];
	runtime: number;
	status: string;
	tagline: string;
	budget: number;
	revenue: number;
	homepage: string;
	imdb_id: string;
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

export interface MoviesResponse {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}
