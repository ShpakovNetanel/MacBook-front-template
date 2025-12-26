import { Save } from "lucide-react"
import styles from './SaveButton.module.scss';
import { ZTooltip } from "../../../../components/ZTooltip/ZTooltip";

export const SaveButton = () => {
    return (
        <ZTooltip title="שמירה" slotProps={{
            boldType: 'BoxShadow',
            outlineColor: 'black'
        }}>
            <Save className={styles.Save} />
        </ZTooltip>
    )
}