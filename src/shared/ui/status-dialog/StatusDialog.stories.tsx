import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "#shared/ui/button/Button.tsx";
import { ConfirmActions } from "#shared/ui/confirm-actions/ConfirmActions.tsx";

import StatusDialog from "./StatusDialog";

const meta: Meta<typeof StatusDialog> = {
   title: "shared/StatusDialog",
   component: StatusDialog,
   parameters: {
      layout: "centered",
   },
   args: {
      open: true,
   },
   tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof StatusDialog>;

export enum IndicatorStatuses {
   Warning = "uninitialized",
   pending = "pending",
   Success = "fulfilled",
   Error = "rejected",
}

// Default StatusDialog story
export const DefaultStatusDialog: Story = {
   args: {
      status: IndicatorStatuses.Success,
      content: {
         [IndicatorStatuses.Success]: {
            title: "Успех",
            description: "Операция прошла успешно!",
            actions: <Button variant="contained">Закрыть</Button>,
         },
      },
   },
};

// Error StatusDialog example
export const ErrorStatusDialog: Story = {
   args: {
      status: IndicatorStatuses.Error,
      content: {
         [IndicatorStatuses.Error]: {
            title: "Ошибка",
            description: "Не удалось загрузить данные.",
            actions: <Button variant="contained">Закрыть</Button>,
         },
      },
   },
};

// Warning StatusDialog example
export const WarningStatusDialog: Story = {
   args: {
      status: IndicatorStatuses.Warning,
      content: {
         [IndicatorStatuses.Warning]: {
            title: "Внимание",
            description: "Вы уверены, что хотите продолжить?",
            actions: (
               <ConfirmActions onConfirm={() => ""} onCancel={() => ""} />
            ),
         },
      },
   },
};
