import type { Material, ReportItem, Unit } from "../../../../../../../types/types";
import { useReportChangeStore } from "../../../../../../../zustand/reportsChanges";
import { useReportTypeStore } from "../../../../../../../zustand/reportType";
import { CellControlButtons } from "./CellControlButtons/CellControlButtons";
import { NumberedCell } from "./NumberedCell/NumberedCell";
import { ZeroCell } from "./ZeroCell/ZeroCell";
import styles from './Cell.module.scss';
import { ZTyphography } from "../../../../../../../components/ZTypography/ZTypography";

type CellProps = {
    isSubRow: boolean;
    item: ReportItem;
    material: Material;
    setOpenedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
    openedUnit: Unit | null;
}

export const Cell = ({ isSubRow, item, material, setOpenedUnit, openedUnit }: CellProps) => {
    const reportType = useReportTypeStore(s => s.reportType);

    const reportChangeQuantity = useReportChangeStore(s => s.getReportChange({
        materialId: material.id,
        type: reportType,
        unitId: item.unit.id
    })?.quantity);
    const updateReportChange = useReportChangeStore(s => s.updateReportChange);

    const dbReport = item.types.find(type => type.id === reportType)?.quantity
    const cellQuantity = reportChangeQuantity ?? dbReport ?? 0;

    const updateReportChangeQuantity = (quantity: number) => {
        updateReportChange({
            materialId: material.id,
            type: reportType,
            unitId: item.unit.id,
            quantity
        });
    }

    return <div data-subrow={isSubRow} className={styles.Cell}>
        {isSubRow && <ZTyphography slotProps={{
            classes: {
                Label: styles.Label
            }
        }}>{item.unit.description}</ZTyphography>}
        {!cellQuantity
            ? <ZeroCell onChipClick={() => updateReportChangeQuantity(material.multiply)} />
            : <NumberedCell quantity={cellQuantity} multiply={material.multiply} updateReportChange={updateReportChangeQuantity} />}
        {item.unit.level !== 4 && <CellControlButtons openedUnit={openedUnit}
            setOpenedUnit={setOpenedUnit}
            unit={item.unit} />}
    </div>
}