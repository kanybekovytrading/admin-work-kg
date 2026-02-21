import Box from "@mui/material/Box";
import { Search } from "lucide-react";
import {
   ChangeEvent,
   Dispatch,
   FC,
   FormEvent,
   SetStateAction,
   useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Button } from "#shared/ui/button/Button";
import { Input } from "#shared/ui/input/Input";

type SearchFormProps = {
   handleSubmit?: (value: string) => void;
   onChange?: ((val: string) => void) | Dispatch<SetStateAction<string>>;
   clearAfterSubmit?: boolean;
   placeholder?: string;
};

const SearchForm: FC<SearchFormProps> = ({
   handleSubmit,
   onChange,
   clearAfterSubmit = false,
   placeholder,
}) => {
   const [search, setSearch] = useState("");
   const { t } = useTranslation("common");

   const inputPlaceholder = placeholder || t("searchOnly");

   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
      onChange?.(value);

      if (value === "") {
         handleSubmit?.("");
      }
   };

   const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      handleSubmit?.(search);
      if (clearAfterSubmit) setSearch("");
   };

   return (
      <Box
         id="search-container"
         onSubmit={onSubmit}
         component="form"
         display="flex"
         alignItems="center"
         gap="18px"
      >
         <Input
            id="search-input"
            placeholder={inputPlaceholder}
            startAdornment={<Search />}
            value={search}
            onChange={handleSearchChange}
         />
         <Button
            id="search-btn"
            variant="contained"
            disableRipple
            type="submit"
         >
            {t("find")}
         </Button>
      </Box>
   );
};

export default SearchForm;
