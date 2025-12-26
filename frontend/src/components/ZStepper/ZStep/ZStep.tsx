import clsx from "clsx";
import { type CSSProperties, type PropsWithChildren } from "react";
import { useStepper } from "../ZStepperProvider/ZStepperProvider";
import { ZStepProvider } from "../ZStepProvider/ZStepProvider";
import styles from "./ZStep.module.scss";

export type StepState = 'disabled' | 'active' | 'inactive' | 'completed';

type Classes = {
    Step?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
    style?: CSSProperties;
}

export type ZStepProps = PropsWithChildren & {
    index: number;
    disabled?: boolean;
    completed?: boolean;
    slotProps?: SlotProps;
};

export const ZStep = ({ index, disabled, children,
    completed, slotProps }: ZStepProps) => {
    const { active, setActive } = useStepper();

    const state: StepState = disabled
        ? "disabled"
        : index === active
            ? "active"
            : completed ?? index < active
                ? "completed"
                : "inactive";

    return (
        <ZStepProvider stepIndex={index} state={state}>
            <div
                className={clsx(styles.Step, slotProps?.classes?.Step)}
                data-state={state}
                data-disabled={disabled || undefined}
                onClick={() => !disabled && setActive(index)}
                style={slotProps?.style}
            >
                {children}
            </div>
        </ZStepProvider>
    );
};