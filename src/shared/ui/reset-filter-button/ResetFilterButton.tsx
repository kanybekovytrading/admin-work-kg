import { styled } from "@mui/material/styles";

import { Button } from "#shared/ui/button/Button";

export const ResetFilterButton = styled(Button)`
   &.MuiButtonBase-root {
      border-radius: 8px;
      border: 1px solid #006ae2;

      height: 40px;
      width: fit-content;
   }
`;
