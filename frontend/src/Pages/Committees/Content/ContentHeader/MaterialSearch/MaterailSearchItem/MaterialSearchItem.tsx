import { Separator, Toggle } from "@base-ui-components/react";
import { Star } from "lucide-react";
import { ZChip } from "../../../../../../components/ZChip/ZChip";
import { ZTyphography } from "../../../../../../components/ZTypography/ZTypography";
import type { Material } from "../../../../../../types/types";
import { stringToHslColor } from "../../../../../../utils/stringToColor";
import styles from './MaterialSearchItem.module.scss';

type MaterialSearchItemProps = {
    item: Material;
}

export const MaterialSearchItem = ({ item }: MaterialSearchItemProps) => {
    return (
        <div className={styles.Item}>
            <div className={styles.Material}>
                <div className={styles.MaterialTexts}>
                    <ZTyphography slotProps={{
                        classes: {
                            Label: styles.MaterialTitle
                        }
                    }}>
                        {item.id}
                    </ZTyphography>
                    <ZTyphography slotProps={{
                        classes: {
                            Label: styles.MaterialTitle
                        }
                    }}>
                        {item.nickname}
                    </ZTyphography>
                    <ZTyphography slotProps={{
                        classes: {
                            Label: styles.MaterialDescription
                        }
                    }}>
                        {item.description}
                    </ZTyphography>
                </div>
                <ZChip label={item.category} slotProps={{
                    backgroundColor:
                        stringToHslColor(item.category),
                    classes: {
                        Label: styles.Label
                    }
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
                                <Star className={styles.Icon} fill="yellow" />
                            </button>
                        );
                    }

                    return (
                        <button type="button" {...props} className={styles.Button}>
                            <Star className={styles.Icon} />
                        </button>
                    );
                }} />
        </div>
    )
}
