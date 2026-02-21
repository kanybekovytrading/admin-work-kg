import Box from "@mui/material/Box";
import MuiPagination, {
   PaginationProps as MuiPaginationProps,
} from "@mui/material/Pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { FC } from "react";

import Select from "#shared/ui/select/Select";

type PaginationProps = Omit<MuiPaginationProps, "onChange" | "size"> & {
   onChange?: (page: number, size?: number) => void;
   size?: number;
};

const Pagination: FC<PaginationProps> = ({
   page = 1,
   count = 20,
   size = 20,
   onChange = () => "",
   ...props
}) => {
   const handleFirstPage = () => {
      if (page !== 1) {
         onChange(1);
      }
   };

   const handleLastPage = () => {
      if (page !== count) {
         onChange(count);
      }
   };

   return (
      <Box display="flex" my="18px" gap="20px" alignItems="center">
         <Box display="flex" gap="4px" alignItems="center">
            <ChevronsLeft
               onClick={handleFirstPage}
               opacity={page === 0 ? "0.38" : undefined}
               pointerEvents={page === 0 ? "none" : "auto"}
            />
            <MuiPagination
               count={count}
               page={page}
               onChange={(_e, selectedPage) => onChange(selectedPage)}
               {...props}
            />
            <ChevronsRight
               onClick={handleLastPage}
               opacity={page + 1 === count ? "0.38" : undefined}
               pointerEvents={page == count ? "none" : "auto"}
            />
         </Box>

         <Select
            isSearchable={false}
            value={{ label: size, value: size }}
            onChange={(val) => onChange(page, val?.value)}
            options={PAGINATION_SIZES}
            width="80px"
         />
      </Box>
   );
};

export default Pagination;

const PAGINATION_SIZES = [
   { label: 5, value: 5 },
   { label: 20, value: 20 },
   { label: 50, value: 50 },
   { label: 100, value: 100 },
];
