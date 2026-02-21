import { ReactNode, Suspense } from "react";

interface LazyLoadingProps {
   fallback?: ReactNode;
   children: ReactNode;
}

export const LazyLoading: React.FC<LazyLoadingProps> = ({
   fallback = "loading",
   children,
}) => {
   return <Suspense fallback={<div>{fallback}</div>}>{children}</Suspense>;
};
