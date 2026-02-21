import { Stack } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "#shared/ui/button/Button";

type ConfirmActionsProps = {
   onConfirm: () => void;
   onCancel: () => void;
};
export const ConfirmActions: FC<ConfirmActionsProps> = ({
   onCancel,
   onConfirm,
}) => {
   const { t } = useTranslation("common");
   return (
      <Stack justifyContent="center" mt="25px" flexDirection="row" gap="20px">
         <Button
            disableFocusRipple
            backgroundColor="#E9F3FF"
            colorText="#006AE2"
            onClick={onCancel}
         >
            {t("no")}
         </Button>
         <Button disableFocusRipple variant="contained" onClick={onConfirm}>
            {t("yes")}
         </Button>
      </Stack>
   );
};
