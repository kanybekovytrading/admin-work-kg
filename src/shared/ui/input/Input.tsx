import FormControl from "@mui/material/FormControl";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import React from "react";
import { FieldError } from "react-hook-form";

type Props = Omit<InputBaseProps, "error" | "style"> & {
   htmlFor?: string;
   label?: string;
   width?: string;
   placeholder?: string;
   error?: FieldError;
   id?: string;
   labelClassName?: string;
};

export const Input = React.forwardRef(function Input(
   {
      fullWidth,
      width,
      htmlFor,
      error,
      label,
      id,
      disabled,
      labelClassName = "",
      ...props
   }: Props,
   ref: React.Ref<HTMLInputElement>
) {
   const inputId = id || htmlFor;
   return (
      <FormControl fullWidth={fullWidth} style={{ width }}>
         {label && (
            <Label className={labelClassName} htmlFor={htmlFor}>
               {label}
            </Label>
         )}
         <StyledInput
            disabled={disabled ?? false}
            error={Boolean(error)}
            id={inputId}
            ref={ref}
            inputProps={{ maxLength: 150, ...props.inputProps }}
            {...props}
         />
         {error && <ErrorText>{error?.message}</ErrorText>}
      </FormControl>
   );
});

const StyledInput = styled(InputBase)`
   border-radius: 8px;
   padding-left: 14px;
   padding-right: 14px;
   background-color: ${(props) =>
      props.disabled ? "rgba(231, 231, 231, 0.42)" : "transparent"};

   height: 40px;
   border: 1px solid #e3e8ec;
   font-size: 14px;
   margin-top: auto;

   input:not(:disabled) {
      box-shadow: 0 0 0 1000px #ffffff inset;
      background-color: transparent;
   }

   &.Mui-error {
      border: 1px solid red !important;
   }

   &.Mui-error:hover {
      border: 1px solid red !important;
   }

   &.Mui-error:focus-within {
      border: 1px solid red !important;
   }

   &:hover {
      border-color: #e3e8ec !important;
   }

   &:focus-within {
      border-color: #e3e8ec !important;
   }
   &:focus {
      outline: none;
      border-color: #e3e8ec !important;
   }
`;

export const Label = styled("label")`
   color: #1f2328;
   font-size: 12px;
   font-weight: 700;
   margin-bottom: 4px;
`;

export const ErrorText = styled("span")`
   color: red;
   margin-bottom: 2px;
   font-size: 14px;
   font-weight: 500;
`;
