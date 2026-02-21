import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Button } from "#shared/ui/button/Button";

// Components below used outside of login module
// If I place them in a LoginForm component they will break code-splitting(meaning bigger bungle size)

export const StyledForm = styled("form")(({ theme }) => ({
   backgroundColor: theme.palette.background.paper,
   borderRadius: "53px",
   display: "flex",
   flexDirection: "column",
   gap: "15px",

   padding: "3rem 1.5rem",

   [theme.breakpoints.up("sm")]: {
      padding: "5rem",
   },
}));

export const SubmitButton = styled(Button)`
   height: 51px;
   font-size: 17.5px !important;
`;

export const StyledFormWrap = styled(Box)(({ theme }) => ({
   width: "90%",
   [theme.breakpoints.up("sm")]: {
      width: theme.breakpoints.values.sm,
   },
   borderRadius: "56px",

   background: `linear-gradient(rgb(0, 106, 226) 10%, rgba(0, 106, 226, 0) 30%)`,
   padding: "0.3rem",
}));
