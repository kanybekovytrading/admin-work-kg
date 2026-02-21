import { FormEvent } from "react";

import { LabelValueObject } from "#shared/types/types.ts";

export const labelValueToHashMap = (statuses: LabelValueObject[]) => {
   return statuses.reduce<Record<string, string>>((acc, s) => {
      acc[s.value as string] = s.label!;
      return acc;
   }, {});
};

export const openFileInWindow = (blob: Blob) => {
   const url = window.URL.createObjectURL(blob);
   window.open(url, "_blank");
   window.URL.revokeObjectURL(url);
};

export const onlyNumberInput = (
   e: FormEvent<HTMLDivElement>,
   type: "number" | "string" = "number"
) => {
   const input = e.target as HTMLInputElement;
   const value = input.value.replace(/\D/g, "");

   if (type === "string") {
      input.value = value;
      return;
   }

   // Number чтобы числа по типу 0012312 заменялись на 12312
   input.value = Number(value).toString();
};

export function sanitizeAlphaInput(e: React.FormEvent<HTMLInputElement>) {
   (e.target as HTMLInputElement).value = (
      e.target as HTMLInputElement
   ).value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, "");
}

export function validateFloatInput(e: FormEvent<HTMLInputElement>) {
   let value = (e.target as HTMLInputElement).value;

   value = value
      .replace(/[^0-9.]/g, "")
      .replace(/^0+(\d)/, "$1")
      .replace(/^(\.\d*)$/, "0$1")
      .replace(/(\..*)\./g, "$1");

   // Limit to two decimal places if there's a dot
   if (value.includes(".")) {
      const [integerPart, decimalPart] = value.split(".");
      value = `${integerPart}.${decimalPart.slice(0, 2)}`;
   }

   (e.target as HTMLInputElement).value = value;
}

type DownloadParams = {
   filename: string;
   mimeType?: string;
   bytes: Blob;
};

export const downloadFile = async ({
   filename,
   mimeType = "application/octet-stream",

   bytes,
}: DownloadParams) => {
   try {
      const blob = new Blob([bytes], { type: mimeType });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      link.click();
      URL.revokeObjectURL(url);
   } catch (error) {
      console.error("Download failed", error);
      alert("Что-то пошло не так!");
   }
};
