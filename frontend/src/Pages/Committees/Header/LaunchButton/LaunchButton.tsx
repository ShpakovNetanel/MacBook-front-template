import { Rocket } from "lucide-react";
import { Tooltip } from "../../../../components/Tooltip/Tooltip";
import styles from './LaunchButton.module.scss';

export const LaunchButton = () => {
    return (
        <Tooltip title="דיווח" slotProps={{
            outlineColor: 'black',
            boldType: 'BoxShadow',
            classes: {
                Panel: styles.Panel
            }
        }}>
            <Rocket className={styles.Launch} />
        </Tooltip>
    )
}