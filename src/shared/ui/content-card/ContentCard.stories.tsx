import type { Meta, StoryObj } from "@storybook/react";

import { ContentCard, ContentContainer } from "./ContentCard";

const meta: Meta = {
   title: "shared/ContentCard",
   component: ContentCard,
   parameters: {
      layout: "centered",
      docs: {
         description: {
            component:
               "Компонент-обертка. Используется для оборачивания контента",
         },
      },
   },
   tags: ["autodocs"],
   argTypes: {
      background: { control: "color" },
      mb: { control: "text" },
   },
   args: {
      background: "white",
      mb: "16px",
   },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      children: "This is a ContentCard",
   },
};

export const CustomBackground: Story = {
   args: {
      children: "This ContentCard has a custom background",
      background: "#f0f8ff",
   },
};

export const ContentContainerExample: Story = {
   render: () => (
      <ContentContainer mb="20px">
         <h2></h2>
         <p></p>
      </ContentContainer>
   ),
};
