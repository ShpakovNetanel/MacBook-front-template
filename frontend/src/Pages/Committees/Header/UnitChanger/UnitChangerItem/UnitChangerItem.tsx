import { Chip } from "../../../../../components/Chip/Chip";
import { Typhography } from "../../../../../components/Typography/Typography";
import type { Unit } from "../../../../../types/types";
import { stringToHslColor } from "../../../../../utils/stringToColor";
import { unitLevelToString } from "../../../../../utils/unitFunctions";
import styles from './UnitChangerItem.module.scss';

type UnitChangerItemProps = {
    unit: Unit
};

export const UnitChangerItem = ({ unit }: UnitChangerItemProps) => {
    return (
        <div className={styles.Item}>
            <Typhography>
                {`${unit.simul} - ${unit.description}`}
            </Typhography>
            <Chip label={unitLevelToString(unit.level)}
                slotProps={{
                    backgroundColor: stringToHslColor(unit.level.toString())
                }} />
        </div>
    )
}