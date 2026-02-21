import { styled } from "@mui/material/styles";
import TextareaAutosize, {
   TextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";
import { forwardRef, useId } from "react";
import { FieldError } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { ErrorText } from "#shared/ui/input/Input";
import { RequiredSymbol } from "#shared/ui/required-symbol/RequiredSymbol";

type Props = TextareaAutosizeProps & {
   label?: string;
   error?: FieldError;
   id?: string;
};
const Textarea = forwardRef<HTMLTextAreaElement, Props>(
   ({ label, required, error, ...props }, ref) => {
      const { t } = useTranslation();
      const id = useId();
      return (
         <Container>
            {label && (
               <Label htmlFor={id}>
                  {label} {required && <RequiredSymbol>*</RequiredSymbol>}
               </Label>
            )}
            <StyledTextarea id={id} ref={ref} {...props} />
            {error && (
               <ErrorText>{t(error?.message as "common:error")}</ErrorText>
            )}
         </Container>
      );
   }
);

export default Textarea;

Textarea.displayName = "textarea";

const Container = styled("div")``;

const Label = styled("label")`
   font-size: 12px;
   font-weight: 700;
   margin-bottom: 5px;
   display: inline-block;
`;

const StyledTextarea = styled(TextareaAutosize)(({ disabled }) => ({
   borderRadius: "8px",
   padding: "10px 14px",
   backgroundColor: disabled ? "rgba(231, 231, 231, 0.42)" : "",
   height: "40px",
   minHeight: "40px",
   resize: "none",
   border: "1px solid #E3E8EC",
   display: "block",
   width: "100%",
   fontSize: "14px",
   fontFamily: "inherit",
   "&::placeholder": {
      color: "#8A949E",
   },

   "&:hover": { border: "1px solid #8A949E !important" },
   "&.Mui-error": { border: "1px solid red !important" },
   "&:focus-within": { border: "1px solid #C5CDD4" },
   "& svg": { marginRight: "8px" },
}));
