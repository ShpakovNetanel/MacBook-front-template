import { Accordion } from "@base-ui-components/react";
import clsx from "clsx";
import { useState, type PropsWithChildren, type ReactNode } from "react";
import type { ClassNames } from "../../types/baseui";
import styles from './ZAccordion.module.scss';

type SlotProps = {
    classes?: ClassNames<typeof Accordion>;
}

type ZAccordionProps = {
    slotProps?: SlotProps;
    title?: ReactNode;
    actions?: ReactNode;
} & PropsWithChildren;

export const ZAccordion = ({ title, actions, children, slotProps, ...props }: ZAccordionProps) => {
    const [openState, setOpenState] = useState('a');

    const onOpenChange = (open: boolean) => {
        setOpenState(!open ? 'b' : 'a')
    }

    return (
        <Accordion.Root value={['a']} className={clsx(styles.Accordion, slotProps?.classes?.Root)} {...props}>
            <Accordion.Item onOpenChange={(open) => onOpenChange(open)} value={openState} className={clsx(styles.Item, slotProps?.classes?.Item)}>
                <div className={clsx(styles.Header, slotProps?.classes?.Header)}>
                    <Accordion.Trigger className={clsx(styles.Trigger, slotProps?.classes?.Trigger)}>
                        {title}
                    </Accordion.Trigger>
                    {actions}
                </div>
                <Accordion.Panel className={clsx(styles.Panel, slotProps?.classes?.Panel)}>
                    {children}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion.Root>
    )
}