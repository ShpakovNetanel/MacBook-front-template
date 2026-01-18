import { MonitorUp } from "lucide-react"
import { SpeedDialMenu } from "../../../../../components/SpeedDial/SpeedDialMenu/SpeedDialMenu"
import { Tooltip } from "../../../../../components/Tooltip/Tooltip"
import styles from './MaterialPresets.module.scss';

export const MaterialPresets = () => {
    return (
        <div className={styles.Menu}>
            <Tooltip
                title="תבניות חומרים"
                slotProps={{ side: 'right' }}>
                <SpeedDialMenu items={['ייבוא מק״טים מקובץ אקסל', 'ייצוא מק״טים לקובץ אקסל']}
                    trigger={<MonitorUp />} />
            </Tooltip>
        </div>
    )
}