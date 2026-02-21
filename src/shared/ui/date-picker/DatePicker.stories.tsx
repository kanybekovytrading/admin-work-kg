import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./DatePicker";

const meta: Meta = {
   title: "shared/DatePicker",
   component: DatePicker,
   parameters: {
      layout: "centered",
      docs: {
         description: {
            component:
               "A date picker component styled with Material-UI and Day.js localization for Russian (ru).",
         },
      },
   },
   tags: ["autodocs"],
   argTypes: {
      error: {
         control: "text",
         description: "Error message to display below the date picker.",
      },
      label: {
         control: "text",
         description: "Label text displayed above the date picker.",
      },
      labelClassName: {
         control: "text",
         description: "CSS class for customizing label styling.",
      },
      fullWidth: {
         control: "boolean",
         description: "Whether the date picker should occupy full width.",
      },
      width: {
         control: "text",
         description: "Width of the date picker component.",
      },
   },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      label: "Select a date",
      fullWidth: false,
   },
};

export const WithError: Story = {
   args: {
      label: "Date of Birth",
      error: { message: "Invalid date" },
      fullWidth: true,
   },
};

export const CustomWidth: Story = {
   args: {
      label: "Custom Width Picker",
      width: "300px",
      fullWidth: false,
   },
};
