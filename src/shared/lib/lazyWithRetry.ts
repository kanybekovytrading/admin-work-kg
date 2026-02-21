import { lazy } from "react";

import { SCRIPT_RETRY_COUNT } from "#shared/consts/localStorage.ts";

export const lazyWithRetry: typeof lazy = (importFunc) => {
   return lazy(() =>
      // @ts-expect-error
      importFunc().catch(() => {
         const refreshCount =
            Number(localStorage.getItem(SCRIPT_RETRY_COUNT)) || 0;

         if (refreshCount < 1) {
            localStorage.setItem(SCRIPT_RETRY_COUNT, `${refreshCount + 1}`);

            window.location.reload();
         }
      })
   );
};
