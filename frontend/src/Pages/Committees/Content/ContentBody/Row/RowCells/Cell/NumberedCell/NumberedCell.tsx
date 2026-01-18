import { NumberField } from "../../../../../../../../components/NumberField/NumberField";
import { REPORT_TYPES } from "../../../../../../../../utils/MainConstants/ReportTypes";
import { useReportTypeStore } from "../../../../../../../../zustand/reportType";
import styles from './NumberedCell.module.scss';

type NumberedCellProps = {
    quantity: number;
    multiply: number;
    updateReportChange: (quantity: number) => void;
    isCellOpened: boolean;
    disabled: boolean;
}

export const NumberedCell = ({ quantity, multiply, updateReportChange, isCellOpened, disabled }: NumberedCellProps) => {
    const onQuantityChange = (value: number | null) => {
        updateReportChange(value ?? 0)
    }

    return <NumberField
        slotProps={{
            classes: {
                Root: styles.Field,
                Group: styles.Group,
                Input: styles.Input,
                Decrement: styles.Decrement,
                Increment: styles.Increment,
                Icon: styles.Icon
            }
        }}
        disabled={disabled}
        data-border-error={quantity % multiply !== 0}
        data-cell-bolded={isCellOpened}
        onValueChange={onQuantityChange}
        value={quantity}
        step={multiply}
        min={0}
        max={999999999} />
}