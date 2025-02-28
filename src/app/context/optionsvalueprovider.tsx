"use client";
import { Dispatch, SetStateAction, ReactNode, createContext, useState } from "react";
interface ValueContextType {
  cityValue: string | null;
  setcityValue: Dispatch<SetStateAction<string | null>>;
}


export const ValueContext = createContext<ValueContextType>({
  cityValue: null, 
  setcityValue: () => {},
});

const ValueSelectionProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [cityValue, setcityValue] = useState<string | null>(null); // Initialize state

  return (
    <ValueContext.Provider value={{ cityValue, setcityValue }}>
      {children}
    </ValueContext.Provider>
  );
};

export default ValueSelectionProvider;