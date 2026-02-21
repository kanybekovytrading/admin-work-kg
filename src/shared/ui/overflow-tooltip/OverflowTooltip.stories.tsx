import { Meta, StoryObj } from "@storybook/react";

import OverflowTooltip from "./OverflowTooltip";

const meta: Meta<typeof OverflowTooltip> = {
   title: "shared/OverflowTooltip",
   component: OverflowTooltip,
   argTypes: {
      maxWidth: { control: "text" },
      children: { control: "text" },
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
      maxWidth: "150px",
      children:
         "Это длинный текст, который должен быть обрезан, если он превышает ширину контейнера.",
   },
};

export const LongText: Story = {
   args: {
      maxWidth: "200px",
      children:
         "Длинный текст, который при переполнении должен показывать подсказку с полным содержимым.",
   },
};

export const ShortText: Story = {
   args: {
      maxWidth: "100px",
      children: "Короткий текст",
   },
};
