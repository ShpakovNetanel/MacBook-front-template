import { Menu } from "@base-ui-components/react"
import type { ReactNode } from "react"
import styles from './ZMenu.module.scss'
import type { ClassNames } from "../../types/baseui"
import clsx from "clsx"
import { MenuIcon } from 'lucide-react'
type SlotProps = {
    classes?: ClassNames<typeof Menu>;
    trigger?: ReactNode;
}

type ZMenuProps = {
    items: ReactNode[];
    slotProps?: SlotProps;
} & Menu.Root.Props;

export const ZMenu = ({ items, slotProps, ...props }: ZMenuProps) => {
    return (
        <Menu.Root {...props}>
            <Menu.Trigger className={clsx(styles.Button, slotProps?.classes?.Trigger)}>
                {slotProps?.trigger ?? <MenuIcon />}
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner className={clsx(styles.Positioner, slotProps?.classes?.Positioner)} sideOffset={8}>
                    <Menu.Popup className={clsx(styles.Popup, slotProps?.classes?.Popup)}>
                        {items.map((item, index) => (
                            <Menu.Item className={clsx(styles.Item, slotProps?.classes?.Item)} key={index}>
                                {item}
                            </Menu.Item>
                        ))}
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    )
}