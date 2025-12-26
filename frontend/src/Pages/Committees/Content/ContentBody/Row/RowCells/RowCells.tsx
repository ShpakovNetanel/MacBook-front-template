import type { ReportItem } from '../../../../../../types/types';
import { Cell } from './Cell/Cell';
import styles from './RowCells.module.scss';

type RowCellsProps = {
    items: ReportItem[];
}

export const RowCells = ({ items }: RowCellsProps) => {
    return (
        <div className={styles.Cells}>
            {items.map(item => <Cell key={item.unit.id} item={item} />)}
        </div>
    )
}