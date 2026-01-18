import { ApiService } from './api.service';
import { TMDB_CONFIG } from '$lib/config/tmdb.config';
import { TMDB_ENDPOINTS } from '$lib/utils/constants';
import type { MoviesResponse, MovieDetail, Cast, Video, Genre } from '$lib/types/movie.types';

class TMDBService extends ApiService {
	constructor() {
		super(TMDB_CONFIG.baseURL, TMDB_CONFIG.apiKey);
	}

	async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<MoviesResponse> {
		return this.get<MoviesResponse>(TMDB_ENDPOINTS.TRENDING(timeWindow));
	}

	async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
		return this.get<MoviesResponse>(TMDB_ENDPOINTS.POPULAR, { page });
	}

	async getTopRatedMovies(page: number = 1): Promise<MoviesResponse> {
		return this.get<MoviesResponse>(TMDB_ENDPOINTS.TOP_RATED, { page });
	}

	async getUpcomingMovies(page: number = 1): Promise<MoviesResponse> {
		return this.get<MoviesResponse>(TMDB_ENDPOINTS.UPCOMING, { page });
	}

	async searchMovies(query: string, page: number = 1): Promise<MoviesResponse> {
		return this.get<MoviesResponse>(TMDB_ENDPOINTS.SEARCH, { query, page });
	}

	async getMovieDetails(movieId: number): Promise<MovieDetail> {
		return this.get<MovieDetail>(TMDB_ENDPOINTS.MOVIE_DETAILS(movieId));
	}

	async getMovieCredits(movieId: number): Promise<{ cast: Cast[] }> {
		return this.get<{ cast: Cast[] }>(TMDB_ENDPOINTS.MOVIE_CREDITS(movieId));
	}

	async getMovieVideos(movieId: number): Promise<{ results: Video[] }> {
		return this.get<{ results: Video[] }>(TMDB_ENDPOINTS.MOVIE_VIDEOS(movieId));
	}

	async getGenres(): Promise<{ genres: Genre[] }> {
		return this.get<{ genres: Genre[] }>(TMDB_ENDPOINTS.GENRES);
	}
}

export const tmdbService = new TMDBService();
