import { styled } from "@mui/material";
import { FC, ReactNode, useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import Download from "#pages/new-document/assets/download.svg?react";

type DropzoneProps = {
   value?: File | null;
   onChange: (value: File) => void;
   accept?: Accept;

   fileLoadedContent?: (value: File) => ReactNode;
};

export const Dropzone: FC<DropzoneProps> = ({
   value,
   onChange,
   fileLoadedContent,
   accept,
}) => {
   const { t } = useTranslation("upload");
   const onDrop = useCallback((file: File[]) => {
      if (file[0]) onChange(file[0]);
   }, []);

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept,
   });

   return (
      <DropZoneContainer {...getRootProps()} isFileLoaded={Boolean(value)}>
         <input {...getInputProps()} />
         <Content>
            {value ? (
               fileLoadedContent?.(value)
            ) : (
               <>
                  <Download />
                  <Title>{t("dragAndDrop")}</Title>
               </>
            )}
         </Content>
      </DropZoneContainer>
   );
};

const DropZoneContainer = styled("div")(
   ({ isFileLoaded }: { isFileLoaded: boolean }) => ({
      border: isFileLoaded ? "1px dashed #59636D" : "1px dashed #006AE2",
      background: "rgba(226, 226, 226, 0.20)",
      // width: "50%",
      height: "150px",
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
      borderRadius: "9px",
      alignItems: "center",
   })
);

const Title = styled("h1")({
   color: "#006AE2",
   fontSize: "16px",
   fontWeight: 700,
   textAlign: "center",
});

const Content = styled("div")({
   fontSize: "12px",
   fontWeight: 400,
   display: "flex",
   flexDirection: "column",
   gap: "8px",
   alignItems: "center",
});
