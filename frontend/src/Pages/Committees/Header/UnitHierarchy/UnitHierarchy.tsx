import { ZDrawer } from "../../../../components/ZDrawer/ZDrawer";
import styles from './UnitHierarchy.module.scss';

export const UnitHierarchy = () => {
    return (
        <ZDrawer 
        slotProps={{
            direction: 'right',
            classes: {
                Trigger: styles.Trigger,
                Icon: styles.Icon
            }
        }}/>
    )
}