import { MonitorUp } from "lucide-react"
import { ZSpeedDialMenu } from "../../../../../components/ZSpeedDial/ZSpeedDialMenu/ZSpeedDialMenu"
import { ZTooltip } from "../../../../../components/ZTooltip/ZTooltip"
import styles from './MaterialPresets.module.scss';

export const MaterialPresets = () => {
    return (
        <div className={styles.Menu}>
            <ZTooltip
                title="תבניות חומרים"
                slotProps={{ side: 'right' }}>
                <ZSpeedDialMenu items={['ייבוא מק״טים מקובץ אקסל', 'ייצוא מק״טים לקובץ אקסל']}
                    trigger={<MonitorUp />} />
            </ZTooltip>
        </div>
    )
}