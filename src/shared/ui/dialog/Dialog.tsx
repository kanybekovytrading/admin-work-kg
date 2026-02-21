import MuiDialog, {
   type DialogProps as MuiDialogProps,
} from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import React, { FC, forwardRef, ReactNode } from "react";

type DialogProps = MuiDialogProps & {
   children: ReactNode;
};

export const DialogTransition = forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export const Dialog: FC<DialogProps> = ({
   open,
   onClose,
   children,
   ...rest
}) => {
   return (
      <StyledDialog open={open} onClose={onClose} {...rest}>
         <>{children}</>
      </StyledDialog>
   );
};

const StyledDialog = styled(MuiDialog)`
   .MuiDialog-paper {
      padding: 32px;
      //width: 454px;
      border-radius: 12px;
      overflow-y: visible;
   }
`;
