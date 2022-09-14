import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  //SSR --> server side react ... ex: Next.js (we may be running this on version of SSR)
  if (typeof window === "undefined") {
    return initValue;
  }
  // if a value is already stored
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) {
    return localValue;
  }
  // return result of a function (may have result of a function stored in local storage)
  if (initValue instanceof Function) {
    return initValue();
  }
  return initValue;
};

const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
