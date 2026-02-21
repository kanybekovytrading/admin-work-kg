import { create, useModal } from "@ebay/nice-modal-react";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Button } from "#shared/ui/button/Button";

export const ProjectChoiceModal = create(() => {
   const { t } = useTranslation(["common", "auth"]);
   const modal = useModal();

   const handleLegalChoice = () => {
      modal.resolve("legal");
      modal.hide();
   };

   const handleRkoChoice = () => {
      modal.resolve("rko");
      modal.hide();
   };

   const handleClose = () => {
      modal.resolve("exit");
      modal.hide();
      // if (onDismiss) onDismiss();
   };

   return (
      <Dialog
         open={modal.visible}
         onClose={handleClose}
         maxWidth="sm"
         fullWidth
         slotProps={{
            paper: {
               sx: {
                  borderRadius: 3,
                  p: 4,
               },
            },
         }}
      >
         <Stack spacing={4} alignItems="center">
            <Stack alignItems="center" spacing={2}>
               <Typography variant="h5" fontWeight="600">
                  {t("auth:projectChoice.title")}
               </Typography>
               <Typography color="text.secondary" textAlign="center">
                  {t("auth:projectChoice.description")}
               </Typography>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
               <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleLegalChoice}
                  sx={{
                     flex: 1,
                     justifyContent: "flex-start",
                     textAlign: "left",
                  }}
               >
                  <Stack spacing={1}>
                     <Typography variant="h6" fontWeight="600">
                        {t("auth:projectChoice.legal.title")}
                     </Typography>
                     <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.4 }}
                     >
                        {t("auth:projectChoice.legal.description")}
                     </Typography>
                  </Stack>
               </Button>

               <Button
                  fullWidth
                  variant="contained"
                  onClick={handleRkoChoice}
                  sx={{
                     flex: 1,
                     justifyContent: "flex-start",
                     textAlign: "left",
                  }}
               >
                  <Stack spacing={1}>
                     <Typography variant="h6" fontWeight="600">
                        {t("auth:projectChoice.rko.title")}
                     </Typography>
                     <Typography
                        variant="body2"
                        sx={{ lineHeight: 1.4, lineClamp: 2 }}
                     >
                        {t("auth:projectChoice.rko.description")}
                     </Typography>
                  </Stack>
               </Button>
            </Stack>

            <Typography
               variant="caption"
               color="text.secondary"
               textAlign="center"
            >
               {t("auth:projectChoice.footer")}
            </Typography>
         </Stack>
      </Dialog>
   );
});
