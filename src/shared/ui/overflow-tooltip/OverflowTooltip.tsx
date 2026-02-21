import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

type OverflowTooltipProps = Omit<TooltipProps, "children" | "title"> & {
   children: ReactNode;
   maxWidth: string;
};
const OverflowTooltip: FC<OverflowTooltipProps> = ({
   children,
   maxWidth,
   ...props
}) => {
   const textRef = useRef<HTMLDivElement | null>(null);
   const [isOverflowed, setIsOverflowed] = useState(false);

   useEffect(() => {
      const checkOverflow = () => {
         const { current } = textRef;
         if (current) {
            setIsOverflowed(current.scrollWidth > current.clientWidth);
         }
      };

      checkOverflow();
      window.addEventListener("resize", checkOverflow);

      return () => {
         window.removeEventListener("resize", checkOverflow);
      };
   }, []);

   return (
      <Tooltip
         disableHoverListener={!isOverflowed}
         {...props}
         title={isOverflowed ? children : ""}
      >
         <div
            ref={textRef}
            style={{
               overflow: "hidden",
               textOverflow: "ellipsis",
               whiteSpace: "nowrap",
               maxWidth,
            }}
         >
            {children}
         </div>
      </Tooltip>
   );
};

export default OverflowTooltip;
