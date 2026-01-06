import { isEmpty, isNull } from "lodash";
import { useState } from "react";
import { ZTyphography } from "../../../../../../components/ZTypography/ZTypography";
import type { Report, Unit } from "../../../../../../types/types";
import { RowCells } from "../RowCells/RowCells";
import styles from './SubRow.module.scss';
import { Separator } from "@base-ui-components/react";

type SubRowProps = {
    upperUnit: Unit;
    report: Report;
}

export const SubRow = ({ upperUnit, report }: SubRowProps) => {
    const [openedUnit, setOpenedUnit] = useState<null | Unit>(null)

    const subRowReports = {
        ...report,
        items: report.items.filter(item => item.unit.parentId === upperUnit.id)
    }

    return <>
        <Separator
            orientation="horizontal"
            className={styles.Separator} />
        <div className={styles.SubRow}
            data-subrow-open={!isNull(openedUnit)}>
            {isEmpty(subRowReports.items)
                ? <ZTyphography>{`אין יחידות להצגה`}</ZTyphography>
                : <RowCells
                    isSubRow={true}
                    upperUnit={upperUnit}
                    report={subRowReports}
                    openedUnit={openedUnit}
                    setOpenedUnit={setOpenedUnit} />}
        </div>
        {!isNull(openedUnit) && <SubRow upperUnit={openedUnit}
            report={report}
        />}
    </>
}