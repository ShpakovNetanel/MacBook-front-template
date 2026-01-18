import { Menu as BaseMenu, Separator as BaseSeparator } from "@base-ui-components/react"
import styles from "./SpeedDialMenu.module.scss"
import clsx from "clsx";
import React from "react";

type Classes = {
    Button?: keyof typeof styles;
    Popup?: keyof typeof styles;
    Item?: keyof typeof styles;
    Separator?: keyof typeof styles;
}

type Disable = {
    separator?: boolean;
}

type SlotProps = {
    classes?: Classes;
    disable?: Disable;
    openOnHover?: boolean
}

type SpeedDialMenuProps = {
    items: React.ReactNode[];
    trigger?: React.ReactNode;
    slotProps?: SlotProps;
}

export const SpeedDialMenu = ({ items, trigger, slotProps }: SpeedDialMenuProps) => {
    return (
        <BaseMenu.SubmenuRoot>
            <BaseMenu.SubmenuTrigger openOnHover={slotProps?.openOnHover ?? false} className={clsx(styles.Button, slotProps?.classes?.Button)}>
                {trigger}
            </BaseMenu.SubmenuTrigger>
            <BaseMenu.Portal>
                <BaseMenu.Positioner>
                    <BaseMenu.Popup className={clsx(styles.Popup, slotProps?.classes?.Popup)}>
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <BaseMenu.Item className={clsx(styles.Item, slotProps?.classes?.Item)}>
                                    {item}
                                </BaseMenu.Item>
                                {index !== items.length - 1 &&
                                    <BaseSeparator className={clsx(styles.Separator, slotProps?.classes?.Separator)} />}
                            </React.Fragment>
                        ))}
                    </BaseMenu.Popup>
                </BaseMenu.Positioner>
            </BaseMenu.Portal>
        </BaseMenu.SubmenuRoot>
    )
}
