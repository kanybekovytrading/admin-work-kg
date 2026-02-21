import { Meta, StoryObj } from "@storybook/react";
import { ColumnDef } from "@tanstack/react-table";

import Table from "./Table";

type UserData = {
   id: number;
   name: string;
   email: string;
};

const data: UserData[] = [
   { id: 1, name: "Иван Иванов", email: "ivan@example.com" },
   { id: 2, name: "Мария Петрова", email: "maria@example.com" },
];

const columns: ColumnDef<UserData>[] = [
   {
      header: "ID",
      accessorKey: "id",
   },
   {
      header: "Имя",
      accessorKey: "name",
   },
   {
      header: "Email",
      accessorKey: "email",
   },
];

const meta: Meta<typeof Table> = {
   title: "shared/Table",
   component: Table,
   tags: ["autodocs"],
   parameters: {
      layout: "centered",
   },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      data: data,

      columns: columns,
      loading: false,
   },
   render: (args) => (
      <div style={{ width: "600px" }}>
         <Table columns={[]} {...args} />
      </div>
   ),
};

export const Loading: Story = {
   args: {
      data: [],

      columns: columns,
      loading: true,
   },
   render: (args) => (
      <div style={{ width: "600px" }}>
         <Table columns={[]} {...args} />
      </div>
   ),
};

export const NoData: Story = {
   args: {
      data: [],

      columns: columns,
      loading: false,
   },
   render: (args) => (
      <div style={{ width: "600px" }}>
         <Table columns={[]} {...args} />
      </div>
   ),
};
