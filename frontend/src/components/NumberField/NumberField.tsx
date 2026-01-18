import { NumberField as BaseNumberField, type NumberFieldRootChangeEventDetails as BaseNumberFieldRootChangeEventDetails } from "@base-ui-components/react";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { useId } from "react";
import type { ClassNames } from "../../types/baseui";
import styles from './NumberField.module.scss';

type SlotProps = {
    classes?: ClassNames<typeof BaseNumberField, 'Label' | 'Icon'>;
}

type NumberFieldProps = {
    slotProps?: SlotProps;
    onValueChange?: (value: number | null, eventDetails: BaseNumberFieldRootChangeEventDetails) => void;
    value?: number;
    label?: string;
} & BaseNumberField.Root.Props

export const NumberField = ({ onValueChange, value, slotProps, label, ...props }: NumberFieldProps) => {
    const id = useId();

    return (
        <BaseNumberField.Root {...props} id={id} value={value} onValueChange={onValueChange} className={clsx(styles.Field, slotProps?.classes?.Root)}>
            <BaseNumberField.ScrubArea className={clsx(styles.ScrubArea, slotProps?.classes?.ScrubArea)}>
                <label htmlFor={id} className={clsx(styles.Label, slotProps?.classes?.Label)}>
                    {label}
                </label>
            </BaseNumberField.ScrubArea>
            <BaseNumberField.Group className={clsx(styles.Group, slotProps?.classes?.Group)}>
                {!props.disabled && <BaseNumberField.Increment className={clsx(styles.Increment, slotProps?.classes?.Increment)}>
                    <Plus className={clsx(slotProps?.classes?.Icon)}/>
                </BaseNumberField.Increment>}
                <BaseNumberField.Input disabled={props.disabled} className={clsx(styles.Input, slotProps?.classes?.Input)} />
                {!props.disabled && <BaseNumberField.Decrement className={clsx(styles.Decrement, slotProps?.classes?.Decrement)}>
                    <Minus className={clsx(slotProps?.classes?.Icon)}/>
                </BaseNumberField.Decrement>}
            </BaseNumberField.Group>
        </BaseNumberField.Root>
    );
}
