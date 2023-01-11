import { useEffect, useState } from "react";

type NoteCategory = {
  name: string;
  id: number;
};

type Note = {
  title: string;
  content: string;
  date: string;
  categoryId: number;
};

// state hook for local storage
const useLocalStorage = <T,>(key: string, initialValue: T[]) => {
  const [storedValue, setStoredValue] = useState<T[]>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) {
        localStorage.setItem(key, JSON.stringify(initialValue));
        throw new Error(`Unable to retrieve data with key: ${key}`);
      } else {
        console.log(`initial: ${key} -> ${item}`);
      }

      return JSON.parse(item as string);
    } catch (err: any) {
      console.warn("Error setting initial local storage: ", err.message);
      return initialValue;
    }
  });

  const setValue = (value: T[]) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue] as const;
};

export { useLocalStorage };
export type { NoteCategory, Note };
