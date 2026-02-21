import { z } from "zod";

export const requiredString = (message?: string) => {
   return z.string().min(1, { message: message || "это поле обязательное!" });
};

export const labelValueSchema = z.object({
   label: z.string(),
   value: z.string(),
});
