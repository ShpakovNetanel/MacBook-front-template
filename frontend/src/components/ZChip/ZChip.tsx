import clsx from 'clsx';
import styles from './ZChip.module.scss';
import type { MouseEventHandler, ReactNode } from 'react';

type Classes = {
    Label?: string | undefined;
}

type SlotProps = {
    classes?: Classes;
    backgroundColor?: string;
}

type ZChipProps = {
    label: ReactNode;
    slotProps?: SlotProps;
    onChipClick?: MouseEventHandler<HTMLElement>;
}

export const ZChip = ({ label, slotProps, onChipClick }: ZChipProps) => {
    return (
        <div className={clsx(styles.Label, slotProps?.classes?.Label)}
            style={{ background: slotProps?.backgroundColor }}
            onClick={onChipClick}>
            {label}
        </div>
    )
}