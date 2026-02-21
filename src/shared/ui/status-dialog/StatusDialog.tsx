import { DialogProps } from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FC, ReactNode } from "react";

import { Dialog } from "#shared/ui/dialog/Dialog";
import StatusIndicator, {
   IndicatorStatuses,
} from "#shared/ui/status-indicator/StatusIndicator";

type StatusDialogProps = Omit<DialogProps, "content"> & {
   status: IndicatorStatuses;
   content: ContentType;
};

type ContentFields = {
   title?: ReactNode;
   description?: ReactNode;
   actions?: ReactNode;
};
type ContentType = Partial<Record<IndicatorStatuses, ContentFields>>;

const StatusDialog: FC<StatusDialogProps> = ({
   status,
   content,
   ...dialogProps
}) => {
   const fields = content?.[status];
   return (
      <StyledDialog {...dialogProps}>
         <span className="status-icon">
            <StatusIndicator status={status!} />
         </span>
         {fields?.title && (
            <Typography
               textAlign="center"
               fontSize="20px"
               fontWeight={600}
               mb="12px"
            >
               {fields?.title}
            </Typography>
         )}
         {fields?.description && (
            <Typography fontSize="14px" mb="12px" textAlign="center">
               {fields?.description}
            </Typography>
         )}
         {fields?.actions}
      </StyledDialog>
   );
};

export default StatusDialog;

const StyledDialog = styled(Dialog)`
   .MuiDialog-paper {
      padding: 32px;
      width: 454px;
      border-radius: 12px;
      .status-icon {
         display: inline-block;
         margin: 0 auto 32px;
      }
   }
`;
