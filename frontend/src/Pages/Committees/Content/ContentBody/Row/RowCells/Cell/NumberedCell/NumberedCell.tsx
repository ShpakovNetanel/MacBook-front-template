import type { NumberFieldRootChangeEventDetails } from "@base-ui-components/react";
import { ZNumberField } from "../../../../../../../../components/ZNumberField/ZNumberField";
import styles from './NumberedCell.module.scss'

type NumberedCellProps = {
    quantity: number;
    multiply: number;
    updateReportChange: (quantity: number) => void;
}

export const NumberedCell = ({ quantity, multiply, updateReportChange }: NumberedCellProps) => {
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
                Increment: styles.Increment
            }
        }}
        onValueChange={onQuantityChange}
        value={quantity}
        step={multiply}
        min={0}
        max={999999999} />
}