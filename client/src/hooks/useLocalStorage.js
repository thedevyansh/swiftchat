import { useState, useEffect } from "react";

const PREFIX = "swiftchat-";

function getStoredValue(prefixedKey, initialValue) {
  const jsonValue = localStorage.getItem(prefixedKey);

  if (jsonValue != null) return JSON.parse(jsonValue);
  if (typeof initialValue === "function") {
    return initialValue();
  } else {
    return initialValue;
  }
}

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    return getStoredValue(prefixedKey, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}
