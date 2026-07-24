"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/types"
import { currentUser } from "@/lib/mock"

type AuthState = {
	user: User | null
	token: string | null
	status: "idle" | "authenticated" | "unauthenticated"
	signIn: (user?: Partial<User>) => void
	signOut: () => void
	setUser: (u: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			status: "idle",
			signIn: (user) =>
				set({
					user: { ...currentUser, ...(user ?? {}) },
					token: "mock-token",
					status: "authenticated",
				}),
			signOut: () => set({ user: null, token: null, status: "unauthenticated" }),
			setUser: (u) =>
				set((s) => ({ user: s.user ? { ...s.user, ...u } : s.user })),
		}),
		{ name: "ripple.auth" },
	),
)
