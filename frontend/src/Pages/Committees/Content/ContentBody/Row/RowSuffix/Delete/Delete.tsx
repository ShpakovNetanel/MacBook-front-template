import { Dialog as BaseDialog } from "@base-ui-components/react";
import { Trash } from "lucide-react";
import type { Report } from "../../../../../../../types/types";
import { REPORT_TYPES } from "../../../../../../../utils/MainConstants/ReportTypes";
import { useReportChangeStore } from "../../../../../../../zustand/reportsChanges";
import { useReportTypeStore } from "../../../../../../../zustand/reportType";
import styles from './Delete.module.scss';

type DeleteProps = {
    report: Report;
    screenUnitStatus: number;
}
export const Delete = ({ report, screenUnitStatus }: DeleteProps) => {
    const reportType = useReportTypeStore(s => s.reportType);
    const setMaterialsStatus = useReportChangeStore(s => s.setMaterialsStatus);
    const reportTypes = REPORT_TYPES.getFunctions.getReportingTypes();
    const reportUnits = report.items.map(item => item.unit);

    const disableCurrentType = () => {
        setMaterialsStatus([report.material], reportUnits, [reportType], 'Disabled');
    };

    const disableAllTypes = () => {
        setMaterialsStatus([report.material], reportUnits, reportTypes, 'Disabled');
    };

    return (
        <BaseDialog.Root>
            <BaseDialog.Trigger disabled={screenUnitStatus !== 0} className={styles.DeleteTrigger}>
                <Trash className={styles.Icon} />
            </BaseDialog.Trigger>
            <BaseDialog.Portal>
                <BaseDialog.Backdrop className={styles.DeleteBackdrop} />
                <BaseDialog.Popup className={styles.DeletePopup}>
                    <div className={styles.DeleteTitle}>מחיקת מק״ט</div>
                    <div className={styles.DeleteDescription}>
                        האם למחוק את המק״ט לכל הסוגים או רק לסוג הנוכחי?
                    </div>
                    <div className={styles.DeleteActions}>
                        <BaseDialog.Close className={styles.DeleteButton} onClick={disableCurrentType}>
                            רק סוג הדיווח הנוכחי
                        </BaseDialog.Close>
                        <BaseDialog.Close className={styles.DeleteButton} onClick={disableAllTypes}>
                            כל סוגי הדיווח
                        </BaseDialog.Close>
                    </div>
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    )
}
