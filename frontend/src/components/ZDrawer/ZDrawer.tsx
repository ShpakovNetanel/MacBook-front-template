import { Dialog } from "@base-ui-components/react";
import clsx from "clsx";
import { Menu } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";
import styles from "./ZDrawer.module.scss";

type Direction = "left" | "right" | "top" | "bottom";
const XAxios = ['left', 'right'];
const YAxios = ['top', 'bottom'];

type Classes = {
    Trigger?: keyof typeof styles;
    Drawer?: keyof typeof styles;
}

type SlotProps = {
    height?: string;
    width?: string;
    direction?: Direction
    classes?: Classes;
}

type ZDrawerProps = {
    triggerIcon?: ReactNode;
    slotProps?: SlotProps;
} & PropsWithChildren
    & Dialog.Root.Props;

export const ZDrawer = ({
    children,
    triggerIcon,
    slotProps,
    ...props
}: ZDrawerProps) => {
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
        <Dialog.Root {...props}>
            <Dialog.Trigger className={clsx(styles.Trigger, slotProps?.classes?.Trigger)}>
                {triggerIcon ?? <Menu />}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop
                    className={styles.Backdrop} />
                <Dialog.Popup className={clsx(styles.Drawer, slotProps?.classes?.Drawer, styles[direction])}
                    style={{ width, height }}>
                    {children}
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
};