import { Meta, StoryObj } from "@storybook/react";

import StatusTag, { StatusMatcher } from "./StatusTag";

const statusMap = {
   success: "Успешно",
   error: "Ошибка",
   pending: "В ожидании",
};

const statusMatcher: StatusMatcher = (status, statusMap) => {
   const label = statusMap[status] || "Неизвестный статус";
   const background =
      status === "success" ? "green" : status === "error" ? "red" : "gray";
   return { label, background };
};

const meta: Meta<typeof StatusTag> = {
   title: "shared/StatusTag",
   component: StatusTag,
   argTypes: {
      status: {
         control: {
            type: "select",
            options: Object.keys(statusMap),
         },
      },
      matcher: { control: "object" },
      statusMap: { control: "object" },
   },
   parameters: {
      layout: "centered",
   },
   tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      status: "success",
      matcher: statusMatcher,
      statusMap,
   },
};

export const Error: Story = {
   args: {
      status: "error",
      matcher: statusMatcher,
      statusMap,
   },
};
export const Idle: Story = {
   args: {
      status: "pending",
      matcher: statusMatcher,
      statusMap,
   },
};
