import { Dialog } from "@base-ui-components/react";
import type { PropsWithChildren, ReactNode } from "react";
import styles from "./ZDrawer.module.scss";
import clsx from "clsx";

type Direction = "left" | "right" | "top" | "bottom";
const XAxios = ['left', 'right'];
const YAxios = ['top', 'bottom'];

type Classes = {
    trigger?: keyof typeof styles;
    drawer?: keyof typeof styles;
}

type SlotProps = {
    height?: string;
    width?: string;
    direction?: Direction
    classes?: Classes;
}

type ZDrawerProps = {
    open: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    trigger: ReactNode;
    slotProps?: SlotProps;
} & PropsWithChildren;

export const ZDrawer = ({
    open,
    setIsOpen,
    children,
    trigger,
    slotProps
}: ZDrawerProps) => {
    const triggerOpen = () => {
        setIsOpen(prevState => !prevState);
    }

    const direction = slotProps?.direction ?? 'right';

    const width: string = slotProps?.width ?
        slotProps.width :
        XAxios.includes(direction) ?
            '30vw' :
            '100%';

    const height: string = slotProps?.height ?
        slotProps.height :
        YAxios.includes(direction) ?
            '25vh' :
            '100%';

    return (
        <Dialog.Root open={open} onOpenChange={triggerOpen}>
            <Dialog.Trigger className={clsx(styles.Trigger, slotProps?.classes?.trigger)}>
                {trigger}
            </Dialog.Trigger>
            <Dialog.Backdrop
                className={`${styles.backdrop} ${open ? styles.open : ""}`}
                onClick={triggerOpen} />
            <div
                className={`${clsx(styles.drawer, slotProps?.classes?.drawer)} ${styles[direction]} ${open ? styles.open : ""}`}
                style={{ height, width }}>
                {children}
            </div>
        </Dialog.Root>
    );
};