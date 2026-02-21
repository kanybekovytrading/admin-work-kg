import { Meta, StoryObj } from "@storybook/react";
import { FieldError } from "react-hook-form";

import Textarea from "./Textarea";

// Пример ошибки
const error: FieldError = {
   type: "required",
   message: "Это поле обязательно для заполнения",
};

const meta: Meta<typeof Textarea> = {
   title: "shared/Textarea",
   component: Textarea,
   argTypes: {
      label: { control: "text" },
      required: { control: "boolean" },
      error: { control: "object" },
   },
   tags: ["autodocs"],
   parameters: {
      layout: "centered",
   },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      label: "Ваше сообщение",
      required: false,
      error: undefined,
      placeholder: "Введите текст...",
   },
};

export const Required: Story = {
   args: {
      label: "Ваше сообщение",
      required: true,
      error: undefined,
      placeholder: "Введите текст...",
   },
};

export const ErrorState: Story = {
   args: {
      label: "Ваше сообщение",
      required: true,
      error: error,
      placeholder: "Введите текст...",
   },
};
