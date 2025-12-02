import { MonitorUp } from "lucide-react"
import { ZSpeedDialMenu } from "../../../../components/ZSpeedDial/ZSpeedDialMenu/ZSpeedDialMenu"
import styles from "./MaterialPresets.module.scss"
import { ZTooltip } from "../../../../components/ZTooltip/ZTooltip"

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