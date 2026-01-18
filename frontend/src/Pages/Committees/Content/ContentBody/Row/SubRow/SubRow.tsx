import { isEmpty, isNull } from "lodash";
import { useState } from "react";
import { useFetchUnits } from "../../../../../../api/units";
import { Typhography } from "../../../../../../components/Typography/Typography";
import type { Report, Unit } from "../../../../../../types/types";
import { RowCells } from "../RowCells/RowCells";
import styles from './SubRow.module.scss';
import { Separator as BaseSeparator } from "@base-ui-components/react";
import { UNIT_STATUSES } from "../../../../../../utils/MainConstants/UnitStatuses";

type SubRowProps = {
    upperUnit: Unit;
    report: Report;
    transitionProps: Record<string, string>;
}

export const SubRow = ({
    upperUnit,
    report,
    transitionProps,
}: SubRowProps) => {
    const [openedUnit, setOpenedUnit] = useState<null | Unit>(null)
    const units = useFetchUnits();

    const subRowReports = {
        ...report,
        items: report.items.filter(item => item.unit.parent?.id === upperUnit.id)
    }

    const childrenUnits = units.filter(unit => unit.parent?.id === upperUnit.id
        && unit.status.id === UNIT_STATUSES.REQUESTING.id
        && unit.status.visibility === 'visible'
    );

    return <>
        <BaseSeparator className={styles.Separator} />
        <div
            className={styles.SubRow}
            data-subrow-open={!isNull(openedUnit)}
            data-row-kind="subrow"
            data-material-id={report.material.id}>
            {isEmpty(childrenUnits)
                ? <Typhography>{`אין יחידות להצגה`}</Typhography>
                : <>
                    <RowCells
                        isSubRow={true}
                        upperUnit={upperUnit}
                        report={subRowReports}
                        allReportItems={report.items}
                        openedUnit={openedUnit}
                        childrenToDisplay={childrenUnits}
                        setOpenedUnit={setOpenedUnit}
                        transitionProps={transitionProps} />
                </>}
        </div>
        {!isNull(openedUnit) &&
            <SubRow key={openedUnit.id}
                upperUnit={openedUnit}
                report={report}
                transitionProps={transitionProps}
            />}
    </>
}
