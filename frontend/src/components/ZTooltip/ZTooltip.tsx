import { Tooltip } from "@base-ui-components/react"
import styles from "./ZTooltip.module.scss"
import type { PropsWithChildren } from "react";
import type { Direction } from "../../types/types";
import clsx from "clsx";
import type { ClassNames } from "../../types/baseui";
import { ArrowSvg } from "../ArrowSvg/ArrowSvg";

type SlotProps = {
    side?: Direction;
    outlineColor?: string;
    boldType?: 'Outline' | 'BoxShadow';
    classes?: ClassNames<typeof Tooltip, 'Panel'>;
}

type ZTooltipProps = {
    title: string;
    slotProps?: SlotProps
} & PropsWithChildren & Tooltip.Root.Props;

export const ZTooltip = ({ title, children, slotProps, ...props }: ZTooltipProps) => {
    return (
        <Tooltip.Provider delay={100}>
            <div className={clsx(styles.Panel, slotProps?.classes?.Panel)}>
                <Tooltip.Root {...props}>
                    <Tooltip.Trigger className={clsx(styles.Button, slotProps?.classes?.Trigger)}>
                        {children}
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Positioner sideOffset={10} side={slotProps?.side ?? 'top'}>
                            <Tooltip.Popup className={clsx(styles.Popup, slotProps?.classes?.Popup)}
                                data-bold={slotProps?.boldType ?? 'BoxShadow'}
                                style={{
                                    '--outline-color': slotProps?.outlineColor
                                } as React.CSSProperties}>
                                <Tooltip.Arrow className={clsx(styles.Arrow, slotProps?.classes?.Arrow)}
                                    data-side={slotProps?.side ?? 'bottom'}>
                                    <ArrowSvg outlineColor={slotProps?.outlineColor}
                                        boldType={slotProps?.boldType ?? 'BoxShadow'} />
                                </Tooltip.Arrow>
                                {title}
                            </Tooltip.Popup>
                        </Tooltip.Positioner>
                    </Tooltip.Portal>
                </Tooltip.Root>
            </div>
        </Tooltip.Provider>
    )
}