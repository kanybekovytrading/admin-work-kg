import { show } from "@ebay/nice-modal-react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { DateRangePickerModal } from "#shared/ui/date-range-picker/DateRangePickerModal";
import { Label } from "#shared/ui/input/Input";

import CalendarIcon from "./assets/calendar.svg?react";

export type FromToDates = { dateFrom?: Date; dateTo?: Date };

type DateRangePickerTriggerProps = {
   onChange: (dates: FromToDates) => void;
   value: FromToDates;
   textBtn?: string;
   maxRange?: number;
   label?: string;
};

export const DateRangePickerTrigger: FC<DateRangePickerTriggerProps> = ({
   onChange,
   value,
   label,
   textBtn,
   maxRange = 7,
}) => {
   const { t } = useTranslation("common");
   const onDateClick = async () => {
      const newDates = await show(DateRangePickerModal, {
         dates: value,
         maxRange,
      });
      onChange(newDates as FromToDates);
   };

   const formattedValue =
      value.dateFrom && value.dateTo
         ? `${dayjs(value.dateFrom).format("DD.MM.YYYY")} - ${dayjs(value.dateTo).format("DD.MM.YYYY")}`
         : t("period");

   return (
      <Box display="flex" flexDirection="column">
         {label && <Label>{label ?? t("period")}</Label>}
         <StyledDateWrap onClick={onDateClick}>
            <Typography color="#1F2328" fontWeight="400" fontSize="14px">
               {textBtn ? textBtn : formattedValue}
            </Typography>
            <CalendarIcon />
         </StyledDateWrap>
      </Box>
   );
};

const StyledDateWrap = styled("div")`
   width: 216px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   cursor: pointer;
   padding: 10px 14px;
   border-radius: 8px;
   border: 1px solid #e3e8ec;
`;
