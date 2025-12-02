import { Toast } from "@base-ui-components/react"
import type { ReactNode } from "react";
import styles from './ZToastButton.module.scss';

type Classes = {
    Button?: keyof typeof styles;
}

export type SlotProps = {
    classes?: Classes;
    icon?: ReactNode;
}

type ZToastButtonProps = {
    title: string;
    description: string;
    slotProps?: SlotProps;
}

export const ZToastButton = ({ description, title, slotProps }: ZToastButtonProps) => {
    const toastManager = Toast.useToastManager();

    const createToast = () => {
        toastManager.add({
            title,
            description,
        })
    }

    return <button
        className={styles.Button}
        onClick={createToast}>
        {slotProps?.icon ?? 'Toast Me!'}
    </button>
}