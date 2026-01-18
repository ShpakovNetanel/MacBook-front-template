import { EllipsisVertical } from "lucide-react"
import { SpeedDial, type SpeedDialItem } from "../../../../components/SpeedDial/SpeedDial"
import { ExcelButtons } from "./ExcelButtons/ExcelButtons";
import { MaterialPresets } from "./MaterialPresets/MaterialPresets";
import styles from './QuickActions.module.scss';

export const QuickActions = () => {
    const actions: SpeedDialItem[] = [
        {
            component: <ExcelButtons />,
            closeOnClick: false
        },
        {
            component: <MaterialPresets />,
            closeOnClick: false
        },
    ];

    return (
        <SpeedDial items={actions}
            trigger={<EllipsisVertical className={styles.Trigger}/>} />
    )
}