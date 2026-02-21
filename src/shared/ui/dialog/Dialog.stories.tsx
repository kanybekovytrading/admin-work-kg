import { Button } from "@mui/material";
import { DialogProps } from "@mui/material/Dialog";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Dialog, DialogTransition } from "./Dialog";

const meta: Meta = {
   title: "shared/Dialog",
   component: Dialog,
   parameters: {
      layout: "centered",
      docs: {
         description: {
            component:
               "A dialog component with a sliding transition, using Material-UI.",
         },
      },
   },
   tags: ["autodocs"],
   argTypes: {
      open: {
         control: "boolean",
         description: "Controls whether the dialog is open or not.",
      },
      onClose: {
         action: "onClose",
         description: "Callback for closing the dialog.",
      },
      children: { control: "text", description: "Content inside the dialog." },
   },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: DialogProps) => {
   const [open, setOpen] = useState(args.open);

   const handleOpen = () => setOpen(true);
   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         <Button variant="contained" onClick={handleOpen}>
            Open Dialog
         </Button>
         <Dialog {...args} open={open} onClose={handleClose}>
            {args.children}
         </Dialog>
      </>
   );
};

export const Default: Story = {
   render: (args) => <Template open={false} {...args} />,
   args: {
      open: false,
      children: (
         <div style={{ padding: "16px" }}>This is a dialog content.</div>
      ),
   },
};

export const WithCustomContent: Story = {
   render: (args) => <Template open={false} {...args} />,
   args: {
      open: false,
      children: (
         <div style={{ padding: "24px", textAlign: "center" }}>
            <h2>Custom Dialog</h2>
            <p>This dialog contains custom content.</p>
         </div>
      ),
   },
};
export const WithTransition: Story = {
   render: (args) => <Template open={false} {...args} />,
   args: {
      open: false,
      children: (
         <div style={{ padding: "24px", textAlign: "center" }}>
            <h2>Custom Dialog</h2>
            <p>This dialog contains custom content.</p>
         </div>
      ),
      TransitionComponent: DialogTransition,
   },
};
