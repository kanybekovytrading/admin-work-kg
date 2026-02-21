import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { FC } from "react";

import ErrorIcon from "./assets/error.svg?react";
import SuccessIcon from "./assets/success.svg?react";
import WarningIcon from "./assets/warning.svg?react";

export type IndicatorStatuses = keyof typeof QueryStatus;

const STATUSES = {
   rejected: {
      icon: <ErrorIcon />,
      color: "#F44B57",
   },
   fulfilled: {
      icon: <SuccessIcon />,
      color: "#26CA67",
   },
   uninitialized: {
      icon: <WarningIcon />,
      color: "#FED063",
   },
   pending: {
      icon: <CircularProgress color="inherit" />,
      color: "#006AE2",
   },
};

type StatusIndicatorProps = {
   status: IndicatorStatuses;
};
const StatusIndicator: FC<StatusIndicatorProps> = ({
   status = "fulfilled",
}) => {
   return (
      <Container color={STATUSES?.[status]?.color}>
         {STATUSES?.[status]?.icon}
      </Container>
   );
};

export default StatusIndicator;

const Container = styled("div")<{ color: string }>`
   width: 72px;
   height: 72px;
   display: grid;
   place-items: center;
   color: white;

   background-color: ${({ color }) => color};
   border-radius: 12px;
`;
