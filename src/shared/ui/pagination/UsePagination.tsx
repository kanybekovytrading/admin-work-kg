import { useMemo } from "react";
import usePersistedState from "#shared/lib/hooks/usePersistedState";

function usePagination(initialPageSize = 20) {
   // const [currentPage, setCurrentPage] = useState(1);
   const [currentPage, setCurrentPage] = usePersistedState<number>(1, {
      type: "QUERY",
      key: "page",
   });

   // const [pageSize, setPageSize] = useState(initialPageSize);
   const [pageSize, setPageSize] = usePersistedState<number>(initialPageSize, {
      type: "QUERY",
      key: "size",
   });

   const offset = useMemo(
      () => (currentPage - 1) * pageSize,
      [currentPage, pageSize]
   );

   const goToNextPage = () => {
      setCurrentPage(currentPage + 1);
   };

   const goToPreviousPage = () => {
      setCurrentPage(Math.max(currentPage - 1, 1));
   };

   const setPage = (page: number) => {
      setCurrentPage(Math.min(Math.max(page, 1), 1)); // Ensure page is within bounds
   };

   const onChange = (page: number, size?: number) => {
      setCurrentPage(page);
      if (size && size !== pageSize) {
         setPageSize(size);
         setCurrentPage(1);
      }
   };

   return {
      page: currentPage,
      size: pageSize,
      goToNextPage,
      goToPreviousPage,
      setPage,
      onChange,
      offset,
   };
}

export default usePagination;
