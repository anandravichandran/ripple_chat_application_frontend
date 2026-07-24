"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/types"
import { authApi, usersApi } from "@/lib/api"

function setCookie(name: string, value: string, days = 7) {
	if (typeof document === "undefined") return
	const expires = new Date(Date.now() + days * 86400000).toUTCString()
	document.cookie = `${name}=${value};path=/;expires=${expires};SameSite=Lax`
}

function removeCookie(name: string) {
	if (typeof document === "undefined") return
	document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax`
}

type AuthState = {
	user: User | null
	token: string | null
	status: "idle" | "authenticated" | "unauthenticated"
	login: (email: string, password: string) => Promise<void>
	register: (data: { name: string; username: string; email: string; password: string }) => Promise<{ id: string; email: string; username: string }>
	verifyEmail: (email: string, code: string) => Promise<void>
	resendOtp: (email: string) => Promise<void>
	logout: () => Promise<void>
	fetchProfile: () => Promise<void>
	setUser: (u: Partial<User>) => void
	hydrate: () => Promise<boolean>
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			status: "idle",

			login: async (email, password) => {
				const { user, accessToken } = await authApi.login(email, password)
				localStorage.setItem("ripple.token", accessToken)
				setCookie("ripple.token", accessToken)
				set({ user, token: accessToken, status: "authenticated" })
			},

			register: async (data) => {
				const result = await authApi.register(data)
				set({ status: "unauthenticated" })
				return result
			},

			verifyEmail: async (email, code) => {
				await authApi.verifyEmail(email, code)
				set({ status: "unauthenticated" })
			},

			resendOtp: async (email) => {
				await authApi.resendOtp(email)
			},

			logout: async () => {
				try { await authApi.logout() } catch { /* ignore */ }
				localStorage.removeItem("ripple.token")
				removeCookie("ripple.token")
				set({ user: null, token: null, status: "unauthenticated" })
			},

			fetchProfile: async () => {
				try {
					const user = await usersApi.getMe()
					set({ user, status: "authenticated" })
				} catch {
					set({ user: null, token: null, status: "unauthenticated" })
				}
			},

			setUser: (u) =>
				set((s) => ({ user: s.user ? { ...s.user, ...u } : s.user })),

			hydrate: async () => {
				const token = localStorage.getItem("ripple.token")
				if (!token) {
					set({ status: "unauthenticated" })
					return false
				}
				try {
					const user = await usersApi.getMe()
					set({ user, token, status: "authenticated" })
					return true
				} catch {
					try {
						const { user, accessToken } = await authApi.refresh()
						localStorage.setItem("ripple.token", accessToken)
						setCookie("ripple.token", accessToken)
						set({ user, token: accessToken, status: "authenticated" })
						return true
					} catch {
						localStorage.removeItem("ripple.token")
						removeCookie("ripple.token")
						set({ user: null, token: null, status: "unauthenticated" })
						return false
					}
				}
			},
		}),
		{ name: "ripple.auth", partialize: (s) => ({ user: s.user, token: s.token, status: s.status }) },
	),
)
