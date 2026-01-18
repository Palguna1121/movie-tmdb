import { ApiService } from './api.service';
import { TMDB_CONFIG } from '$lib/config/tmdb.config';
import { TMDB_ENDPOINTS } from '$lib/utils/constants';
import type {
	MoviesResponse,
	TVShowsResponse,
	MovieDetail,
	Cast,
	Video,
	Genre
} from '$lib/types/movie.types';

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

	async searchTV(query: string, page: number = 1): Promise<TVShowsResponse> {
		return this.get<TVShowsResponse>(TMDB_ENDPOINTS.SEARCH_TV, { query, page });
	}

	async getPopularTV(page: number = 1): Promise<TVShowsResponse> {
		return this.get<TVShowsResponse>(TMDB_ENDPOINTS.POPULAR_TV, { page });
	}

	async getTopRatedTV(page: number = 1): Promise<TVShowsResponse> {
		return this.get<TVShowsResponse>(TMDB_ENDPOINTS.TOP_RATED_TV, { page });
	}

	async getOnTheAirTV(page: number = 1): Promise<TVShowsResponse> {
		return this.get<TVShowsResponse>(TMDB_ENDPOINTS.ON_THE_AIR_TV, { page });
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

	async getSimilarMovies(movieId: number): Promise<MoviesResponse> {
		return this.get<MoviesResponse>(TMDB_ENDPOINTS.MOVIE_SIMILAR(movieId));
	}

	async getTVDetails(tvId: number): Promise<any> {
		return this.get<any>(TMDB_ENDPOINTS.TV_DETAILS(tvId));
	}

	async getTVCredits(tvId: number): Promise<{ cast: Cast[] }> {
		return this.get<{ cast: Cast[] }>(TMDB_ENDPOINTS.TV_CREDITS(tvId));
	}

	async getTVVideos(tvId: number): Promise<{ results: Video[] }> {
		return this.get<{ results: Video[] }>(TMDB_ENDPOINTS.TV_VIDEOS(tvId));
	}

	async getSimilarTV(tvId: number): Promise<TVShowsResponse> {
		return this.get<TVShowsResponse>(TMDB_ENDPOINTS.TV_SIMILAR(tvId));
	}

	async getGenres(): Promise<{ genres: Genre[] }> {
		return this.get<{ genres: Genre[] }>(TMDB_ENDPOINTS.GENRES);
	}
}

export const tmdbService = new TMDBService();
