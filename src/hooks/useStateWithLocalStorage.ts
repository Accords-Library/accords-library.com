import { useEffect, useState } from "react";

export default function useStateWithLocalStorage<T>(
  key: string,
  initialValue: T
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [, setFromLocaleStorage] = useState<boolean>(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item !== "undefined" && item !== null) {
        setValue(JSON.parse(item) as T);
      } else {
        setValue(initialValue);
      }
      setFromLocaleStorage(true);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      setValue(initialValue);
    }
  }, [initialValue, key]);

  useEffect(() => {
    if (value !== undefined) localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
