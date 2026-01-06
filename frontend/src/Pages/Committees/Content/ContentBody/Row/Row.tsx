import { useState } from "react";
import type { Report, Unit } from "../../../../../types/types"
import styles from './Row.module.scss'
import { RowCells } from "./RowCells/RowCells";
import { RowPrefix } from "./RowPrefix/RowPrefix"
import { RowSuffix } from "./RowSuffix/RowSuffix";
import { isNull } from "lodash";
import { SubRow } from "./SubRow/SubRow";
import { useUnitStore } from "../../../../../zustand/userUnit";
import { Separator } from "@base-ui-components/react";

type RowProps = {
    report: Report;
}

export const Row = ({ report }: RowProps) => {
    const [openedUnit, setOpenedUnit] = useState<null | Unit>(null)
    const screenUnit = useUnitStore(s => s.screenUnit);

    console.log(1, { report });

    return (
        <div>
            <div className={styles.Row} data-row-open={!isNull(openedUnit)}>
                <RowPrefix material={report.material} />
                <RowCells
                    isSubRow={false}
                    upperUnit={screenUnit}
                    report={report}
                    setOpenedUnit={setOpenedUnit}
                    openedUnit={openedUnit} />
                <RowSuffix report={report} />
            </div>
            {!isNull(openedUnit) &&
                <>
                    <Separator orientation="horizontal" className={styles.Separator} />
                    <SubRow upperUnit={openedUnit}
                        report={report} />
                </>}
        </div>
    )
}