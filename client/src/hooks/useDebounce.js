import { useState, useEffect } from "react";

const useDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState(null);

  const debouncedFunction = (e) => {
    clearTimeout(timeoutId); // Clear any existing timeout to reset the delay
    const newTimeoutId = setTimeout(() => {
      callback(e); // Execute the callback function after the delay
    }, delay);
    setTimeoutId(newTimeoutId); // Store the new timeout ID
  };

  // Clear the timeout when the component unmounts or timeoutId changes
  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  return debouncedFunction;
};

export default useDebounce;
