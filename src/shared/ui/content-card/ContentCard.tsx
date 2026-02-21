import { styled } from "@mui/material/styles";

type ContentCardProps = {
   background?: string;
   mb?: string;
   height?: string;
};

export const ContentCard = styled("div")<ContentCardProps>`
   border: 1px solid #e3e8ec;
   border-radius: 12px;
   padding: 18px 20px;
   background: ${({ background }) => background || "white"};
   margin-bottom: ${({ mb }) => mb};

   height: ${({ height }) => `calc(${height} - 64px)`};
`;

export const ContentContainer = styled(ContentCard)`
   flex: 1;
   display: flex;
   flex-direction: column;
   margin-bottom: 18px;
`;
