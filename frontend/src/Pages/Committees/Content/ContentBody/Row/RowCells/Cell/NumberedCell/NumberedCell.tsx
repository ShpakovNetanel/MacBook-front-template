import { ZNumberField } from "../../../../../../../../components/ZNumberField/ZNumberField";
import styles from './NumberedCell.module.scss';

type NumberedCellProps = {
    quantity: number;
    multiply: number;
    updateReportChange: (quantity: number) => void;
    isCellOpened: boolean;
}

export const NumberedCell = ({ quantity, multiply, updateReportChange, isCellOpened }: NumberedCellProps) => {
    const onQuantityChange = (value: number | null) => {
        updateReportChange(value ?? 0)
    }

    return <ZNumberField
        slotProps={{
            classes: {
                Root: styles.Field,
                Group: styles.Group,
                Input: styles.Input,
                Decrement: styles.Decrement,
                Increment: styles.Increment,
            }
        }}
        data-border-error={quantity % multiply !== 0}
        data-cell-bolded={isCellOpened}
        onValueChange={onQuantityChange}
        value={quantity}
        step={multiply}
        min={0}
        max={999999999} />
}