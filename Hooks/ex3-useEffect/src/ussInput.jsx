import { useState } from "react";

export const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
      let willUpdate = true;
      if (typeof validator === "function") {
        willUpdate = validator(value);
        console.log(willUpdate);
      }
      if (willUpdate) {
        setValue(e.target.value);
      }
    };
  
    return { value, onChange };
  };