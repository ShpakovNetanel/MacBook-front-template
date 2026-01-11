import { isEmpty, isNull } from "lodash";
import { useState } from "react";
import { useFetchUnits } from "../../../../../../api/units";
import { ZTyphography } from "../../../../../../components/ZTypography/ZTypography";
import type { Report, Unit } from "../../../../../../types/types";
import { RowCells } from "../RowCells/RowCells";
import styles from './SubRow.module.scss';
import { Separator } from "@base-ui-components/react";

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
        items: report.items.filter(item => item.unit.parentId === upperUnit.id)
    }

    const childrenUnits = units.filter(unit => unit.parentId === upperUnit.id
        && unit.status.id === 1
        && unit.status.visibility === 'visible'
    );

    return <>
        <Separator className={styles.Separator} />
        <div className={styles.SubRow}
            data-subrow-open={!isNull(openedUnit)}>
            {isEmpty(childrenUnits)
                ? <ZTyphography>{`אין יחידות להצגה`}</ZTyphography>
                : <>
                    <RowCells
                        isSubRow={true}
                        upperUnit={upperUnit}
                        report={subRowReports}
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
