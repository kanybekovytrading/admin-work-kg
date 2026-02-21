import { styled } from "@mui/material/styles";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "#shared/ui/button/Button";

const ErrorFallback: FC = () => {
   const { t } = useTranslation("common");
   const navigate = useNavigate();

   return (
      <Container>
         <img src="https://i.imgur.com/qIufhof.png" alt="Error" />
         <h1>{t("error")}</h1>
         <p>{t("errorFbTitle")}</p>
         <div className="info">
            <Button variant="text" onClick={() => navigate("/")}>
               {t("errorFbGoBack")}
            </Button>
         </div>
      </Container>
   );
};

export default ErrorFallback;

const Container = styled("div")`
   text-align: center;
   margin: auto;
   padding: 4em;
   display: grid;
   place-items: center;
   height: 100%;
   place-content: center;
   img {
      width: 256px;
      height: 225px;
   }

   h1 {
      margin-top: 1rem;
      font-size: 35px;
      text-align: center;

      span {
         font-size: 60px;
      }
   }

   p {
      margin-top: 1rem;
   }

   .info {
      margin-top: 3em;
      font-size: 12px;

      button {
         text-decoration: none;
         color: rgb(84, 84, 206);
         :hover {
            background-color: rgba(84, 84, 206, 0.2);
         }
      }
   }
`;
