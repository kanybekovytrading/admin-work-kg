import type { Meta, StoryObj } from "@storybook/react";
import { FieldError } from "react-hook-form";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
   title: "shared/Input",
   component: Input,
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
      label: {
         control: { type: "text" },
      },
      width: {
         control: { type: "text" },
      },
      error: {
         control: { type: "object" },
      },
      htmlFor: {
         control: { type: "text" },
      },
      labelClassName: {
         control: { type: "text" },
      },
   },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
   args: {
      label: "Введите текст",
      width: "200px",
      placeholder: "текст типа",
   },
};

export const ErrorInput: Story = {
   args: {
      label: "Введите текст",
      error: { message: "Это поле обязательно!" } as FieldError,
      ...DefaultInput.args,
   },
};

export const DisabledInput: Story = {
   args: {
      label: "Disabled Input",
      disabled: true,
      ...DefaultInput.args,
      placeholder: "Это поле отключено",
   },
};
