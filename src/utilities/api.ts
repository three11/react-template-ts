import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { handleItem, setThreshold } from './local-storage';
import { AuthRequest, SignupRequest } from './interfaces';
import { API_URL, REFRESH_TOKEN_KEY, TOKEN_KEY, TOKEN_THRESHOLD_KEY } from './constants';

export const http = axios.create({
	baseURL: API_URL
});

export const post = <T>(endpoint: string, data?: T): Promise<AxiosResponse<T>> =>
	new Promise((resolve, reject) =>
		http
			.post(endpoint, data)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

export const get = (endpoint: string): Promise<AxiosResponse> =>
	new Promise((resolve, reject) =>
		http
			.get(endpoint)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

export const patch = <T>(endpoint: string, data: T): Promise<AxiosResponse<T>> =>
	new Promise((resolve, reject) =>
		http
			.patch(endpoint, data)
			.then(resolve)
			.catch(e => reject(e.response.data))
	);

export const login = (data: AuthRequest): Promise<AxiosResponse<AuthRequest>> => post('passport/basic/login', data);

export const logout = (): Promise<AxiosResponse> => post('user/logout');

export const passwordReset = (data: Partial<AuthRequest>): Promise<AxiosResponse<Partial<AuthRequest>>> =>
	post('user/reset-password', data);

export const signup = (data: SignupRequest): Promise<AxiosResponse<SignupRequest>> =>
	post('passport/basic/signup', data);

http.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		if (config.headers) {
			config.headers['Authorization'] = localStorage.getItem(TOKEN_KEY) || '';
		}

		return config;
	},
	(error: any) => Promise.reject(error)
);

http.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: any) => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

		if (!refreshToken) {
			return Promise.reject(error);
		}

		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (http.defaults.headers) {
				http.defaults.headers['Authorization'] = 'Bearer ' + refreshToken;
			}

			return post<any>('auth/token')
				.then(res => {
					/*eslint-disable*/
					const { access_token, threshold } = res.data;
					/*eslint-enable*/

					handleItem(TOKEN_KEY, access_token);
					handleItem(TOKEN_THRESHOLD_KEY, setThreshold(threshold));

					/*eslint-disable*/
					if (http.defaults.headers) {
						http.defaults.headers['Authorization'] = access_token;
					}
					/*eslint-enable*/

					return http(originalRequest);
				})
				.catch();
		}

		return Promise.reject(error);
	}
);
