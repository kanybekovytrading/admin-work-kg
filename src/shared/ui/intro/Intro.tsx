import { styled } from "@mui/material/styles";
import { FC } from "react";

import Logo from "#shared/assets/logo.svg?react";

/**
 * @deprecated
 */
export const Intro: FC = () => {
   return (
      <Container>
         <IconWrapper />
      </Container>
   );
};

// export default Intro;

const Container = styled("div")`
   width: 100vw;
   height: 100vh;

   display: grid;
   place-items: center;
`;

const IconWrapper = styled(Logo)`
   width: 350px;
   height: 350px;
`;
