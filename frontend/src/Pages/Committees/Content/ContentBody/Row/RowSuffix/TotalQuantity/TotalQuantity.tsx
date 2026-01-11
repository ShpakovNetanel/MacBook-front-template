import type { CSSProperties } from 'react';
import { ZTooltip } from '../../../../../../../components/ZTooltip/ZTooltip';
import { ZTyphography } from '../../../../../../../components/ZTypography/ZTypography';
import type { Report } from '../../../../../../../types/types';
import { REPORT_TYPES } from '../../../../../../../utils/MainConstants/ReportTypes';
import { useReportTypeStore } from '../../../../../../../zustand/reportType';
import { useUnitStore } from '../../../../../../../zustand/userUnit';
import styles from './TotalQuantity.module.scss';

type TotalQuantityProps = {
    report: Report
}

const isMaterialRowAllocated = (allocatedQuantity: number | null, unitStatusId: number) =>
    allocatedQuantity !== null && unitStatusId !== 1

export const TotalQuantity = ({ report }: TotalQuantityProps) => {
    const reportType = useReportTypeStore(s => s.reportType);
    const screenUnit = useUnitStore(s => s.screenUnit);

    const totalQuantity = 0;

    const showAllocationQuantity = reportType === REPORT_TYPES.TYPES.ALLOCATION.id &&
        (screenUnit.status.id === 1) &&
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

    return (
        <div className={styles.Quantity}>
            {reportType === REPORT_TYPES.TYPES.ALLOCATION.id &&
                screenUnit.id === 1
                ? (
                    <div className={styles.MatkalAlloc}>
                        <ZTyphography
                            style={{
                                '--quantity-color': totalQuantityColor
                            } as CSSProperties}
                            slotProps={{
                                classes: {
                                    Label: styles.MatkalAllocLabel
                                }
                            }}>{totalQuantity}</ZTyphography>
                        <ZTyphography
                            slotProps={{
                                classes: {
                                    Label: styles.MatkalAllocMeas
                                }
                            }}>{report.material.unitOfMeasure}</ZTyphography>
                    </div>
                )
                : reportType === REPORT_TYPES.TYPES.ALLOCATION.id &&
                    isMaterialRowAllocated(report.allocatedQuantity, screenUnit.status.id)
                    ? (
                        <ZTyphography slotProps={{
                            classes: {
                                Label: styles.NotAllocated
                            }
                        }}>טרם הוקצה</ZTyphography>
                    ) : (
                        <ZTooltip title={'sws'}>
                            <div>
                                {reportType === REPORT_TYPES.TYPES.ALLOCATION.id
                                    ? (
                                        <div></div>
                                    )
                                    : (<></>)}
                            </div>
                        </ZTooltip>
                    )}
        </div>
    )
}