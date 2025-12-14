import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { useStep } from "../ZStepProvider/ZStepProvider";
import styles from "./ZStepLabel.module.scss";

type Classes = {
    Label?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
}

type ZStepLabelProps = PropsWithChildren & {
    slotProps?: SlotProps;
}

export const ZStepLabel = ({ children, slotProps }: ZStepLabelProps) => {
    const { state } = useStep();

    return <div
        className={clsx(styles.Label, slotProps?.classes?.Label)}
        data-active={state === 'active' || undefined}
        data-completed={state === 'completed' || undefined}
        data-disabled={state === 'disabled' || undefined}>
        {children}
    </div>;
};