import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { ConfirmActions } from "./ConfirmActions";

const meta: Meta<typeof ConfirmActions> = {
   title: "Shared/ConfirmActions",
   component: ConfirmActions,
   tags: ["autodocs"],
   argTypes: {
      onConfirm: { action: "confirmed" },
      onCancel: { action: "cancelled" },
   },

   parameters: {
      layout: "centered",

      docs: {
         description: {
            component:
               "Этот компонент обычно используется внутри модальных окон для подтверждения действий",
         },
      },
   },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      onConfirm: action("confirmed"),
      onCancel: action("cancelled"),
   },
};
