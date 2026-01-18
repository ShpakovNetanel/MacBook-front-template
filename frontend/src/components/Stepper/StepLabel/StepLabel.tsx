import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { useStep } from "../StepProvider/StepProvider";
import styles from "./StepLabel.module.scss";

type Classes = {
    Label?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
}

type StepLabelProps = PropsWithChildren & {
    slotProps?: SlotProps;
}

export const StepLabel = ({ children, slotProps }: StepLabelProps) => {
    const { state } = useStep();

    return <div
        className={clsx(styles.Label, slotProps?.classes?.Label)}
        data-active={state === 'active' || undefined}
        data-completed={state === 'completed' || undefined}
        data-disabled={state === 'disabled' || undefined}>
        {children}
    </div>;
};