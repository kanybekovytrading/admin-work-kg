import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

export type StatusMatcher = (
   status: string,
   statusMap: Record<string, string>
) => { label: string; background: string };

type StatusTagProps = {
   status: string;
   matcher: StatusMatcher;
   statusMap: Record<string, string>;
};

const StatusTag: React.FC<StatusTagProps> = ({
   status,
   matcher = defaultMatcher,
   statusMap,
}) => {
   const { label, background } = matcher(status, statusMap);
   return <StyledChip style={{ background }} label={label} />;
};

export default StatusTag;

const defaultMatcher = () => {
   return { label: "Неизвестный статус", background: "black" };
};

const StyledChip = styled(Chip)`
   height: auto;
   .MuiChip-label {
      text-align: center;
      padding: 2px 8px 4px 8px;
      color: white;
      font-size: 12px;
      font-weight: 600;
   }
`;
