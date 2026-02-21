import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC, ReactNode } from "react";

const theme = createTheme({
   typography: {
      fontFamily: "Manrope",
      body1: { lineHeight: "normal" },
      body2: { lineHeight: "normal" },
      subtitle1: { lineHeight: "normal" },
   },
   components: {
      MuiSelect: {
         styleOverrides: {
            select: {
               paddingTop: "10px",
               paddingBottom: "10px",
            },
            root: {
               borderRadius: "8px",
            },
         },
      },
      MuiButton: {
         variants: [
            {
               props: { variant: "ghost-blue" },
               style: {
                  color: "#006AE2",
                  backgroundColor: "#E9F3FF",
               },
            },
         ],
      },
   },
});

type MUIThemeProviderProps = {
   children: ReactNode;
};

const MUIThemeProvider: FC<MUIThemeProviderProps> = ({ children }) => {
   return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;

// CUSTOM MUI DECLARATIONS
declare module "@mui/material/Button" {
   interface ButtonPropsVariantOverrides {
      "ghost-blue": true;
   }
}
