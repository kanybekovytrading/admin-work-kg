import { Divider, Stack, styled } from "@mui/material";
import { ru } from "date-fns/locale";
import { ComponentProps, FC, useMemo, useState } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { useTranslation } from "react-i18next";
import { SingleValue } from "react-select";

import { formatDate } from "#shared/lib/date.helper.ts";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import Select from "../select/Select";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { kg } from "./lib/getLocaledDateRange";

const Wrapper = styled("div")({
   display: "flex",
   flexDirection: "column",
   borderRadius: "16px",
});
const InputWrapper = styled("div")({
   display: "flex",
   justifyContent: "space-between",
   width: "100%",
   maxWidth: "500px",
   marginBottom: "20px",
   flexDirection: "column",
   gap: "20px",
});
type SelectionRange = {
   label: string;
   range: {
      startDate: Date;
      endDate: Date;
   };
};
// type SelectionRange = (typeof predefinedRanges)[0];

type DateRangePickerProps = ComponentProps<typeof DateRange> & {
   onDateRangeChange?: (range: Range) => void;
   dateRange?: Range;
   maxRange?: number;
   onCancel: () => void;
};

export const DateRangePicker: FC<DateRangePickerProps> = ({
   onDateRangeChange = () => undefined,
   dateRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
   },
   maxRange,
   onCancel,
   ...props
}) => {
   const { t } = useTranslation();
   const [rangeOption, setRangeOption] = useState<SelectionRange | null>(null);

   const today = new Date();
   const sevenDaysAgo = new Date();
   sevenDaysAgo.setDate(today.getDate() - 7);
   const initialRange = useMemo(
      () => ({
         startDate: sevenDaysAgo,
         endDate: new Date(),
         key: "selection",
      }),
      []
   );

   const [range, setRange] = useState<Range[]>([initialRange]);

   const handleRangeChange = (ranges: RangeKeyDict) => {
      const { selection } = ranges;

      const startDate = selection.startDate;
      const endDate = selection.endDate;

      // Проверка на максимальный диапазон, если maxRange задан
      if (maxRange && endDate && startDate) {
         const diffInTime = endDate.getTime() - startDate.getTime();
         const diffInDays = diffInTime / (1000 * 3600 * 24); // Разница в днях

         if (diffInDays > maxRange) {
            const newEndDate = new Date(startDate);
            newEndDate.setDate(newEndDate.getDate() + maxRange); // Устанавливаем конец диапазона на maxRange дней позже
            setRange([{ startDate, endDate: newEndDate, key: "selection" }]);
         } else {
            setRange([selection]);
         }
      } else {
         setRange([selection]);
      }
   };
   const handleRangeSelect = (selectedOption: SingleValue<SelectionRange>) => {
      if (!selectedOption) return;
      setRange([{ ...selectedOption.range, key: "selection" }]);
      setRangeOption(selectedOption);
   };

   const onSubmit = () => {
      return onDateRangeChange(range[0]);
   };

   const currentLocale = localStorage.getItem("LANGUAGE") === "kg" ? kg : ru;

   const predefinedRanges: SelectionRange[] = useMemo(
      () => [
         {
            label: t("today"),
            range: { startDate: new Date(), endDate: new Date() },
         },
         {
            label: t("yesterday"),
            range: {
               startDate: new Date(
                  new Date().setDate(new Date().getDate() - 1)
               ),
               endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            },
         },
         {
            label: t("forWeek"),
            range: {
               startDate: new Date(
                  new Date().setDate(new Date().getDate() - 7)
               ),
               endDate: new Date(),
            },
         },
         {
            label: t("forMonth"),
            range: {
               startDate: new Date(
                  new Date().setMonth(new Date().getMonth() - 1)
               ),
               endDate: new Date(),
            },
         },
         {
            label: t("forQuarter"),
            range: {
               startDate: new Date(
                  new Date().setMonth(new Date().getMonth() - 3)
               ),
               endDate: new Date(),
            },
         },
      ],
      [t]
   );

   return (
      <Wrapper>
         <InputWrapper>
            {/* <Select<SelectionRange>
               label={t("selectRange")}
               placeholder={t("selectRange")}
               onChange={(selected) => {
                  const selectedLabel = (selected as SelectionRange)?.label;
                  const found = predefinedRanges.find(
                     (item) => item.label === selectedLabel
                  );
                  if (found) handleRangeSelect(found);
               }}
               value={rangeOption}
               options={predefinedRanges}
            /> */}
            <Select<SelectionRange>
               id="range-select"
               label={t("selectRange")}
               placeholder={t("selectRange")}
               value={rangeOption}
               getOptionValue={(option) => option.label}
               getOptionLabel={(option) => option.label}
               options={predefinedRanges}
               onChange={(e) => {
                  const selectedLabel = (e as SelectionRange)?.label;
                  const selected = predefinedRanges.find(
                     (item) => item.label === selectedLabel
                  );
                  if (selected) handleRangeSelect(selected);
               }}
            />
            <Input
               label={t("dateFrom")}
               type="text"
               value={
                  range[0]?.startDate
                     ? formatDate(range[0].startDate, "DD.MM.YYYY")
                     : ""
               }
               fullWidth
            />
            <Input
               label={t("dateTo")}
               type="text"
               value={
                  range[0].endDate
                     ? formatDate(range[0].endDate, "DD.MM.YYYY")
                     : ""
               }
               fullWidth
            />
         </InputWrapper>
         <StyledDateRange
            ranges={range}
            onChange={handleRangeChange}
            showDateDisplay={false}
            scroll={{ enabled: false }}
            direction="horizontal"
            monthDisplayFormat="MMMM yyyy"
            months={1}
            locale={currentLocale}
            weekdayDisplayFormat="EEEEEE"
            {...props}
         />
         <Divider />
         <Stack
            flexDirection="row"
            justifyContent="end"
            width="100%"
            gap="20px"
            paddingTop="24px"
         >
            <Button onClick={onCancel} variant="ghost-blue">
               {t("cancel")}
            </Button>
            <Button variant="contained" onClick={onSubmit}>
               {t("apply")}
            </Button>
         </Stack>
      </Wrapper>
   );
};
const StyledDateRange = styled(DateRange)`
   &.rdrCalendarWrapper {
      height: 365px;
   }
   .rdrMonths {
      justify-content: center;
   }
   & .rdrMonthPicker,
   &.rdrYearPicker {
      margin: 0 5px;
   }
`;
