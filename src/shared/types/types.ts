import { ReactNode } from "react";

export type LabelValueObject<T = ReactNode> = {
   label: string;
   value: T;
};
