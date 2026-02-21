import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import i18next from "#shared/locale/i18n.ts";
import GoBackSection from "#shared/ui/go-back-section/GoBackSection";
import SearchForm from "#shared/ui/search-form/SearchForm";

const meta: Meta<typeof GoBackSection> = {
   title: "shared/GoBackSection",
   component: GoBackSection,
   parameters: {
      layout: "centered",
      docs: {
         description: {
            component:
               "Компонент GoBackSection для возврата на предыдущую страницу.",
         },
      },
   },
   tags: ["autodocs"],
   argTypes: {
      type: {
         options: ["separate", "join"],
         control: { type: "select" },
      },
      goBackTitle: {
         control: { type: "text" },
      },
      goBackOnClick: {
         action: "clicked",
      },
      children: {
         control: { type: "text" },
      },
   },

   render: (args) => {
      return (
         <BrowserRouter>
            <Routes>
               <Route
                  path="*"
                  element={
                     <div style={{ width: "600px" }}>
                        <GoBackSection {...args} />
                     </div>
                  }
               />
            </Routes>
         </BrowserRouter>
      );
   },
};

export default meta;

type Story = StoryObj<typeof GoBackSection>;

export const Separate: Story = {
   args: {
      goBackTitle: i18next.t("goBack"),
      type: "separate",
   },
};

export const Joined: Story = {
   args: {
      goBackTitle: i18next.t("goBack"),
      type: "join",
   },
   parameters: {
      docs: {
         description: {
            story: "Для кейсов где основной контент и GoBackSection вместе",
         },
      },
   },
};

export const WithSearchForm: Story = {
   args: {
      children: <SearchForm handleSubmit={() => ""} />,
   },
};
