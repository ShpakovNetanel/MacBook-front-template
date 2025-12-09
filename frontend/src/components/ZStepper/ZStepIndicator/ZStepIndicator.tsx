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
    console.log({ state, stepIndex });

    return (
        <div
            className={clsx(styles.Indicator, slotProps?.classes?.Indicator)}
            data-active={state === 'active'}
            data-completed={state === 'completed'}>
            {state === 'completed'
                ? slotProps?.completedIcon ?? <Check />
                : stepIndex}
        </div>
    );
};