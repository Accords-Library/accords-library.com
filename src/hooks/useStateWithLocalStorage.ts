import { useEffect, useState } from "react";
import { isDefined } from "helpers/others";

export const useStateWithLocalStorage = <T>(
  key: string,
  initialValue: T
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [value, setValue] = useState<T | undefined>(undefined);
  const [, setFromLocaleStorage] = useState<boolean>(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (isDefined(item)) {
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
    if (isDefined(value)) localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
