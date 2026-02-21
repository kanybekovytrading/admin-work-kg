import MuiButton, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";

type BtnProps = Omit<ButtonProps, "disabled"> & {
   backgroundColor?: string;
   isLoading?: boolean;
   width?: string;
   disabled?: boolean;
   colorText?: string;

   // used for link components
   to?: string;
};

export const Button = forwardRef<HTMLButtonElement, BtnProps>(
   (
      {
         backgroundColor,
         children,
         isLoading,
         disabled,
         width,
         colorText,
         disableElevation = true,
         ...props
      },
      ref
   ) => {
      return (
         <StyledButton
            ref={ref}
            width={width as string}
            disabled={disabled}
            backgroundcolor={backgroundColor as string}
            colortext={colorText as string}
            disableElevation={disableElevation}
            {...props}
         >
            {isLoading ? (
               <CircularProgress color="inherit" size="20px" />
            ) : (
               children
            )}
         </StyledButton>
      );
   }
);

Button.displayName = "Button";

const StyledButton = styled(MuiButton)<{
   backgroundcolor: string;
   width: string;
   colortext: string;
}>(({ backgroundcolor, width, colortext }) => ({
   "&.MuiButton-root": {
      ...(colortext && { color: colortext }),
      ...(backgroundcolor && { backgroundColor: backgroundcolor }),
      textTransform: "none",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      width,
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "21.86px",
      padding: "10px 12px",

      display: "flex",
      gap: "5px",
   },

   "&.Mui-disabled": {
      backgroundColor: "#B7B7B7 !important",
      color: "white",
      border: "#B7B7B7",
   },

   ".MuiCircularProgress-svg": {
      width: "20px",
      height: "20px",
   },
}));
