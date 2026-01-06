import toast from "react-hot-toast";
import { useFetchUnits } from "../../../../api/units";
import { ZCombobox } from "../../../../components/ZCombobox/ZCombobox";
import type { Unit } from "../../../../types/types";
import { useUnitStore } from "../../../../zustand/userUnit";
import styles from './UnitChanger.module.scss';
import { UnitChangerItem } from "./UnitChangerItem/UnitChangerItem";
import { ZChip } from "../../../../components/ZChip/ZChip";
import { X } from "lucide-react";

export const UnitChanger = () => {
    const units = useFetchUnits();
    const screenUnit = useUnitStore(s => s.screenUnit);
    const updateScreenUnit = useUnitStore(s => s.updateScreenUnit);
    const rootunit = useUnitStore(s => s.rootUnit);

    const onClear = () => {
        if (screenUnit.id === rootunit.id) {
            toast.error('אתה כבר ביחידה המבוקשת');
            updateScreenUnit(screenUnit)
        } else {
            updateScreenUnit(rootunit)
        }
    }

    return <>
        <ZCombobox
            items={units}
            placeholder={screenUnit.description}
            value={screenUnit}
            onValueChange={(unit: Unit | null) => {
                if (unit) updateScreenUnit(unit)
            }}
            emptyLabel="לא נמצאו יחידות"
            onAdormentClick={onClear}
            startAdornment={<X className={styles.ClearIcon} />}
            itemToStringLabel={unit => unit.description}
            itemComponent={(unit: Unit) => <UnitChangerItem unit={unit} />}
            slotProps={{
                classes: {
                    Container: styles.Container,
                    Input: styles.Input,
                    InputWrapper: styles.InputWrapper,
                    Clear: styles.Clear,
                    ActionButtons: styles.ActionButtons,
                    Trigger: styles.Trigger,
                    TriggerIcon: styles.TriggerIcon
                },
                disable: {
                    checkIndicator: true
                }
            }} />
        <ZChip label={screenUnit.status.description} slotProps={{
            backgroundColor: 'white',
            classes: {
                Label: styles.Label
            }
        }} />
    </>
}