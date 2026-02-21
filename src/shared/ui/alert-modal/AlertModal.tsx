import { create, useModal } from "@ebay/nice-modal-react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Button } from "#shared/ui/button/Button";
import StatusDialog from "#shared/ui/status-dialog/StatusDialog";
import { IndicatorStatuses } from "#shared/ui/status-indicator/StatusIndicator";

type Props = {
   title: string;
   buttonTitle: string;
   status: IndicatorStatuses;
   onClick?: () => void;
};

export const AlertModal = create(
   ({ title, buttonTitle, status = "fulfilled", onClick }: Props) => {
      const { t } = useTranslation("common");
      const modal = useModal();

      const onSubmit = () => {
         onClick?.();
         modal.hide();
      };
      return (
         <StatusDialog
            disableRestoreFocus
            open={modal.visible}
            onClose={onSubmit}
            slotProps={{ transition: { onExited: modal.reject } }}
            status={status}
            content={{
               [status]: {
                  title,
                  actions: (
                     <Button
                        autoFocus
                        disableFocusRipple
                        sx={{ margin: "0 auto" }}
                        variant="contained"
                        onClick={onSubmit}
                     >
                        {buttonTitle ?? t("continue")}
                     </Button>
                  ),
               },
            }}
         >
            <Stack
               display="flex"
               flexDirection="column"
               alignItems="center"
               gap="32px"
            >
               <Typography
                  fontWeight="600"
                  fontSize="20px"
                  textAlign="center"
                  lineHeight="124%"
               >
                  {title}
               </Typography>
            </Stack>
         </StatusDialog>
      );
   }
);
