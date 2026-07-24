import { z } from "zod"

export const emailSchema = z.string().trim().email("Enter a valid email")

export const usernameSchema = z
	.string()
	.trim()
	.toLowerCase()
	.min(3, "At least 3 characters")
	.max(24, "At most 24 characters")
	.regex(/^[a-z0-9_.]+$/, "Lowercase letters, numbers, . _")

export const passwordSchema = z
	.string()
	.min(8, "At least 8 characters")
	.regex(/[A-Z]/, "Add an uppercase letter")
	.regex(/[a-z]/, "Add a lowercase letter")
	.regex(/[0-9]/, "Add a number")

export const registerSchema = z
	.object({
		name: z.string().trim().min(2, "Enter your full name"),
		username: usernameSchema,
		email: emailSchema,
		password: passwordSchema,
		confirm: z.string(),
		terms: z.literal(true, {
			errorMap: () => ({ message: "Please accept the terms" }),
		}),
	})
	.refine((v) => v.password === v.confirm, {
		message: "Passwords don't match",
		path: ["confirm"],
	})
export type RegisterInput = z.infer<typeof registerSchema>
export type RegisterValues = RegisterInput

export const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, "Enter your password"),
	remember: z.boolean().optional(),
})
export type LoginInput = z.infer<typeof loginSchema>
export type LoginValues = LoginInput

export const forgotSchema = z.object({ email: emailSchema })
export type ForgotInput = z.infer<typeof forgotSchema>
export type ForgotValues = ForgotInput

export const resetSchema = z
	.object({
		password: passwordSchema,
		confirm: z.string(),
	})
	.refine((v) => v.password === v.confirm, {
		message: "Passwords don't match",
		path: ["confirm"],
	})
export type ResetInput = z.infer<typeof resetSchema>
export type ResetValues = ResetInput

export const verifySchema = z.object({
	code: z.string().length(6, "Enter the 6-digit code").regex(/^\d+$/, "Digits only"),
})
export type VerifyInput = z.infer<typeof verifySchema>
export type VerifyValues = VerifyInput

export const createRoomSchema = z
	.object({
		name: z.string().trim().min(3, "At least 3 characters").max(48, "At most 48"),
		description: z.string().trim().max(200, "At most 200 characters").optional(),
		visibility: z.enum(["public", "private"]),
		password: z.string().optional(),
		icon: z.string().optional(),
		avatar: z.string().optional(),
	})
	.refine((v) => v.visibility !== "private" || (v.password && v.password.length >= 6), {
		message: "Private rooms need a password of 6+ characters",
		path: ["password"],
	})
export type CreateRoomInput = z.infer<typeof createRoomSchema>
export type CreateRoomValues = CreateRoomInput
// Legacy alias.
export const roomSchema = createRoomSchema
export type RoomInput = CreateRoomInput

export const messageSchema = z.object({
	content: z.string().trim().min(1).max(4000),
})
export type MessageInput = z.infer<typeof messageSchema>

export function passwordStrength(pw: string): { score: 0 | 1 | 2 | 3 | 4; label: string } {
	let score = 0
	if (pw.length >= 8) score++
	if (/[A-Z]/.test(pw)) score++
	if (/[a-z]/.test(pw)) score++
	if (/[0-9]/.test(pw)) score++
	if (/[^A-Za-z0-9]/.test(pw)) score = Math.min(4, score + 1)
	const labels = ["Too short", "Weak", "Fair", "Good", "Strong"] as const
	return { score: Math.min(4, score) as 0 | 1 | 2 | 3 | 4, label: labels[Math.min(4, score)] }
}
