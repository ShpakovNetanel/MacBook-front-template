import { Field as BaseField } from "@base-ui-components/react"
import styles from './Typegraphy.module.scss'
import type { PropsWithChildren } from "react"
import clsx from "clsx";

type Classes = {
    Field?: keyof typeof styles;
    Label?: keyof typeof styles;
}

type SlotProps = {
    classes?: Classes;
}

type TypographyProps = PropsWithChildren & {
    slotProps?: SlotProps;
} & BaseField.Label.Props

export const Typhography = ({ children, slotProps, ...props }: TypographyProps) => {
    return (
        <BaseField.Root className={clsx(styles.Field, slotProps?.classes?.Field)}>
            <BaseField.Label {...props} className={clsx(styles.Label, slotProps?.classes?.Label)}>{children}</BaseField.Label>
        </BaseField.Root>
    )
}
