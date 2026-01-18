import { Save } from "lucide-react"
import styles from './SaveButton.module.scss';
import { Tooltip } from "../../../../components/Tooltip/Tooltip";

export const SaveButton = () => {
    return (
        <Tooltip title="שמירה" slotProps={{
            boldType: 'BoxShadow',
            outlineColor: 'black',
            classes: {
                Panel: styles.Panel
            }
        }}>
            <Save className={styles.Save} />
        </Tooltip>
    )
}