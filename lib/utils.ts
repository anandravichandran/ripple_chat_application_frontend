import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function initialsFrom(name: string) {
	return name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((s) => s[0]?.toUpperCase() ?? "")
		.join("")
}

export function compact<T>(arr: (T | false | null | undefined)[]): T[] {
	return arr.filter(Boolean) as T[]
}
