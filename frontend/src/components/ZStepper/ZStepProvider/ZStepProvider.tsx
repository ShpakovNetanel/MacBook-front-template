import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { StepState } from "../ZStep/ZStep";

type StepContextType = {
    stepIndex: number;
    setStepIndex: (n: number) => void;
    state: StepState;
};

const StepContext = createContext<StepContextType | null>(null);

export const useStep = () => {
    const ctx = useContext(StepContext);
    if (!ctx) throw new Error("Step components must be inside <Step />");
    return ctx;
};

type ZStepProviderProps = {
    stepIndex?: number;
    state: StepState;
    onChange?: (index: number) => void;
} & PropsWithChildren;

export const ZStepProvider = ({ stepIndex, onChange, children, state }: ZStepProviderProps) => {
    const [internalIndex, setInternalIndex] = useState(0);

    const isControlled = stepIndex !== undefined;
    const current = isControlled ? stepIndex : internalIndex;

    const setStepIndex = (n: number) => {
        if (!isControlled) setInternalIndex(n);
        onChange?.(n);
    }
    return (
        <StepContext.Provider value={{ stepIndex: current!, setStepIndex, state }}>
            {children}
        </StepContext.Provider>
    )
}