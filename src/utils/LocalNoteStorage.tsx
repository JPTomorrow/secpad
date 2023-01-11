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
function useLocalStorage<T>(key: string, initialValue: T[]) {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    setStoredValue(stored ? JSON.parse(stored) : initialValue);
  }, []);

  useEffect(() => {
    console.log(`setting: ${key} -> ${JSON.stringify(storedValue)}`);
    if (storedValue.length > 0)
      localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue, key]);

  return [storedValue, setStoredValue] as const;
}

export { useLocalStorage };
export type { NoteCategory, Note };
