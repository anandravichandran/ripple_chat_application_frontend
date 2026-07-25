import { create } from "zustand"

type ProfileDrawerStore = {
	userId: string | null
	openProfile: (userId: string) => void
	closeProfile: () => void
}

export const useProfileDrawer = create<ProfileDrawerStore>((set) => ({
	userId: null,
	openProfile: (userId) => set({ userId }),
	closeProfile: () => set({ userId: null }),
}))
