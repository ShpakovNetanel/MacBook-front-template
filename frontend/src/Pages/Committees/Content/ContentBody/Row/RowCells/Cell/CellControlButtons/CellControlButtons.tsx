import { Network, Sigma } from "lucide-react";
import type { Unit } from "../../../../../../../../types/types";
import { REPORT_TYPES } from "../../../../../../../../utils/MainConstants/ReportTypes";
import { useReportTypeStore } from "../../../../../../../../zustand/reportType";
import styles from './CellControlButtons.module.scss';

type CellControlButtonsProps = {
    unit: Unit;
    setOpenedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
    openedUnit: Unit | null;
    isCellHovered: boolean;
}

export const CellControlButtons = ({ openedUnit, setOpenedUnit, unit, isCellHovered }: CellControlButtonsProps) => {
    const isUnitOpened = openedUnit?.id === unit.id;
    const reportType = useReportTypeStore(s => s.reportType);

    const onToggleClick = () => {
        setOpenedUnit(isUnitOpened ? null : unit);
    }

    const show = (isCellHovered && unit.level !== 4)
        || isUnitOpened

    return <div
        className={styles.Control}
        data-show={show}>
        <Network data-open={isUnitOpened}
            data-show={unit.level !== 4}
            className={styles.SubRowOpener}
            onClick={onToggleClick} />
        {reportType === REPORT_TYPES.TYPES.REQUISITION.id &&
            openedUnit?.id === unit.id &&
            < Sigma className={styles.ChildrenSum} />}
    </div>
}