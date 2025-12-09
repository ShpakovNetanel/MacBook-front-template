import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type StepperContextType = {
  active: number;
  setActive: (n: number) => void;
  orientation: "horizontal" | "vertical";
};

const StepperContext = createContext<StepperContextType | null>(null);

export const useStepper = () => {
  const ctx = useContext(StepperContext);
  if (!ctx) throw new Error("Stepper components must be inside <Stepper />");
  return ctx;
};

export type ZStepperProviderProps = PropsWithChildren & {
  active?: number;
  defaultActive?: number;
  onChange?: (n: number) => void;
  orientation?: "horizontal" | "vertical";
}

export const ZStepperProvider = ({
  active,
  defaultActive = 0,
  onChange,
  orientation = "horizontal",
  children,
}: ZStepperProviderProps) => {
  const [internalActive, setInternalActive] = useState(defaultActive);

  const isControlled = active !== undefined;
  const current = isControlled ? active : internalActive;

  const setActive = (n: number) => {
    if (!isControlled) setInternalActive(n);
    onChange?.(n);
  };

  return (
    <StepperContext.Provider value={{
      active: current!, setActive, orientation
    }}>
      {children}
    </StepperContext.Provider>
  );
};