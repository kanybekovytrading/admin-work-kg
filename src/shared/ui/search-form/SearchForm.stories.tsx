import type { Meta, StoryObj } from "@storybook/react";

import SearchForm from "./SearchForm";

const meta: Meta<typeof SearchForm> = {
   title: "shared/SearchForm",
   component: SearchForm,
   parameters: {
      layout: "centered",
      docs: {
         description: {
            component: "Переиспользуемая форма для поиска каких-либо данных",
         },
      },
   },
   tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchForm>;

export const DefaultSearchForm: Story = {
   args: {
      handleSubmit: (value) => console.log(`Searching for: ${value}`),
      placeholder: "Поиск...",
   },
};

export const ClearAfterSubmitSearchForm: Story = {
   args: {
      handleSubmit: (value) => console.log(`Searching for: ${value}`),
      clearAfterSubmit: true,
      placeholder: "Поиск...",
   },
};

export const DoNotClearAfterSubmitSearchForm: Story = {
   args: {
      handleSubmit: (value) => console.log(`Searching for: ${value}`),
      clearAfterSubmit: false,
      placeholder: "Поиск...",
   },
};
