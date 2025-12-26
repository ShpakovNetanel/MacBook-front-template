import type { Report } from "../../../../../types/types"
import styles from './Row.module.scss'
import { RowCells } from "./RowCells/RowCells";
import { RowPrefix } from "./RowPrefix/RowPrefix"
import { RowSuffix } from "./RowSuffix/RowSuffix";

type RowProps = {
    report: Report;
}

export const Row = ({ report }: RowProps) => {
    return (
        <div className={styles.Row}>
        <RowPrefix material={report.material}/>
        <RowCells items={report.items}/>
        <RowSuffix report={report}/>
        </div>
    )
}