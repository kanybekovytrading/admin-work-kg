import { PopoverOrigin } from "@mui/material/Popover";
import React, { useState } from "react";

export const useToggleDropdownMenu = (
   width?: string,
   setWidthAsParent: boolean = true,
   anchorOrigin: PopoverOrigin = {
      vertical: "bottom",
      horizontal: "center",
   },
   transformOrigin: PopoverOrigin = {
      vertical: "top",
      horizontal: "center",
   }
) => {
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
   const [fullWidthStyles, setFullWidthStyles] = useState<{
      sx: object;
   }>({ sx: {} });

   const isMenuOpen = Boolean(anchorEl);

   const openHandler = (
      event: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLInputElement>
   ) => {
      event.stopPropagation();
      if (setWidthAsParent && event.target instanceof HTMLElement) {
         setFullWidthStyles({ sx: { width: event.target.offsetWidth } });
      } else {
         setFullWidthStyles({ sx: { width } });
      }
      setAnchorEl(event.currentTarget);
   };
   const closeHandler = () => {
      setAnchorEl(null);
   };
   return {
      isMenuOpen,
      openHandler,
      closeHandler,
      anchorEl,
      anchorOrigin,
      transformOrigin,
      fullWidthStyles,
   };
};
