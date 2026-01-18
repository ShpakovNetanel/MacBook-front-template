import clsx from "clsx";
import { useStep } from "../StepProvider/StepProvider";
import styles from "./StepConnector.module.scss";

type Classes = {
    Connector?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
}

type StepConnectorProps = {
    slotProps?: SlotProps;
}
export const StepConnector = ({ slotProps }: StepConnectorProps) => {
    const { state } = useStep();

    return <div className={clsx(styles.Connector, slotProps?.classes?.Connector)}
        data-active={state === 'active' || undefined}
        data-completed={state === 'completed' || undefined}
        data-disabled={state === 'disabled' || undefined} />;
};