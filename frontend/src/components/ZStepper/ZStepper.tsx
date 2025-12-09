import type { PropsWithChildren } from "react";
import { ZStepperProvider } from "./ZStepperProvider/ZStepperProvider";
import clsx from "clsx";
import styles from "./ZStepper.module.scss";

type Classes = {
    Stepper?: keyof typeof styles;
}

type SlotProps = {
    classes: Classes;
}

export type ZStepperProps = PropsWithChildren & {
  active?: number;
  defaultActive?: number;
  onChange?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  slotProps?: SlotProps;
};

export const ZStepper = ({
  slotProps,
  children,
  ...providerProps
}: ZStepperProps) => {
  return (
    <ZStepperProvider {...providerProps}>
      <div
        className={clsx(
          styles.Stepper,
          styles[providerProps.orientation || "horizontal"],
          slotProps?.classes?.Stepper
        )}
      >
        {children}
      </div>
    </ZStepperProvider>
  );
};