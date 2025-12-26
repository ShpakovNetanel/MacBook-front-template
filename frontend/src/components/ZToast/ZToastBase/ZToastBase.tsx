import { Toast } from "@base-ui-components/react";
import clsx from "clsx";
import type { SlotProps as ZToastButtonSlotProps } from './ZToastButton/ZToastButton';
import styles from './ZToastBase.module.scss';
import { ZToastButton } from "./ZToastButton/ZToastButton";
import type { SlotProps as ZToastListSlotProps } from './ZToastList/ZToastList';
import { ZToastList } from "./ZToastList/ZToastList";
import type { ReactNode } from "react";

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
    trigger?: ReactNode;
    title: string;
    description: string;
}

export const ZToastBase = ({ slotProps, description, title, trigger }: ZToastProps) => {
    return (
        <>
            {trigger ?? <ZToastButton
                title={title}
                description={description}
                slotProps={slotProps?.ZToastButton} />}
            <Toast.Portal>
                <ZToastList slotProps={slotProps?.ZToastList} />
            </Toast.Portal>
        </>
    )
}