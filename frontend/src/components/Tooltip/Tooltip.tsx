import { Tooltip as BaseTooltip } from "@base-ui-components/react"
import styles from "./Tooltip.module.scss"
import type { PropsWithChildren } from "react";
import type { Direction } from "../../types/types";
import clsx from "clsx";
import type { ClassNames } from "../../types/baseui";
import { ArrowSvg } from "../ArrowSvg/ArrowSvg";

type SlotProps = {
    side?: Direction;
    outlineColor?: string;
    boldType?: 'Outline' | 'BoxShadow';
    classes?: ClassNames<typeof BaseTooltip, 'Panel'>;
}

type TooltipProps = {
    title: string;
    slotProps?: SlotProps
} & PropsWithChildren & BaseTooltip.Root.Props;

export const Tooltip = ({ title, children, slotProps, ...props }: TooltipProps) => {
    return (
        <BaseTooltip.Provider delay={100}>
            <div className={clsx(styles.Panel, slotProps?.classes?.Panel)}>
                <BaseTooltip.Root {...props}>
                    <BaseTooltip.Trigger className={clsx(styles.Button, slotProps?.classes?.Trigger)}>
                        {children}
                    </BaseTooltip.Trigger>
                    <BaseTooltip.Portal>
                        <BaseTooltip.Positioner sideOffset={10} side={slotProps?.side ?? 'top'}>
                            <BaseTooltip.Popup className={clsx(styles.Popup, slotProps?.classes?.Popup)}
                                data-bold={slotProps?.boldType ?? 'BoxShadow'}
                                style={{
                                    '--outline-color': slotProps?.outlineColor
                                } as React.CSSProperties}>
                                <BaseTooltip.Arrow className={clsx(styles.Arrow, slotProps?.classes?.Arrow)}
                                    data-side={slotProps?.side ?? 'bottom'}>
                                    <ArrowSvg outlineColor={slotProps?.outlineColor}
                                        boldType={slotProps?.boldType ?? 'BoxShadow'} />
                                </BaseTooltip.Arrow>
                                {title}
                            </BaseTooltip.Popup>
                        </BaseTooltip.Positioner>
                    </BaseTooltip.Portal>
                </BaseTooltip.Root>
            </div>
        </BaseTooltip.Provider>
    )
}
