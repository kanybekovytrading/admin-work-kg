import MUIDivider, {
   DividerProps as MUIDividerProps,
} from "@mui/material/Divider";
import { FC } from "react";

type DividerProps = MUIDividerProps;

const Divider: FC<DividerProps> = ({
   orientation = "horizontal",
   ...props
}) => {
   return (
      <MUIDivider
         sx={{ m: orientation === "horizontal" ? "18px 0" : "0 8px" }}
         {...props}
      />
   );
};

export default Divider;
