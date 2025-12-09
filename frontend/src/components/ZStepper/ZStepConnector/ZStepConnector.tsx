import clsx from "clsx";
import { useStep } from "../ZStepProvider/ZStepProvider";
import styles from "./ZStepConnector.module.scss";

type Classes = {
    Connector?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
}

type ZStepConnectorProps = {
    slotProps?: SlotProps;
}
export const ZStepConnector = ({ slotProps }: ZStepConnectorProps) => {
    const { state } = useStep();

    return <div
        className={clsx(styles.Connector, slotProps?.classes?.Connector)}
        data-active={state === 'active'}
        data-completed={state === 'completed'}
        data-disabled={state === 'disabled'} />;
};