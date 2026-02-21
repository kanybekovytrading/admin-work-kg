import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorFallback from "./ErrorFallback";

const meta: Meta<typeof ErrorFallback> = {
   title: "shared/ErrorFallback",
   component: ErrorFallback,
   parameters: {
      layout: "centered",
      backgrounds: {
         default: "light",
         values: [
            { name: "light", value: "#fff" },
            { name: "dark", value: "#333" },
         ],
      },
      docs: {
         description: {
            component:
               "Этот компонент отображается если на фронте случилась непредвиденная ошибка.",
         },
      },
   },
   tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export default meta;

// Define the story
export const DefaultErrorFallback: Story = {
   render: () => (
      <BrowserRouter>
         <Routes>
            <Route path="*" element={<ErrorFallback />} />
         </Routes>
      </BrowserRouter>
   ),
};
