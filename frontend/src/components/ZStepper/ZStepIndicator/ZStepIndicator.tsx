import clsx from "clsx";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { useStep } from "../ZStepProvider/ZStepProvider";
import styles from "./ZStepIndicator.module.scss";

type Classes = {
    Indicator?: keyof typeof styles;
    Icon?: keyof typeof styles;
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
                ? slotProps?.completedIcon ?? <Check className={clsx(styles.Icon, slotProps?.classes?.Icon)} size={12} />
                : stepIndex}
        </div>
    );
};