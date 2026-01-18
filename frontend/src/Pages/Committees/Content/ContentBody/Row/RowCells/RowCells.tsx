import { isEmpty } from 'lodash';
import type { Report, Unit } from '../../../../../../types/types';
import { REPORT_TYPES } from '../../../../../../utils/MainConstants/ReportTypes';
import { Cell } from './Cell/Cell';
import styles from './RowCells.module.scss';

type RowCellsProps = {
    isSubRow: boolean;
    upperUnit: Unit;
    report: Report;
    allReportItems?: Report["items"];
    openedUnit: Unit | null;
    setOpenedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
    childrenToDisplay: Unit[];
    transitionProps: Record<string, string>;
}

export const RowCells = ({ isSubRow, upperUnit, report, openedUnit, setOpenedUnit,
    allReportItems,
    childrenToDisplay,
    transitionProps
}: RowCellsProps) => {
    const cellReportsItems = report.items.filter(item => item.unit.parent?.id === upperUnit.id);
    const reportTypes = REPORT_TYPES.getFunctions.getReportingTypes();
    const itemByUnitId = new Map(cellReportsItems.map(item => [item.unit.id, item]));
    const reportItems = allReportItems ?? report.items;

    const cellsReports = {
        ...report,
        items: isEmpty(cellReportsItems)
            ? childrenToDisplay?.map(unit => ({
                unit,
                types: reportTypes.map(reportType => ({
                    comment: '',
                    id: reportType,
                    quantity: 0,
                    status: 'Active'
                }))
            }))
            : childrenToDisplay?.map(unit => (
                itemByUnitId.get(unit.id) ?? {
                    unit,
                    types: reportTypes.map(reportType => ({
                        comment: '',
                        id: reportType,
                        quantity: 0,
                        status: 'Active'
                    }))
                }
            ))
    }

    return (
        <div data-sub-row={isSubRow} className={styles.Cells} {...transitionProps}>
            {cellsReports.items.map(item => <Cell
                key={item.unit.id}
                isSubRow={isSubRow}
                item={item}
                material={report.material}
                reportItems={reportItems}
                setOpenedUnit={setOpenedUnit}
                openedUnit={openedUnit} />)}
        </div>
    )
}
