import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
   title: "Shared/Button",
   component: Button,
   parameters: {
      layout: "centered",
   },
   tags: ["autodocs"],
   argTypes: {
      backgroundColor: { control: "color" },
      colorText: { control: "color" },
      isLoading: { control: "boolean" },
      disabled: { control: "boolean" },
      width: { control: "text" },
      disableElevation: { control: "boolean" },
   },
   args: { onClick: action("clicked") },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      variant: "contained",
      width: "150px",
      isLoading: false,
      disabled: false,
      children: "Button",
   },
};

export const Loading: Story = {
   args: {
      ...Default.args,
      isLoading: true,
   },
};

export const Disabled: Story = {
   args: {
      ...Default.args,
      disabled: true,
   },
};

export const Large: Story = {
   args: {
      ...Default.args,
      width: "200px",
   },
};

export const Small: Story = {
   args: {
      ...Default.args,
      width: "100px",
   },
};
