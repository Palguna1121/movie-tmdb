import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios';

export class ApiService {
	protected axiosInstance: AxiosInstance;

	constructor(
		protected baseURL: string,
		protected apiKey: string
	) {
		this.axiosInstance = axios.create({
			baseURL: this.baseURL,
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Add interceptor to handle params or other common logic if needed
		this.axiosInstance.interceptors.request.use((config) => {
			// Ensure params object exists
			if (!config.params) {
				config.params = {};
			}

			// If we were using client-side key, we'd add it here.
			// Currently handled by proxy, but kept for flexibility
			if (this.apiKey) {
				config.params['api_key'] = this.apiKey;
			}

			return config;
		});
	}

	protected async get<T>(
		endpoint: string,
		params: Record<string, string | number> = {}
	): Promise<T> {
		try {
			const response = await this.axiosInstance.get<T>(endpoint, { params });
			return response.data;
		} catch (error) {
			this.handleError(error);
			throw error;
		}
	}

	protected handleError(error: any): void {
		if (axios.isAxiosError(error)) {
			console.error('API Request Failed:', error.response?.data || error.message);
		} else {
			console.error('API Request Failed:', error);
		}
	}
}
