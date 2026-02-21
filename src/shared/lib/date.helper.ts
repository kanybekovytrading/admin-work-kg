import dayjs, { Dayjs } from "dayjs";

export const formatDate = (
   dateString?: string | Date | Dayjs,
   dateFormat?: string
) => {
   if (!dateString) return "";
   return dayjs(dateString).format(dateFormat || "DD.MM.YYYY HH:mm");
};

export const formatDateAccount = (
   dateString?: string | Date | Dayjs,
   dateFormat?: string
) => {
   if (!dateString) return "";
   return dayjs(dateString).format(dateFormat || "DD.MM.YYYY HH:mm:ss");
};
