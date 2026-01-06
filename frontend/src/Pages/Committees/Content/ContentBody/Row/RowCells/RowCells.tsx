import type { Report, Unit } from '../../../../../../types/types';
import { Cell } from './Cell/Cell';
import styles from './RowCells.module.scss';

type RowCellsProps = {
    isSubRow: boolean;
    upperUnit: Unit;
    report: Report;
    openedUnit: Unit | null;
    setOpenedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
}

export const RowCells = ({ isSubRow, upperUnit, report, openedUnit, setOpenedUnit }: RowCellsProps) => {
    const cellsReports = {
        ...report,
        items: report.items.filter(item => item.unit.parentId === upperUnit.id)
    }

    return (
        <div className={styles.Cells}>
            {cellsReports.items.map(item => <Cell
                key={item.unit.id}
                isSubRow={isSubRow}
                item={item}
                material={report.material}
                setOpenedUnit={setOpenedUnit}
                openedUnit={openedUnit} />)}
        </div>
    )
}