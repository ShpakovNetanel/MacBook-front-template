import { Toast } from "@base-ui-components/react";
import styles from './ZToastList.module.scss';
import { X } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { ClassNames } from "../../../../types/baseui";

type Disable = {
    close?: boolean;
}

export type SlotProps = {
    classes?: ClassNames<typeof Toast, 'Icon' | 'Toast'>;
    disable?: Disable;
    icon?: ReactNode;
}

type ZToastListProps = {
    slotProps?: SlotProps;
}

export const ZToastList = ({ slotProps }: ZToastListProps) => {
    const { toasts } = Toast.useToastManager();

    return (
        toasts.map((toast) => (
            <Toast.Root key={toast.id} toast={toast} className={clsx(styles.Toast, slotProps?.classes?.Toast)}>
                <Toast.Content className={clsx(styles.Content, slotProps?.classes?.Content)}>
                    {slotProps?.icon}
                    <div>
                        <Toast.Title className={clsx(styles.Title, slotProps?.classes?.Title)} />
                        <Toast.Description className={clsx(styles.Description, slotProps?.classes?.Description)} />
                        <Toast.Close className={clsx(styles.Close, slotProps?.classes?.Close)} aria-label="Close">
                            <X className={clsx(styles.Icon, slotProps?.classes?.Icon)} />
                        </Toast.Close>
                    </div>
                </Toast.Content>
            </Toast.Root>
        ))
    )
}