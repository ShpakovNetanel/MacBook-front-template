import { NumberField, type NumberFieldRootChangeEventDetails } from "@base-ui-components/react";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { useId } from "react";
import type { ClassNames } from "../../types/baseui";
import styles from './ZNumberField.module.scss';

type SlotProps = {
    classes?: ClassNames<typeof NumberField, 'Label' | 'Icon'>;
}

type ZNumberFieldProps = {
    slotProps?: SlotProps;
    onValueChange?: (value: number | null, eventDetails: NumberFieldRootChangeEventDetails) => void;
    value?: number;
    label?: string;
} & NumberField.Root.Props

export const ZNumberField = ({ onValueChange, value, slotProps, label, ...props }: ZNumberFieldProps) => {
    const id = useId();

    return (
        <NumberField.Root {...props} id={id} value={value} onValueChange={onValueChange} className={clsx(styles.Field, slotProps?.classes?.Root)}>
            <NumberField.ScrubArea className={clsx(styles.ScrubArea, slotProps?.classes?.ScrubArea)}>
                <label htmlFor={id} className={clsx(styles.Label, slotProps?.classes?.Label)}>
                    {label}
                </label>
            </NumberField.ScrubArea>
            <NumberField.Group className={clsx(styles.Group, slotProps?.classes?.Group)}>
                <NumberField.Increment className={clsx(styles.Increment, slotProps?.classes?.Increment)}>
                    <Plus className={clsx(slotProps?.classes?.Icon)}/>
                </NumberField.Increment>
                <NumberField.Input className={clsx(styles.Input, slotProps?.classes?.Input)} />
                <NumberField.Decrement className={clsx(styles.Decrement, slotProps?.classes?.Decrement)}>
                    <Minus className={clsx(slotProps?.classes?.Icon)}/>
                </NumberField.Decrement>
            </NumberField.Group>
        </NumberField.Root>
    );
}