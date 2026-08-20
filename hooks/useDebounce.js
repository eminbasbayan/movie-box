import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);


    // cleanup function
    return ()=> {
        clearTimeout(timer)
    }
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
