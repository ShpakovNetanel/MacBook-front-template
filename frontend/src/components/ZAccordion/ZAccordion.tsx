import { Accordion } from "@base-ui-components/react";
import clsx from "clsx";
import type { PropsWithChildren, ReactNode } from "react";
import type { ClassNames } from "../../types/baseui";
import styles from './ZAccordion.module.scss';

type SlotProps = {
    classes?: ClassNames<typeof Accordion>;
}

type ZAccordionProps = {
    slotProps?: SlotProps;
    trigger?: ReactNode;
    headerNode?: ReactNode;
} & PropsWithChildren;

export const ZAccordion = ({ trigger, headerNode, children, slotProps, ...props }: ZAccordionProps) => {
    return (
        <Accordion.Root className={clsx(styles.Accordion, slotProps?.classes?.Root)} {...props}>
            <Accordion.Item className={clsx(styles.Item, slotProps?.classes?.Item)}>
                <div className={clsx(styles.Header, slotProps?.classes?.Header)}>
                    <Accordion.Trigger className={clsx(styles.Trigger, slotProps?.classes?.Trigger)}>
                        {trigger ?? 'פתח'}
                    </Accordion.Trigger>
                    {headerNode}
                </div>
                <Accordion.Panel className={clsx(styles.Panel, slotProps?.classes?.Panel)}>
                    {children}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion.Root>
    )
}