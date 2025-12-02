import { Heart } from "lucide-react";
import { ZChip } from "../../../../../components/ZChip/ZChip";
import { ZTyphography } from "../../../../../components/ZTypography/ZTypography";
import type { Material } from "../../../../../types/types";
import { stringToHslColor } from "../../../../../utils/stringToColor";
import styles from './MaterialSearchItem.module.scss';

type MaterialSearchItemProps = {
    item: Material;
}

export const MaterialSearchItem = ({ item }: MaterialSearchItemProps) => {
    return (
        <div className={styles.Item}>
            <div className={styles.Material}>
                <ZTyphography>{item.id} - {item.nickname}</ZTyphography>
                <ZTyphography>{item.description}</ZTyphography>
                <ZChip label={item.category} slotProps={{ backgroundColor: 
                    stringToHslColor(item.category)
                 }}/>
            </div>
            <div className={styles.Heart}>
                <Heart />
            </div>
        </div>
    )
}