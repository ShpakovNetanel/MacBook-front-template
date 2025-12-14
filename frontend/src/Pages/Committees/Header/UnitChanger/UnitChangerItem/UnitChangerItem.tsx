import { ZChip } from "../../../../../components/ZChip/ZChip";
import { ZTyphography } from "../../../../../components/ZTypography/ZTypography";
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
            <ZTyphography>
                {`${unit.simul} - ${unit.description}`}
            </ZTyphography>
            <ZChip label={unitLevelToString(unit.level)}
                slotProps={{
                    backgroundColor: stringToHslColor(unit.level.toString())
                }} />
        </div>
    )
}