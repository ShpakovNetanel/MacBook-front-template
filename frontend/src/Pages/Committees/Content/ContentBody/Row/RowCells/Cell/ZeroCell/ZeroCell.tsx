import { Plus } from "lucide-react"
import { ZChip } from "../../../../../../../../components/ZChip/ZChip"
import { useReportTypeStore } from "../../../../../../../../zustand/reportType"
import { REPORT_TYPES } from "../../../../../../../../utils/MainConstants/ReportTypes";
import type { MouseEventHandler } from "react";
import styles from './ZeroCell.module.scss'

type ZeroCellProps = {
    onChipClick?: MouseEventHandler<HTMLElement>;
}

export const ZeroCell = ({ onChipClick }: ZeroCellProps) => {
    const reportType = useReportTypeStore(s => s.reportType);

    return <ZChip label={<Plus className={styles.Icon}/>}
        slotProps={{
            backgroundColor: REPORT_TYPES.colorsFunctions.getSecondary(reportType),
            classes: {
                Label: styles.Label
            }
        }}
        onChipClick={onChipClick} />
}