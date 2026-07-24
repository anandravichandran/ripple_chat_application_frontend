"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/types"
import { currentUser } from "@/lib/mock"

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
	signIn: (user?: Partial<User>) => void
	signUp: (email: string, name: string) => void
	verifyEmail: () => void
	signOut: () => void
	setUser: (u: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			status: "idle",
			signIn: (user) => {
				const token = "mock-token"
				setCookie("ripple.token", token)
				set({
					user: { ...currentUser, ...(user ?? {}) },
					token,
					status: "authenticated",
				})
			},
			signUp: (email, name) => {
				set({
					user: { ...currentUser, email, name, username: name.toLowerCase().replace(/\s+/g, ".") },
					status: "unauthenticated",
				})
			},
			verifyEmail: () => {
				set({ status: "unauthenticated" })
			},
			signOut: () => {
				removeCookie("ripple.token")
				removeCookie("ripple.auth")
				set({ user: null, token: null, status: "unauthenticated" })
			},
			setUser: (u) =>
				set((s) => ({ user: s.user ? { ...s.user, ...u } : s.user })),
		}),
		{ name: "ripple.auth" },
	),
)
