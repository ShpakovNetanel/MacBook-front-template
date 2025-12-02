import { Toast } from "@base-ui-components/react";
import clsx from "clsx";
import type { SlotProps as ZToastButtonSlotProps } from './ZToastButton/ZToastButton';
import styles from './ZToastBase.module.scss';
import { ZToastButton } from "./ZToastButton/ZToastButton";
import type { SlotProps as ZToastListSlotProps } from './ZToastList/ZToastList';
import { ZToastList } from "./ZToastList/ZToastList";

type Classes = {
    ViewPort?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
    ZToastList?: ZToastListSlotProps;
    ZToastButton?: ZToastButtonSlotProps;
    timeout?: number;
}

type ZToastProps = {
    slotProps?: SlotProps;
    title: string;
    description: string;
}

export const ZToastBase = ({ slotProps, description, title }: ZToastProps) => {
    return (
        <Toast.Provider timeout={slotProps?.timeout ?? 2000}>
            <ZToastButton
                title={title}
                description={description}
                slotProps={slotProps?.ZToastButton} />
            <Toast.Portal>
                <Toast.Viewport className={clsx(styles.Viewport, slotProps?.classes?.ViewPort)}>
                    <ZToastList slotProps={slotProps?.ZToastList} />
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    )
}