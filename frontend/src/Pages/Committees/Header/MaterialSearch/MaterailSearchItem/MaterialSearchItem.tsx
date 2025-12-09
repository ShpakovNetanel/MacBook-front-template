import { Heart } from "lucide-react";
import { ZChip } from "../../../../../components/ZChip/ZChip";
import { ZTyphography } from "../../../../../components/ZTypography/ZTypography";
import type { Material } from "../../../../../types/types";
import { stringToHslColor } from "../../../../../utils/stringToColor";
import styles from './MaterialSearchItem.module.scss';
import { Toggle } from "@base-ui-components/react";

type MaterialSearchItemProps = {
    item: Material;
}

export const MaterialSearchItem = ({ item }: MaterialSearchItemProps) => {
    return (
        <div className={styles.Item}>
            <div className={styles.Material}>
                <ZTyphography>{item.id} - {item.nickname}</ZTyphography>
                <ZTyphography>{item.description}</ZTyphography>
                <ZChip label={item.category} slotProps={{
                    backgroundColor:
                        stringToHslColor(item.category)
                }} />
            </div>
            <Toggle
                className={styles.Toggle}
                render={(propsRaw, state) => {
                    const props = {
                        ...propsRaw,
                        onClick: (e: any) => {
                            e.stopPropagation();
                            propsRaw.onClick?.(e);
                        },
                        onPointerDown: (e: any) => {
                            e.stopPropagation();
                            propsRaw.onPointerDown?.(e);
                        },
                        onMouseDown: (e: any) => {
                            e.stopPropagation();
                            propsRaw.onMouseDown?.(e);
                        },
                    };
                    if (state.pressed) {
                        return (
                            <button type="button" {...props} className={styles.Button}>
                                <Heart className={styles.Icon} fill="rgba(255, 105, 180, 0.8)" />
                            </button>
                        );
                    }

                    return (
                        <button type="button" {...props} className={styles.Button}>
                            <Heart className={styles.Icon} />
                        </button>
                    );
                }} />
        </div>
    )
}