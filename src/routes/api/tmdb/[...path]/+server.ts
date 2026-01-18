import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { VITE_TMDB_API_KEY } from '$env/static/private';
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const GET: RequestHandler = async ({ params, url }) => {
	const path = params.path;
	const query = Object.fromEntries(url.searchParams);

	// Add API key server-side
	const requestParams = {
		...query,
		api_key: VITE_TMDB_API_KEY
	};

	try {
		const response = await axios.get(`${TMDB_BASE_URL}/${path}`, {
			params: requestParams,
			validateStatus: () => true // Handle errors manually
		});

		if (response.status >= 400) {
			return json(
				{ error: `TMDB API error: ${response.statusText}`, details: response.data },
				{ status: response.status }
			);
		}

		return json(response.data);
	} catch (error) {
		console.error('TMDB Proxy Error:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
};
