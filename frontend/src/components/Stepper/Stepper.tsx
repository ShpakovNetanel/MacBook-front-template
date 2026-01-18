import type { PropsWithChildren } from "react";
import { StepperProvider } from "./StepperProvider/StepperProvider";
import clsx from "clsx";
import styles from "./Stepper.module.scss";

type Classes = {
    Stepper?: keyof typeof styles;
}

type SlotProps = {
    classes: Classes;
}

export type StepperProps = PropsWithChildren & {
  active?: number;
  setActiveStep?: (step: number) => void
  defaultActive?: number;
  orientation?: "horizontal" | "vertical";
  slotProps?: SlotProps;
  
};

export const Stepper= ({
  slotProps,
  children,
  ...providerProps
}: StepperProps) => {
  return (
    <StepperProvider {...providerProps}>
      <div
        className={clsx(
          styles.Stepper,
          styles[providerProps.orientation || "horizontal"],
          slotProps?.classes?.Stepper
        )}
      >
        {children}
      </div>
    </StepperProvider>
  );
};