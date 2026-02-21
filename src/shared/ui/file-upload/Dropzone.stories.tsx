import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Dropzone } from "./Dropzone";

const meta: Meta<typeof Dropzone> = {
   title: "shared/Dropzone",
   component: Dropzone,
   parameters: {
      layout: "centered",
   },
   tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export default meta;

const DropzoneWithHooks = () => {
   const [file, setFile] = useState<File | null>(null);

   const handleFileChange = (newFile: File) => {
      setFile(newFile);
   };

   const fileLoadedContent = (f: File) => (
      <div>
         <h2>{f.name}</h2>
      </div>
   );

   return (
      <Dropzone
         value={file}
         onChange={handleFileChange}
         fileLoadedContent={fileLoadedContent}
         accept={{ "application/pdf": [".pdf"] }}
      />
   );
};

export const DefaultDropzone: Story = {
   render: () => <DropzoneWithHooks />,
};
