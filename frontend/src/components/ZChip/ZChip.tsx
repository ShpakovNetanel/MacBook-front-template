import clsx from 'clsx';
import styles from './ZChip.module.scss';

type Classes = {
    Label?: string | undefined;
}

type SlotProps = {
    classes?: Classes;
    backgroundColor?: string;
}

type ZChipProps = {
    label: string;
    slotProps?: SlotProps;
}

export const ZChip = ({ label, slotProps }: ZChipProps) => {
    return (
        <div className={clsx(styles.Label, slotProps?.classes?.Label)}
            style={{ background: slotProps?.backgroundColor }}>
            {label}
        </div>
    )
}