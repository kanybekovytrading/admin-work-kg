import { create, useModal, muiDialogV5 } from "@ebay/nice-modal-react";
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Range } from "react-date-range";

import { FromToDates } from "#shared/ui/date-range-picker/DateRangePickerTrigger.tsx";
import { DateRangePicker } from "./DateRangePicker.tsx";

type DateRangePickerModalProps = {
   dates: FromToDates;
   maxRange?: number;
};

export const DateRangePickerModal = create<DateRangePickerModalProps>(
   ({ dates, maxRange = 7 }) => {
      const modal = useModal();

      const handleConfirm = async (range?: Range) => {
         const today = new Date();
         const sevenDaysAgo = new Date();
         sevenDaysAgo.setDate(today.getDate() - 6);

         const dateFrom = range?.startDate
            ? new Date(range.startDate)
            : sevenDaysAgo;
         const dateTo = range?.endDate ? new Date(range.endDate) : today;

         modal.resolve({ dateFrom, dateTo } as FromToDates);
         return modal.hide();
      };

      return (
         <StyledDialog {...muiDialogV5(modal)}>
            <DateRangePicker
               onDateRangeChange={(range) => handleConfirm(range)}
               dateRange={{
                  startDate: dates.dateFrom,
                  endDate: dates.dateTo,
                  key: "selection",
               }}
               maxDate={new Date()}
               {...(maxRange ? { maxRange } : {})}
               onCancel={modal.hide}
            />
         </StyledDialog>
      );
   }
);
const StyledDialog = styled(Dialog)`
   .MuiDialog-paper {
      padding: 20px 32px;
      width: 454px;
      border-radius: 12px;
   }
`;
