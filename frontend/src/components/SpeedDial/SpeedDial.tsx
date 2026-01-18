import { Menu as BaseMenu } from "@base-ui-components/react";
import styles from "./SpeedDial.module.scss";
import React from "react";

export type SpeedDialItem = {
    component: React.ReactNode;
    closeOnClick?: boolean;
};

type SpeedDialProps = {
    items: SpeedDialItem[];
    trigger: React.ReactNode;
} & BaseMenu.Root.Props;

export const SpeedDial = ({ items, trigger, ...props }: SpeedDialProps) => {
    return (
        <BaseMenu.Root {...props}>
            <BaseMenu.Trigger className={styles.Button} openOnHover>
                {trigger}
            </BaseMenu.Trigger>
            <BaseMenu.Portal>
                <BaseMenu.Positioner className={styles.Positioner} sideOffset={8}>
                    <BaseMenu.Popup className={styles.Popup}>
                        {items.map((item, index) =>
                            <React.Fragment key={index}>
                                {item.component}
                            </React.Fragment>
                        )}
                    </BaseMenu.Popup>
                </BaseMenu.Positioner>
            </BaseMenu.Portal>
        </BaseMenu.Root>
    );
}
