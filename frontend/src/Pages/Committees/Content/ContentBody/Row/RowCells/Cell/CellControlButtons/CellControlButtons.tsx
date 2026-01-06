import { ChevronsDownUp, ChevronsUpDown, Network, Trees } from "lucide-react";
import type { Unit } from "../../../../../../../../types/types";
import styles from './CellControlButtons.module.scss';

type CellControlButtonsProps = {
    unit: Unit;
    setOpenedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
    openedUnit: Unit | null;
}

export const CellControlButtons = ({ openedUnit, setOpenedUnit, unit }: CellControlButtonsProps) => {
    const isUnitOpened = openedUnit?.id === unit.id;

    const onToggleClick = (unit: Unit | null) => {
        setOpenedUnit(unit);
    }

    return <div>
        {isUnitOpened
            ? <Network data-open={isUnitOpened} className={styles.Icon} onClick={() => onToggleClick(null)} />
            : <Network className={styles.Icon} onClick={() => onToggleClick(unit)} />}
    </div>
}