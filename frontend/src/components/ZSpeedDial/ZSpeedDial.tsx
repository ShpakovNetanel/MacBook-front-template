import { Menu } from "@base-ui-components/react";
import styles from "./ZSpeedDial.module.scss";
import React from "react";

export type SpeedDialItem = {
    component: React.ReactNode;
    closeOnClick?: boolean;
};

type ZSpeedDialProps = {
    items: SpeedDialItem[];
    trigger: React.ReactNode;
} & Menu.Root.Props;

export const ZSpeedDial = ({ items, trigger, ...props }: ZSpeedDialProps) => {
    return (
        <Menu.Root {...props}>
            <Menu.Trigger className={styles.Button} openOnHover>
                {trigger}
            </Menu.Trigger>
            <Menu.Portal>
                <Menu.Positioner className={styles.Positioner} sideOffset={8}>
                    <Menu.Popup className={styles.Popup}>
                        {items.map((item, index) =>
                            <React.Fragment key={index}>
                                {item.component}
                            </React.Fragment>
                        )}
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    );
}