import { styled } from "@mui/material/styles";
import { ArrowLeft } from "lucide-react";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "#shared/ui/button/Button";
import { ContentCard } from "#shared/ui/content-card/ContentCard";

type GoBackSectionProps = {
   // По дизайну GoBackSection иногда идет "вместе" с основным контентом а иногда раздельно
   // поэтому создал проп type в зависимости от него будут меняться стили
   type?: "separate" | "join";

   goBackTitle?: string;
   goBackOnClick?: () => void;

   children?: ReactNode;
};

const GoBackSection: FC<GoBackSectionProps> = ({
   goBackTitle,
   goBackOnClick,
   type = "separate",

   children,
}) => {
   const { t } = useTranslation("common");
   const navigate = useNavigate();

   return (
      <Container type={type}>
         <StyledButton
            disableRipple
            onClick={goBackOnClick ? goBackOnClick : () => navigate(-1)}
            startIcon={<ArrowLeft />}
            id="go-back-btn"
         >
            {goBackTitle ?? t("goBack")}
         </StyledButton>

         {children}
      </Container>
   );
};

export default GoBackSection;

const Container = styled(ContentCard)<{ type: string }>`
   display: flex;
   justify-content: space-between;
   align-items: center;

   ${({ type }) => {
      if (type === "separate") {
         return {
            marginBottom: "20px",
         };
      }
      return {
         borderBottomLeftRadius: 0,
         borderBottomRightRadius: 0,
         borderBottom: "none",
      };
   }};
`;

const StyledButton = styled(Button)`
   &.MuiButtonBase-root {
      padding: 6px 0;
      font-weight: 700;
      font-size: 18px;
      color: #1f2328;
      svg {
         width: 22px;
         height: 22px;
         color: #006ae2;
      }

      :hover {
         background: transparent;
      }
   }
`;
