import { styled } from "@mui/material/styles";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";

import { useTranslation } from "react-i18next";
import Link from "#shared/ui/link/Link";

type GoBackProps = {
   to?: string;
};

const GoBackButton: FC<GoBackProps> = ({ to = "/login" }) => {
   const { t } = useTranslation("common");

   return (
      <StyledLink id="go-back-link" to={to}>
         <ArrowLeft />
         {t("goBack")}
      </StyledLink>
   );
};

export default GoBackButton;

const StyledLink = styled(Link)`
   display: flex;
   gap: 6px;
   align-items: center;
   margin-right: auto;
   font-weight: 700;
   font-size: 14px;
   color: #1f2328;
   padding: 10px 12px;
   svg {
      color: #006ae2;
   }
   transition: 0.2s;
   &:hover {
      background: rgba(25, 118, 210, 0.04);
   }
`;
