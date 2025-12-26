import toast from "react-hot-toast";
import { useFetchUnits } from "../../../../api/units";
import { ZCombobox } from "../../../../components/ZCombobox/ZCombobox";
import type { Unit } from "../../../../types/types";
import { useUnitStore } from "../../../../zustand/userUnit";
import styles from './UnitChanger.module.scss';
import { UnitChangerItem } from "./UnitChangerItem/UnitChangerItem";

export const UnitChanger = () => {
    const units = useFetchUnits();
    const screenUnit = useUnitStore(s => s.screenUnit);
    const updateScreenUnit = useUnitStore(s => s.updateScreenUnit);
    const rootunit = useUnitStore(s => s.rootUnit);

    const onClear = () => {
        if(screenUnit.id === rootunit.id) {
            toast.error('אתה כבר ביחידה המבוקשת')
        } else {
            updateScreenUnit(rootunit)
        }
    }

    return <ZCombobox
        items={units}
        placeholder={screenUnit.description}
        value={screenUnit}
        onValueChange={(unit: Unit | null) => {
            if (unit) updateScreenUnit(unit)
        }}
        emptyLabel="לא נמצאו יחידות"
        onClear={onClear}
        itemToStringLabel={unit => unit.description}
        itemComponent={(unit: Unit) => <UnitChangerItem unit={unit} />}
        slotProps={{
            classes: {
                Container: styles.Container,
                Input: styles.Input,
                InputWrapper: styles.InputWrapper,
                ClearIcon: styles.Clear,
                ActionButtons: styles.ActionButtons,
            },
            disable: {
                checkIndicator: true
            }
        }} />
}