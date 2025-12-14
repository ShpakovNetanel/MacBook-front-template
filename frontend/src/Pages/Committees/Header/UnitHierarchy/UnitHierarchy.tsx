import { ZDrawer } from "../../../../components/ZDrawer/ZDrawer";
import styles from './UnitHierarchy.module.scss';

export const UnitHierarchy = () => {
    return (
        <ZDrawer 
        slotProps={{
            disableBackdrop: true,
            direction: 'left',
            classes: {
                Trigger: styles.Trigger
            }
        }}/>
    )
}