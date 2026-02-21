import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ruRU } from "@mui/x-date-pickers/locales";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { ComponentProps } from "react";
import { FieldError } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { ErrorText, Label } from "#shared/ui/input/Input";

import "dayjs/locale/ru";

type CustomDatePickerProps = ComponentProps<typeof MUIDatePicker> & {
   error?: FieldError;
   label?: string;
   labelClassName?: string;
   fullWidth?: boolean;
   width?: string;
};

export const DatePicker: React.FC<CustomDatePickerProps> = ({
   error,
   label,
   labelClassName = "",
   fullWidth,
   width = "180px",
   ...props
}) => {
   const { t } = useTranslation();
   return (
      <FormControl fullWidth={fullWidth} style={{ width }}>
         {label && <Label className={labelClassName}>{label}</Label>}
         <LocalizationProvider
            adapterLocale="ru"
            localeText={
               ruRU.components.MuiLocalizationProvider.defaultProps.localeText
            }
            dateAdapter={AdapterDayjs}
         >
            <StyledDatePicker
               localeText={
                  ruRU.components.MuiLocalizationProvider.defaultProps
                     .localeText
               }
               format="DD.MM.YYYY"
               {...props}
            />
         </LocalizationProvider>
         {error && <ErrorText>{t(error?.message as "common:error")}</ErrorText>}
      </FormControl>
   );
};

const StyledDatePicker = styled(MUIDatePicker)`
   & .MuiInputBase-root {
      border-radius: 8px;
      background-color: ${(props) =>
         props.disabled ? "rgba(231, 231, 231, 0.42)" : "transparent"};
      height: 40px;
      border: 1px solid #e3e8ec;
      font-size: 14px;
      box-shadow: none;

      .MuiOutlinedInput-notchedOutline {
         border: 1px solid #e3e8ec;
      }

      &.Mui-error {
         border-color: red !important;
      }

      &:hover {
         border-color: #e3e8ec;
      }

      &:focus-within {
         border-color: #e3e8ec;
      }
   }
`;
