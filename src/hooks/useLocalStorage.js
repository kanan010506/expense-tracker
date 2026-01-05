import {useState, useEffect} from 'react';

function useLocalStorage(key, initialValue){
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    try{
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {//to save changes in local storage 
    try{
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
