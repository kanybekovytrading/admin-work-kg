import type { Meta, StoryObj } from "@storybook/react";

import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
   title: "shared/Pagination",
   component: Pagination,
   parameters: {
      layout: "centered",
   },
   tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const DefaultPagination: Story = {
   args: {
      page: 1,
      count: 10,
      size: 20,
      onChange: (page, size) => console.log(`Page: ${page}, Size: ${size}`),
   },
};
