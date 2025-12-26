import { FileSpreadsheet } from "lucide-react"
import styles from "./ExcelButtons.module.scss"
import { ZSpeedDialMenu } from "../../../../../components/ZSpeedDial/ZSpeedDialMenu/ZSpeedDialMenu"
import { ZTooltip } from "../../../../../components/ZTooltip/ZTooltip"

export const ExcelButtons = () => {
    return (
        <div className={styles.Menu}>
            <ZTooltip
                title="פקדי אקסל"
                slotProps={{ side: 'right' }}>
                <ZSpeedDialMenu
                    items={['ייבוא מק״טים מקובץ אקסל', 'ייצוא מק״טים לקובץ אקסל']}
                    trigger={<FileSpreadsheet />}
                    slotProps={{
                        classes: {
                            Button: styles.Button
                        }
                    }} />
            </ZTooltip>
        </div>
    )
}