import { useFetchUnits } from "../../../../api/units";
import { ZCombobox } from "../../../../components/ZCombobox/ZCombobox";
import type { Unit } from "../../../../types/types";
import { UnitChangerItem } from "./UnitChangerItem/UnitChangerItem";
import styles from './UnitChanger.module.scss';

export const UnitChanger = () => {
    const units = useFetchUnits();

    return <ZCombobox
        items={units}
        placeholder="בחירת יחידה"
        emptyLabel="לא נמצאו יחידות"
        itemToStringLabel={unit => unit.description}
        itemComponent={(unit: Unit) => <UnitChangerItem unit={unit} />} 
        slotProps={{
            classes: {
                Input: styles.Input,
                InputWrapper: styles.InputWrapper,
                Clear: styles.Clear,
                Popup: styles.Popup,
                List: styles.List,
                Item: styles.Item
            }
        }}/>
}