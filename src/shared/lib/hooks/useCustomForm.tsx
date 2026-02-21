import { useEffect, useMemo } from "react";
import {
   useForm as useReactHookForm,
   UseFormProps,
   UseFormReturn,
   FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export function useCustomForm<T extends FieldValues>(
   props: UseFormProps<T>
): UseFormReturn<T> {
   const { i18n } = useTranslation();

   // This code makes new reference to resolver every language change
   // and causes reinitialization of error messages localizations
   const resolver = useMemo(() => props.resolver, [i18n.language]);
   const methods = useReactHookForm<T>({ ...props, resolver });

   // language changing logic.
   // We need to retrigger form validation to update error messages localization.
   useEffect(() => {
      if (!methods.formState.isDirty) return;
      if (Object.values(methods.formState.errors).length === 0) return;

      methods.trigger(undefined, { shouldFocus: false });
   }, [i18n.language]);

   return methods;
}
