import { Separator } from "@base-ui-components/react";
import { isNull } from "lodash";
import { useState } from "react";
import type { Report, Unit } from "../../../../../types/types";
import { useUnitStore } from "../../../../../zustand/userUnit";
import styles from './Row.module.scss';
import { RowCells } from "./RowCells/RowCells";
import { RowPrefix } from "./RowPrefix/RowPrefix";
import { RowSuffix } from "./RowSuffix/RowSuffix";
import { SubRow } from "./SubRow/SubRow";

type RowProps = {
    report: Report;
    childrenToDisplay: Unit[];
    transitionProps: Record<string, string>;
}

export const Row = ({
    report,
    childrenToDisplay,
    transitionProps,
}: RowProps) => {
    const [openedUnit, setOpenedUnit] = useState<null | Unit>(null)
    const screenUnit = useUnitStore(s => s.screenUnit);

    return (
        <div>
            <div className={styles.Row} data-row-open={!isNull(openedUnit)}>
                <RowPrefix material={report.material} />
                <RowCells
                    isSubRow={false}
                    upperUnit={screenUnit}
                    report={report}
                    setOpenedUnit={setOpenedUnit}
                    openedUnit={openedUnit}
                    childrenToDisplay={childrenToDisplay}
                    transitionProps={transitionProps} />
                <RowSuffix report={report} />
            </div>
            {!isNull(openedUnit) &&
                <SubRow key={openedUnit.id}
                    upperUnit={openedUnit}
                    report={report}
                    transitionProps={transitionProps} />}
        </div>
    )
}
