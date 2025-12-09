import clsx from "clsx";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { useStep } from "../ZStepProvider/ZStepProvider";
import styles from "./ZStepIndicator.module.scss";

type Classes = {
    Indicator?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
    completedIcon?: ReactNode;
}

type ZStepIndicatorProps = {
    slotProps?: SlotProps;
}

export const ZStepIndicator = ({ slotProps }: ZStepIndicatorProps) => {
    const { stepIndex, state } = useStep();

    return (
        <div
            className={clsx(styles.Indicator, slotProps?.classes?.Indicator)}
            data-active={state === 'active' || undefined}
            data-completed={state === 'completed' || undefined}
            data-disabled={state === 'disabled' || undefined}>
            {state === 'completed'
                ? slotProps?.completedIcon ?? <Check size={2} />
                : stepIndex}
        </div>
    );
};