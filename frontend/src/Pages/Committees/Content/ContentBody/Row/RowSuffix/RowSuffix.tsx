import { Trash, Warehouse } from 'lucide-react';
import { ZDrawer } from '../../../../../../components/ZDrawer/ZDrawer';
import type { Report } from '../../../../../../types/types';
import { Comment } from './Comment/Comment';
import styles from './RowSuffix.module.scss';

type RowSuffixProps = {
    report: Report;
}

export const RowSuffix = ({ report }: RowSuffixProps) => {
    return (
        <div className={styles.Suffix}>
            <ZDrawer triggerIcon={<Warehouse />}
                slotProps={{
                    direction: 'bottom',
                    classes: {
                        Trigger: styles.Inventory
                    }
                }} />
            <Comment report={report}/>
            <Trash />
        </div>
    )
}