import { show } from "@ebay/nice-modal-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { invalidateAccessToken } from "#shared/api/invalidateTokenEvent.ts";
import i18next from "#shared/locale/i18n.ts";
import { AlertModal } from "#shared/ui/alert-modal/AlertModal";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000;

const IdleSessionInvalidator = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      let timeoutId: number;

      const handleMouseMove = () => {
         if (timeoutId) {
            clearTimeout(timeoutId);
         }

         timeoutId = setTimeout(() => {
            show(AlertModal, {
               title: i18next.t("common:sessionExpired"),
               status: "uninitialized",
               onClick: () => dispatch(invalidateAccessToken()),
            });
         }, INACTIVITY_TIMEOUT);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
         window.removeEventListener("mousemove", handleMouseMove);
         clearTimeout(timeoutId);
      };
   }, [dispatch]);

   return null;
};

export default IdleSessionInvalidator;
