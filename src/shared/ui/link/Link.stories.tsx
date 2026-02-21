import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom"; // adjust the import based on your file structure
import Link from "./Link";

const meta: Meta<typeof Link> = {
   title: "shared/Link",
   component: Link,
   render: (args) => {
      return (
         <BrowserRouter>
            <Link {...args} />
         </BrowserRouter>
      );
   },
   parameters: {
      layout: "centered",
      backgrounds: {
         default: "light",
         values: [
            { name: "light", value: "#fff" },
            { name: "dark", value: "#333" },
         ],
      },
   },
   tags: ["autodocs"],
   argTypes: {
      variant: {
         control: { type: "select", options: ["default"] },
      },
      color: {
         control: { type: "color" },
      },
      to: {
         control: { type: "text" },
      },
      children: {
         control: { type: "text" },
      },
   },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const DefaultLink: Story = {
   args: {
      to: "/",
      children: "Default Link",
      color: "#006AE2",
   },
};

export const CustomColorLink: Story = {
   args: {
      to: "/custom",
      children: "Custom Color Link",
      color: "#FF5733", // Example custom color
   },
};
