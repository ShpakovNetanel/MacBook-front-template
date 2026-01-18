import { FileSpreadsheet } from "lucide-react"
import styles from "./ExcelButtons.module.scss"
import { SpeedDialMenu } from "../../../../../components/SpeedDial/SpeedDialMenu/SpeedDialMenu"
import { Tooltip } from "../../../../../components/Tooltip/Tooltip"

export const ExcelButtons = () => {
    return (
        <div className={styles.Menu}>
            <Tooltip
                title="פקדי אקסל"
                slotProps={{ side: 'right' }}>
                <SpeedDialMenu
                    items={['ייבוא מק״טים מקובץ אקסל', 'ייצוא מק״טים לקובץ אקסל']}
                    trigger={<FileSpreadsheet />}
                    slotProps={{
                        classes: {
                            Button: styles.Button
                        }
                    }} />
            </Tooltip>
        </div>
    )
}