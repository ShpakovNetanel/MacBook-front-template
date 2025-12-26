import { Menu, Separator } from "@base-ui-components/react"
import styles from "./ZSpeedDialMenu.module.scss"
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

type ZSpeedDialMenuProps = {
    items: React.ReactNode[];
    trigger?: React.ReactNode;
    slotProps?: SlotProps;
}

export const ZSpeedDialMenu = ({ items, trigger, slotProps }: ZSpeedDialMenuProps) => {
    return (
        <Menu.SubmenuRoot>
            <Menu.SubmenuTrigger openOnHover={slotProps?.openOnHover ?? false} className={clsx(styles.Button, slotProps?.classes?.Button)}>
                {trigger}
            </Menu.SubmenuTrigger>
            <Menu.Portal>
                <Menu.Positioner>
                    <Menu.Popup className={clsx(styles.Popup, slotProps?.classes?.Popup)}>
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <Menu.Item className={clsx(styles.Item, slotProps?.classes?.Item)}>
                                    {item}
                                </Menu.Item>
                                {index !== items.length - 1 &&
                                    <Separator className={clsx(styles.Separator, slotProps?.classes?.Separator)} />}
                            </React.Fragment>
                        ))}
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.SubmenuRoot>
    )
}