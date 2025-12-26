import { ZTyphography } from "../../../../../../../components/ZTypography/ZTypography";
import type { ReportItem } from "../../../../../../../types/types"
import { useReportTypeStore } from "../../../../../../../zustand/reportType";
import styles from './Cell.module.scss';

type CellProps = {
    item: ReportItem;
}

export const Cell = ({ item }: CellProps) => {
    const reportType = useReportTypeStore(s => s.reportType);
    console.log({ reportType });

    const cellQuantity = item.types.find(type => type.id === reportType)?.quantity;

    return <ZTyphography slotProps={{
        classes: {
            Label: styles.Cell
        }
    }}>{cellQuantity}</ZTyphography>;
}