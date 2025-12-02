import { Menu } from "@base-ui-components/react"
import type { ReactNode } from "react"
import styles from './ZMenu.module.scss'

type ZMenuProps = {
    items: ReactNode[];
    triggerButton: ReactNode;
}

export const ZMenu = ({ items, triggerButton }: ZMenuProps) => {
    return (
        <Menu.Root>
            <Menu.Trigger className={styles.Button}>
                {triggerButton}
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner className={styles.Positioner} sideOffset={8}>
                    <Menu.Popup className={styles.Popup}>
                        {items.map((item, index) => (
                            <Menu.Item className={styles.Item} key={index}>
                                {item}
                            </Menu.Item>
                        ))}
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    )
}