import type { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

const meta: Meta<typeof Select> = {
   title: "shared/Select",
   component: Select,
   parameters: {
      layout: "centered",
   },
   tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Select>;

export const DefaultSelect: Story = {
   args: {
      label: "Выберите опцию",

      placeholder: "Ничего не выбрано",
      options: [
         { value: "option1", label: "Опция 1" },
         { value: "option2", label: "Опция 2" },
         { value: "option3", label: "Опция 3" },
      ],
      value: null,
   },
};

export const RequiredSelect: Story = {
   args: {
      label: "Обязательный выбор",
      required: true,
      placeholder: "Ничего не выбрано",
      options: [
         { value: "option1", label: "Опция 1" },
         { value: "option2", label: "Опция 2" },
         { value: "option3", label: "Опция 3" },
      ],
      value: null,
   },
};

export const DisabledSelect: Story = {
   args: {
      label: "Отключенный выбор",
      placeholder: "Ничего не выбрано",
      options: [
         { value: "option1", label: "Опция 1" },
         { value: "option2", label: "Опция 2" },
         { value: "option3", label: "Опция 3" },
      ],
      value: null,
      isDisabled: true,
   },
};
