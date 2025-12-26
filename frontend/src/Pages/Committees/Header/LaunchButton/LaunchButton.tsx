import { Rocket } from "lucide-react";
import { ZTooltip } from "../../../../components/ZTooltip/ZTooltip";
import styles from './LaunchButton.module.scss';

export const LaunchButton = () => {
    return (
        <ZTooltip title="דיווח" slotProps={{
            // outlineColor: 'black'
        }}>
            <Rocket className={styles.Launch} />
        </ZTooltip>
    )
}