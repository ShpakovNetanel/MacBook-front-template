import { Toast as BaseToast } from "@base-ui-components/react";
import styles from './ToastList.module.scss';
import { X } from "lucide-react";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { ClassNames } from "../../../../types/baseui";

type Disable = {
    close?: boolean;
}

export type SlotProps = {
    classes?: ClassNames<typeof BaseToast, 'Icon' | 'Toast'>;
    disable?: Disable;
    icon?: ReactNode;
}

type ToastListProps = {
    slotProps?: SlotProps;
}

export const ToastList = ({ slotProps }: ToastListProps) => {
    const { toasts } = BaseToast.useToastManager();

    return (
        toasts.map((toast) => (
            <BaseToast.Root key={toast.id} toast={toast} className={clsx(styles.Toast, slotProps?.classes?.Toast)}>
                <BaseToast.Content className={clsx(styles.Content, slotProps?.classes?.Content)}>
                    {slotProps?.icon}
                    <div>
                        <BaseToast.Title className={clsx(styles.Title, slotProps?.classes?.Title)} />
                        <BaseToast.Description className={clsx(styles.Description, slotProps?.classes?.Description)} />
                        <BaseToast.Close className={clsx(styles.Close, slotProps?.classes?.Close)} aria-label="Close">
                            <X className={clsx(styles.Icon, slotProps?.classes?.Icon)} />
                        </BaseToast.Close>
                    </div>
                </BaseToast.Content>
            </BaseToast.Root>
        ))
    )
}
