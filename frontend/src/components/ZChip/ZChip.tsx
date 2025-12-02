import styles from './ZChip.module.scss';

type SlotProps = {
    backgroundColor?: string;
}

type ZChipProps = {
    label: string;
    labelClassName?: string | undefined;
    slotProps?: SlotProps;
}

export const ZChip = ({ label, labelClassName, slotProps }: ZChipProps) => {
    return (
        <div className={styles[labelClassName ?? "Label"]}
            style={{ background: slotProps?.backgroundColor }}>
            {label}
        </div>
    )
}