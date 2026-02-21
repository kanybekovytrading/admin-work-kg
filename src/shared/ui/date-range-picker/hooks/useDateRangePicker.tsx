import { useState } from "react";

import { FromToDates } from "#shared/ui/date-range-picker/DateRangePickerTrigger";

type Args = {
   dateFrom?: Date;
   dateTo?: Date;
};

export const useDateRange = ({ dateFrom, dateTo }: Args) => {
   const [dates, setDates] = useState<FromToDates>({
      dateFrom,
      dateTo,
   });

   const setDateRange = (newDates: FromToDates) => {
      setDates(newDates);
   };

   return { dates, setDateRange };
};
