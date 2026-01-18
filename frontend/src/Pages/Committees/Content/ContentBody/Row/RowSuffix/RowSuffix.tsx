import { Warehouse } from 'lucide-react';
import { Drawer } from '../../../../../../components/Drawer/Drawer';
import type { Report } from '../../../../../../types/types';
import { REPORT_TYPES } from '../../../../../../utils/MainConstants/ReportTypes';
import { useReportTypeStore } from '../../../../../../zustand/reportType';
import { Comment } from './Comment/Comment';
import { Delete } from './Delete/Delete';
import styles from './RowSuffix.module.scss';
import { useUnitStore } from '../../../../../../zustand/userUnit';
import { TotalQuantity } from './TotalQuantity/TotalQuantity';

type RowSuffixProps = {
    report: Report;
}

export const RowSuffix = ({ report }: RowSuffixProps) => {
    const reportType = useReportTypeStore(s => s.reportType);
    const screenUnit = useUnitStore(s => s.screenUnit);

    const showDeleteButton = REPORT_TYPES.getFunctions.getReportingTypes()
        .includes(reportType);

    return (
        <div className={styles.Suffix}>
            <div>
                <TotalQuantity report={report} />
            </div>
            <div className={styles.Icons}>
                <Drawer triggerIcon={<Warehouse className={styles.Icon} />}
                    slotProps={{
                        direction: 'bottom',
                        classes: {
                            Trigger: styles.Inventory
                        }
                    }} />
                <Comment screenUnitStatus={screenUnit.status.id} report={report} />
                {showDeleteButton && <Delete screenUnitStatus={screenUnit.status.id} report={report} />}
            </div>
        </div>
    )
}
