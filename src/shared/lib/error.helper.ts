import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import i18next from "#shared/locale/i18n.ts";

type ApiError = FetchBaseQueryError | SerializedError | undefined | unknown;

export type BackendError = {
   data: { message: string; status: number };
};

export const isBackendError = (error: ApiError): error is BackendError => {
   return Boolean((error as BackendError)?.data?.message);
};

export const isLocalError = (error: ApiError): error is SerializedError => {
   return Boolean((error as SerializedError)?.message);
};

export const getErrorMessage = (error: ApiError) => {
   let message = "";

   if (isBackendError(error)) {
      message = error?.data?.message;
   } else if (isLocalError(error)) {
      message = error?.message?.toString() || "";
   }

   if (message.length > 100 || !message) {
      return i18next.t("common:error");
   }

   return message;
};
