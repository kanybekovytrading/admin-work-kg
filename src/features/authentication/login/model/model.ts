// import { TFunction } from "i18next";
import { TFunction } from 'i18next'
import { sha256 } from 'js-sha256'
import { z } from 'zod'

export const loginSchema = (t: TFunction<['auth', 'common']>) =>
	z
		.object({
			inn: z
				.string()
				.trim()
				.min(14, { message: t('emptyField') }),
			password: z
				.string()
				.trim()
				.min(1, { message: t('emptyField') })
				.regex(/^\S*$/, {
					message: t('noSpacesAllowed'),
				}),
			legalUserId: z.string().optional(),
			otp: z.string().optional(),
		})
		.refine((data) => !data.legalUserId || Number(data.otp?.length) > 0, {
			message: t('emptyField'),
			path: ['otp'],
		})

export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>

export const mapToLoginApiData = async (data: LoginFormData): Promise<any> => {
	return {
		username: data.inn,
		password: sha256(data.password),
		legalUserId: data.legalUserId,
		otp: Number(data.otp) || undefined,
	}
}
