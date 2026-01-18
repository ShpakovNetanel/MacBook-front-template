import { Accordion as BaseAccordion } from "@base-ui-components/react";
import clsx from "clsx";
import { useState, type PropsWithChildren, type ReactNode } from "react";
import type { ClassNames } from "../../types/baseui";
import styles from './Accordion.module.scss';

type SlotProps = {
    classes?: ClassNames<typeof BaseAccordion>;
}

type AccordionProps = {
    slotProps?: SlotProps;
    title?: ReactNode;
    actions?: ReactNode;
} & PropsWithChildren;

export const Accordion = ({ title, actions, children, slotProps, ...props }: AccordionProps) => {
    const [openState, setOpenState] = useState('a');

    const onOpenChange = (open: boolean) => {
        setOpenState(!open ? 'b' : 'a')
    }

    return (
        <BaseAccordion.Root value={['a']} className={clsx(styles.Accordion, slotProps?.classes?.Root)} {...props}>
            <BaseAccordion.Item onOpenChange={(open) => onOpenChange(open)} value={openState} className={clsx(styles.Item, slotProps?.classes?.Item)}>
                <div className={clsx(styles.Header, slotProps?.classes?.Header)}>
                    <BaseAccordion.Trigger className={clsx(styles.Trigger, slotProps?.classes?.Trigger)}>
                        {title}
                    </BaseAccordion.Trigger>
                    {actions}
                </div>
                <BaseAccordion.Panel className={clsx(styles.Panel, slotProps?.classes?.Panel)}>
                    {children}
                </BaseAccordion.Panel>
            </BaseAccordion.Item>
        </BaseAccordion.Root>
    )
}
