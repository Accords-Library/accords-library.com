import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isDefined } from "helpers/others";

export const useStateWithLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);
  const [isFromLocaleStorage, setFromLocaleStorage] = useState<boolean>(false);

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
    if (isFromLocaleStorage) localStorage.setItem(key, JSON.stringify(value));
  }, [value, key, isFromLocaleStorage]);

  return [value, setValue];
};
