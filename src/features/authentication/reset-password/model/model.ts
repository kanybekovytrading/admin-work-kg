import { TFunction } from 'i18next'
import { z } from 'zod'

export const resetPasswordSchema = (t: TFunction<['auth', 'common']>) =>
	z
		.object({
			inn: z
				.string()
				.trim()
				.min(14, { message: t('emptyField') }),
			password: z.string().min(1, { message: t('emptyField') }),
			confirm: z
				.string()
				.min(1, { message: t('emptyField') })
				.regex(/^\S*$/, {
					message: t('noSpacesAllowed'),
				}),
		})
		.refine((data) => data.password === data.confirm, {
			message: t('passwordNotSimilar'),
			path: ['confirm'],
		})

export type ResetPasswordFormData = z.infer<
	ReturnType<typeof resetPasswordSchema>
>

export const mapToResetPasswordApiData = async (
	data: ResetPasswordFormData,
): Promise<any> => {
	return {
		email: data.inn,
		password: data.password,
	}
}
