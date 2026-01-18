import clsx from 'clsx';
import styles from './Chip.module.scss';
import type { MouseEventHandler, ReactNode } from 'react';

type Classes = {
    Label?: string | undefined;
}

type SlotProps = {
    classes?: Classes;
    backgroundColor?: string;
}

type ChipProps = {
    label: ReactNode;
    slotProps?: SlotProps;
    onChipClick?: MouseEventHandler<HTMLElement>;
}

export const Chip = ({ label, slotProps, onChipClick }: ChipProps) => {
    return (
        <div className={clsx(styles.Label, slotProps?.classes?.Label)}
            style={{ background: slotProps?.backgroundColor }}
            onClick={onChipClick}>
            {label}
        </div>
    )
}