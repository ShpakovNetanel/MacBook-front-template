import { Menu as BaseMenu } from "@base-ui-components/react"
import type { ReactNode } from "react"
import styles from './Menu.module.scss'
import type { ClassNames } from "../../types/baseui"
import clsx from "clsx"
import { MenuIcon } from 'lucide-react'
type SlotProps = {
    classes?: ClassNames<typeof BaseMenu>;
    trigger?: ReactNode;
}

type MenuProps = {
    items: ReactNode[];
    slotProps?: SlotProps;
} & BaseMenu.Root.Props;

export const Menu = ({ items, slotProps, ...props }: MenuProps) => {
    return (
        <BaseMenu.Root {...props}>
            <BaseMenu.Trigger className={clsx(styles.Button, slotProps?.classes?.Trigger)}>
                {slotProps?.trigger ?? <MenuIcon />}
            </BaseMenu.Trigger>
            <BaseMenu.Portal>
                <BaseMenu.Positioner className={clsx(styles.Positioner, slotProps?.classes?.Positioner)} sideOffset={8}>
                    <BaseMenu.Popup className={clsx(styles.Popup, slotProps?.classes?.Popup)}>
                        {items.map((item, index) => (
                            <BaseMenu.Item className={clsx(styles.Item, slotProps?.classes?.Item)} key={index}>
                                {item}
                            </BaseMenu.Item>
                        ))}
                    </BaseMenu.Popup>
                </BaseMenu.Positioner>
            </BaseMenu.Portal>
        </BaseMenu.Root>
    )
}
