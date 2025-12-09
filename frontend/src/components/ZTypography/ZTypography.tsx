import { Field } from "@base-ui-components/react"
import styles from './ZTypegraphy.module.scss'
import type { PropsWithChildren } from "react"
import clsx from "clsx";

type Classes = {
    Field?: keyof typeof styles;
    Label?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
}

type ZTypographyProps = PropsWithChildren & {
    slotProps?: SlotProps;
} & Field.Label.Props

export const ZTyphography = ({ children, slotProps, ...props }: ZTypographyProps) => {
    return (
        <Field.Root className={clsx(styles.Field, slotProps?.classes?.Field)}>
            <Field.Label {...props} className={clsx(styles.Label, slotProps?.classes?.Label)}>{children}</Field.Label>
        </Field.Root>
    )
}