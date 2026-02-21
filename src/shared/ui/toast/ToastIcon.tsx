import React from "react";

interface ToastIconProps {
   icon: React.ComponentType;
}

const ToastIcon: React.FC<ToastIconProps> = ({ icon: Icon }) => {
   return <Icon />;
};

export default ToastIcon;
