import type { CSSProperties } from 'react';
import { Tooltip } from '../../../../../../../components/Tooltip/Tooltip';
import { Typhography } from '../../../../../../../components/Typography/Typography';
import type { Report, ReportItem } from '../../../../../../../types/types';
import { REPORT_TYPES, type ReportType } from '../../../../../../../utils/MainConstants/ReportTypes';
import { useReportTypeStore } from '../../../../../../../zustand/reportType';
import { useUnitStore } from '../../../../../../../zustand/userUnit';
import styles from './TotalQuantity.module.scss';
import { UNIT_STATUSES } from '../../../../../../../utils/MainConstants/UnitStatuses';
import { Zap } from 'lucide-react';
import { useReportChangeStore } from '../../../../../../../zustand/reportsChanges';

type TotalQuantityProps = {
    report: Report
}

const isMaterialRowAllocated = (allocatedQuantity: number | null, unitStatusId: number) =>
    allocatedQuantity !== null && unitStatusId !== 1

export const TotalQuantity = ({ report }: TotalQuantityProps) => {
    const reportType = useReportTypeStore(s => s.reportType);
    const screenUnit = useUnitStore(s => s.screenUnit);
    const reportsChanges = useReportChangeStore(s => s.reportsChanges);

    const rowReportItems = report.items.filter(item =>
        item.unit.parent?.id === screenUnit.id &&
        item.unit.status.id === UNIT_STATUSES.WAITING_FOR_ALLOCATION.id &&
        item.unit.status.visibility === 'visible'
    );

    const getReportItemQuantity = (reportItem: ReportItem, reportTypeId: ReportType) => {
        const reportChange = reportsChanges.find(change =>
            change.materialId === report.material.id &&
            change.unitId === reportItem.unit.id &&
            change.type === reportTypeId
        );

        if (reportChange) {
            if (reportChange.status !== 'Active') {
                return 0;
            }

            if (typeof reportChange.quantity === 'number') {
                return reportChange.quantity;
            }
        }

        const dbReportType = reportItem.types.find(type => type.id === reportTypeId);
        return dbReportType?.status === 'Active' ? dbReportType.quantity : 0;
    };

    const getTotalQuantity = (reportTypeId: ReportType) => {
        return rowReportItems.reduce((sum, item) =>
            sum + getReportItemQuantity(item, reportTypeId), 0);
    };

    const totalQuantity = getTotalQuantity(reportType);
    const requisitionTotalQuantity = getTotalQuantity(REPORT_TYPES.TYPES.REQUISITION.id);

    const showAllocationQuantity = reportType === REPORT_TYPES.TYPES.ALLOCATION.id &&
        (screenUnit.status.id === UNIT_STATUSES.WAITING_FOR_ALLOCATION.id) &&
        screenUnit.id !== 0

    const totalQuantityColor = `${showAllocationQuantity
        ? totalQuantity === 0
            ? 'black'
            : totalQuantity < Number(report.allocatedQuantity)
                ? 'orange'
                : totalQuantity === report.allocatedQuantity
                    ? 'green'
                    : 'red'
        : "black"
        }`

    const getRemainingText = !report.allocatedQuantity
        || REPORT_TYPES.getFunctions.getReportingTypes().includes(reportType)
        ? ``
        : totalQuantity < report.allocatedQuantity
            ? `נשארו להקצאה ${report.allocatedQuantity - totalQuantity} ${report.material.unitOfMeasure}`
            : totalQuantity === report.allocatedQuantity
                ? `הקצית בול`
                : `הקצאה חורגת ב${totalQuantity - report.allocatedQuantity} ${report.material.unitOfMeasure}`

    return (
        <div className={styles.Quantity}>
            {reportType === REPORT_TYPES.TYPES.ALLOCATION.id &&
                screenUnit.id === 0
                ? (
                    <div className={styles.MatkalAlloc}>
                        <Typhography
                            style={{
                                '--quantity-color': totalQuantityColor
                            } as CSSProperties}
                            slotProps={{
                                classes: {
                                    Label: styles.MatkalAllocLabel
                                }
                            }}>{totalQuantity}</Typhography>
                        <Typhography
                            slotProps={{
                                classes: {
                                    Label: styles.MatkalAllocMeas
                                }
                            }}>{report.material.unitOfMeasure}</Typhography>
                    </div>
                )
                : reportType === REPORT_TYPES.TYPES.ALLOCATION.id &&
                    isMaterialRowAllocated(report.allocatedQuantity, screenUnit.status.id)
                    ? (
                        <Typhography slotProps={{
                            classes: {
                                Label: styles.NotAllocated
                            }
                        }}>טרם הוקצה</Typhography>
                    ) : (
                        <Tooltip title={getRemainingText}>
                            <div>
                                {reportType === REPORT_TYPES.TYPES.ALLOCATION.id
                                    ? (
                                        <div>
                                            {requisitionTotalQuantity !== 0 && (
                                                <div className={styles.RequisitionTotalQuantity}
                                                    data-show-allocation={showAllocationQuantity}>
                                                    <Typhography slotProps={{
                                                        classes: {
                                                            Label: styles.RequisitionText
                                                        }
                                                    }}>
                                                        נדרש:
                                                    </Typhography>
                                                    <Typhography slotProps={{
                                                        classes: {
                                                            Label: styles.RequisitionQuantity
                                                        }
                                                    }}>
                                                        {`${requisitionTotalQuantity} ${report.material.unitOfMeasure}`}
                                                    </Typhography>
                                                </div>
                                            )}
                                            {showAllocationQuantity && (
                                                <div className={styles.Received}>
                                                    <div className={styles.ReceivedCell}>
                                                        <Typhography slotProps={{
                                                            classes: {
                                                                Label: styles.ReceivedQuantity
                                                            }
                                                        }}>{report.allocatedQuantity}</Typhography>
                                                        <Typhography slotProps={{
                                                            classes: {
                                                                Label: styles.ReceivedText
                                                            }
                                                        }}>הוקצה</Typhography>
                                                    </div>
                                                    <Typhography className={styles.Divider}>/</Typhography>
                                                    <div className={styles.Allocation}>
                                                        <div className={styles.AllocationCell}>
                                                            <Typhography slotProps={{
                                                                classes: {
                                                                    Label: styles.AllocationQuantity
                                                                }
                                                            }}>{totalQuantity}</Typhography>
                                                            <Typhography slotProps={{
                                                                classes: {
                                                                    Label: styles.AllocationText
                                                                }
                                                            }}>חולק</Typhography>
                                                        </div>
                                                        {requisitionTotalQuantity === 0 && (
                                                            <Typhography slotProps={{
                                                                classes: {
                                                                    Label: styles.AllocationUOM
                                                                }
                                                            }}>{report.material.unitOfMeasure}</Typhography>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                    : (<div className={styles.ReportTotalQuantity}
                                        data-is-allocation={reportType === REPORT_TYPES.TYPES.ALLOCATION.id}>
                                        {showAllocationQuantity && (
                                            <Typhography className={styles.RecievedQuantity}>{`${report.allocatedQuantity}/`}</Typhography>
                                        )}
                                        <Typhography className={styles.ReportQuantity}>{totalQuantity}</Typhography>
                                        <Typhography className={styles.ReportUOM}>{report.material.unitOfMeasure}</Typhography>
                                    </div>)}
                            </div>
                        </Tooltip>
                    )}
        </div >
    );
}
