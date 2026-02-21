import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   TableOptions,
   useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useMemo } from "react";

import { NoDataFound } from "#shared/ui/table/NoDataFound";

const SIZE_SETTINGS = {
   small: {
      HEAD_ITEM_PADDING: "0px 8px",
      DATA_ITEM_PADDING: "17px 8px",
   },
   medium: {
      HEAD_ITEM_PADDING: "28px 16px",
      DATA_ITEM_PADDING: "24px 16px",
   },
};
const StyledTable = styled("table")`
   background-color: white;
   border-collapse: collapse;
   width: 100%;
   font-style: normal;
   line-height: normal;
   border: none !important;
   overflow: auto;
   border-radius: 12px;

   tr:hover {
      background-color: #edf1f5;
      z-index: 4;
   }

   tr {
      z-index: 4;
   }
`;
const StyledTableHeader = styled("thead")<{ size: "small" | "medium" }>`
   background-color: rgb(246, 248, 250);
   height: 32px;
   border-radius: 12px 12px 0 0;
   position: sticky;
   top: 0;

   text-align: left;
   color: #59636d;
   font-size: 12px;
   font-weight: 700;
   th {
      padding: ${(props) =>
         SIZE_SETTINGS[props.size].HEAD_ITEM_PADDING} !important;
   }
`;

const StyledHeaderCell = styled("div")`
   display: flex;
   align-items: center;
   gap: 5px;
   white-space: nowrap;
`;

const StyledTableItem = styled("td")<{ size: "small" | "medium" }>`
   padding: ${(props) =>
      SIZE_SETTINGS[props.size].DATA_ITEM_PADDING} !important;
   white-space: nowrap;
   align-items: center;
   color: #262c2d;
   font-size: 14px;
   font-weight: 400;
`;

const StyledTableDataCell = styled("td")`
   border-top: 1px solid #e7e7e7;
   padding-top: 22px;
   padding-bottom: 22px;
   word-break: break-word;
   padding-left: 8px;
   &:first-of-type {
      padding-left: 12px;
   }

   &:last-child {
      padding-right: 12px;
   }
`;

const StyledTableRow = styled("tr")<{ clickable?: boolean }>(
   ({ clickable }) => ({
      zIndex: 4,
      ...(clickable && {
         cursor: "pointer",
         "&:hover": {
            backgroundColor: "#edf1f5",
         },
      }),
   })
);

const StyledTableBody = styled(
   "tbody",
   {}
)(() => {
   return {};
});

export type ReactTableProps<T extends object> = {
   data?: T[];
   columns: ColumnDef<T>[];
   pageCount?: number;
   className?: string;
   loading?: boolean;
   onRowClick?: (row: T) => void;
   tableOptions?: Partial<
      Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">
   >;

   size?: string;
   customNotFound?: ReactNode;
   customNotFoundSlots?: { title?: string; description?: string };

   showPagination?: boolean;
};

function Table<T extends object>({
   data,
   columns,
   className,
   loading,
   onRowClick,
   tableOptions,
   size = "small",
   customNotFound,
   customNotFoundSlots,
}: Readonly<ReactTableProps<T>>) {
   const memoizedColumns = useMemo(() => columns, [columns]);
   const memoizedData = useMemo(() => data || [], [data]);

   const table = useReactTable<T>({
      ...tableOptions,
      data: memoizedData,
      columns: memoizedColumns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      autoResetPageIndex: true,
   });

   const columnCount = table.getAllColumns().length;

   const skeletons = Array.from({ length: 5 }, (_, i) => i);

   const getNotFoundMessage = () => {
      if (!loading && (!memoizedData || memoizedData.length === 0)) {
         if (customNotFound) {
            return customNotFound;
         }
         return (
            <Box my={15} textAlign="center">
               <NoDataFound {...customNotFoundSlots} />
            </Box>
         );
      }
   };

   const notFoundMessage = getNotFoundMessage();

   return (
      <Box minWidth="100%" flex={1} display="flex" flexDirection="column">
         <Box flex={notFoundMessage ? 0 : 1}>
            <StyledTable className={className} style={{ minWidth: "100%" }}>
               <StyledTableHeader
                  size={size as "small" | "medium"}
                  style={{ borderBottom: "1.5px solid #E3E8EC" }}
               >
                  {table.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header: any) => {
                           const isSortable =
                              header.column.columnDef.meta?.sortable;
                           const styles =
                              header.column.columnDef.meta?.styles || {};

                           return (
                              <th key={header.id} className="thHead">
                                 <StyledHeaderCell
                                    style={styles}
                                    className={
                                       header.column.getCanSort()
                                          ? "cursor-pointer select-none"
                                          : ""
                                    }
                                    onClick={
                                       isSortable
                                          ? header.column.getToggleSortingHandler()
                                          : undefined
                                    }
                                 >
                                    {header.isPlaceholder
                                       ? null
                                       : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                         )}
                                 </StyledHeaderCell>
                              </th>
                           );
                        })}
                     </tr>
                  ))}
               </StyledTableHeader>

               <StyledTableBody>
                  {loading ? (
                     <>
                        {skeletons.map((skeleton) => (
                           <tr key={skeleton}>
                              {Array.from(
                                 { length: columnCount },
                                 (_, i) => i
                              ).map((elm) => (
                                 <StyledTableDataCell key={elm}>
                                    <Skeleton height={20} />
                                 </StyledTableDataCell>
                              ))}
                           </tr>
                        ))}
                     </>
                  ) : (
                     table.getRowModel().rows.map((row) => {
                        const isClickable = Boolean(onRowClick);
                        return (
                           <StyledTableRow
                              key={row.id}
                              clickable={isClickable}
                              style={{ borderBottom: "1.5px solid #E3E8EC" }}
                              onClick={
                                 isClickable
                                    ? () => onRowClick?.(row.original)
                                    : undefined
                              }
                           >
                              {row.getVisibleCells().map((cell: any) => {
                                 const styles =
                                    cell.column.columnDef.meta?.styles || {};
                                 return (
                                    <StyledTableItem
                                       size={size as "small" | "medium"}
                                       style={styles}
                                       key={cell.id}
                                    >
                                       {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                       )}
                                    </StyledTableItem>
                                 );
                              })}
                           </StyledTableRow>
                        );
                     })
                  )}
               </StyledTableBody>
            </StyledTable>
         </Box>
         {getNotFoundMessage()}
      </Box>
   );
}

export default Table;
