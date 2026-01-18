import type { Material, ReportItem, Unit } from "../../../../../../../types/types";
import { useReportChangeStore } from "../../../../../../../zustand/reportsChanges";
import { useReportTypeStore } from "../../../../../../../zustand/reportType";
import { CellControlButtons } from "./CellControlButtons/CellControlButtons";
import { NumberedCell } from "./NumberedCell/NumberedCell";
import { ZeroCell } from "./ZeroCell/ZeroCell";
import styles from './Cell.module.scss';
import { Typhography } from "../../../../../../../components/Typography/Typography";
import { isNull } from "lodash";
import { useState } from "react";
import { REPORT_TYPES } from "../../../../../../../utils/MainConstants/ReportTypes";
import { useFetchUnits } from "../../../../../../../api/units";
import { useUnitStore } from "../../../../../../../zustand/userUnit";

type CellProps = {
    isSubRow: boolean;
    item: ReportItem;
    material: Material;
    reportItems: ReportItem[];
    setOpenedUnit: React.Dispatch<React.SetStateAction<Unit | null>>;
    openedUnit: Unit | null;
}

export const Cell = ({ isSubRow, item, material, reportItems, setOpenedUnit, openedUnit }: CellProps) => {
    const [isCellHovered, setIsCellHovered] = useState(false);
    const reportType = useReportTypeStore(s => s.reportType);

    const reportChangeQuantity = useReportChangeStore(s => s.getReportChange({
        materialId: material.id,
        type: reportType,
        unitId: item.unit.id
    })?.quantity);
    const updateReportChange = useReportChangeStore(s => s.updateReportChange);
    const aggregateQuantity = useReportChangeStore(s => s.aggregateQuantity);

    const units = useFetchUnits();
    const screenUnit = useUnitStore(s => s.screenUnit);

    const dbReport = item.types.find(type => type.id === reportType)?.quantity
    const cellQuantity = reportChangeQuantity ?? dbReport ?? 0;

    const updateReportChangeQuantity = (quantity: number) => {
        REPORT_TYPES.getFunctions.getAggregatedTypes().includes(reportType)
            ? aggregateQuantity({
                materialId: material.id,
                type: reportType,
                unitId: item.unit.id,
                quantity,
                status: "Active"
            }, screenUnit, units, reportItems)
            : updateReportChange({
                materialId: material.id,
                type: reportType,
                unitId: item.unit.id,
                quantity,
                status: "Active"
            });
    }

    const isCellOpened = !isNull(openedUnit) && openedUnit.id === item.unit.id;
    const isCellDisabled = REPORT_TYPES.getFunctions.getAggregatedTypes().includes(reportType) &&
        item.unit.level !== 4;

    const quantityStep = REPORT_TYPES.getFunctions.getAggregatedTypes().includes(reportType)
        ? 1
        : material.multiply;

    return <div
        onMouseEnter={() => setIsCellHovered(true)}
        onMouseLeave={() => setIsCellHovered(false)}
        data-subrow={isSubRow}
        className={styles.Cell}>
        {isSubRow && <Typhography slotProps={{
            classes: {
                Label: styles.Label
            }
        }}>{item.unit.description}</Typhography>}
        {!cellQuantity && !isCellDisabled
            ? <ZeroCell onChipClick={() => updateReportChangeQuantity(quantityStep)} />
            : <NumberedCell isCellOpened={isCellOpened}
                quantity={cellQuantity}
                multiply={quantityStep}
                disabled={isCellDisabled}
                updateReportChange={updateReportChangeQuantity} />}
        <CellControlButtons openedUnit={openedUnit}
            setOpenedUnit={setOpenedUnit}
            unit={item.unit}
            isCellHovered={isCellHovered} />
    </div>
}
