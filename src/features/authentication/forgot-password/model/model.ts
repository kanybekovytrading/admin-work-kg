import { TFunction } from "i18next";
import { z } from "zod";

export const forgotPasswordSchema = (t: TFunction<["auth"]>) =>
   z.object({
      inn: z
         .string()
         .trim()
         .min(14, { message: t("emptyField") }),
   });

export type ForgotPasswordFormData = z.infer<
   ReturnType<typeof forgotPasswordSchema>
>;

export type ForgotPasswordApiData = {
   inn: string;
};
