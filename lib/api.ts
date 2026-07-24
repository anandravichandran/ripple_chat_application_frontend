import axios from "axios"

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
	withCredentials: true,
	timeout: 20000,
})

api.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const token = window.localStorage.getItem("ripple.token")
		if (token) config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

api.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (error?.response?.status === 401 && typeof window !== "undefined") {
			// placeholder for refresh flow
		}
		return Promise.reject(error)
	},
)
