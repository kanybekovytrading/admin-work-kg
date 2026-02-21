import { styled } from "@mui/material/styles";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const StyledContainer = styled("div")({
   display: "flex",
   flexDirection: "column",
   gap: "16px",
   justifyContent: "center",
});

const NoData = styled("h1")({
   fontSize: "24px",
   fontWeight: "700",
   lineHeight: "32.78px",
   color: "#8A949E",
});

const Description = styled("h1")({
   fontSize: "16px",
   fontWeight: "500",
   lineHeight: "21.86px",
   color: "#8A949E",
});

type NoDataFoundProps = {
   title?: string;
   description?: string;
};

export const NoDataFound: FC<NoDataFoundProps> = ({ title, description }) => {
   const { t } = useTranslation("common");
   return (
      <StyledContainer>
         <NoData>{title ?? t("notFound")}</NoData>
         <Description>{description ?? t("notFoundDetails")}</Description>
      </StyledContainer>
   );
};
