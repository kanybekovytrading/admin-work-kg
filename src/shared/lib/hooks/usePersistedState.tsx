import { useState } from "react";

interface PersistedStateOptions {
   type: "QUERY" | "LOCAL_STORAGE";
}

function usePersistedState<T>(
   initialState: T,
   options: PersistedStateOptions & { key?: string }
): [T, (value: T) => void] {
   // const { type } = options;
   const { type, key = "persisted-state" } = options;
   // const key = "persisted-state"; // Используем фиксированный ключ для QUERY и LOCAL_STORAGE

   const getStoredValue = (): T => {
      try {
         if (type === "LOCAL_STORAGE") {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialState;
         }

         if (type === "QUERY") {
            const urlParams = new URLSearchParams(window.location.search);
            const storedValue = urlParams.get(key);
            return storedValue ? JSON.parse(storedValue) : initialState;
         }
      } catch (error) {
         console.error("Error reading storage or query parameter", key, error);
      }
      return initialState;
   };

   const [state, setState] = useState<T>(getStoredValue);

   const setPersistedState = (value: T) => {
      setState(value);

      try {
         if (type === "LOCAL_STORAGE") {
            localStorage.setItem(key, JSON.stringify(value));
         }

         if (type === "QUERY") {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set(key, JSON.stringify(value));
            window.history.replaceState(null, "", "?" + urlParams.toString());
         }
      } catch (error) {
         console.error("Error saving to storage or query", key, error);
      }
   };

   return [state, setPersistedState];
}

export default usePersistedState;
