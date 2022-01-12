import { useState, useEffect } from "react";
import _NoteValue from "./_NoteValue";
function getStorageValue(key:string, defaultValue:any) {
  // getting stored value
  const saved =typeof window !== "undefined" ?  window.localStorage.getItem(key):null;
  if(saved!==null) {
  const initial = JSON.parse(saved);
  return initial;
  }
  return defaultValue;
}

export const useLocalStorage = (key:string, defaultValue:any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};