import { styled } from "@mui/material/styles";
import { NavLink, NavLinkProps } from "react-router-dom";

type Props = NavLinkProps & {
   variant?: "default";
   color?: string;
};

const Link = styled(NavLink)<Props>`
   font-size: 14px;
   font-weight: 600;
   color: ${({ color }) => color || "#006AE2"};
   text-decoration: none;
`;

export default Link;
