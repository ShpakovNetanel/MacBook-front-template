import { Combobox as BaseCombobox, Separator as BaseSeparator } from "@base-ui-components/react"
import clsx from "clsx"
import { isEmpty, isPlainObject } from 'lodash'
import { Check, ChevronDown, X } from "lucide-react"
import { useId, useRef, type ReactNode } from "react"
import type { ClassNames } from "../../types/baseui"
import { isValueLabelPair } from "../../utils/utilities"
import styles from './Combobox.module.scss'

export type Primitive = string | number;
export type ValueLabelPair = { value: any; label: string };

type Disable = {
	emptyLabel?: boolean;
	checkIndicator?: boolean;
	trigger?: boolean;
	clearable?: boolean;
	separator?: boolean;
}

type SlotProps = {
	classes?: ClassNames<typeof BaseCombobox, 'Checkbox' | 'Container' | 'ItemIndicatorIcon' | 'InputWrapper'
		| 'ActionButtons' | 'StartAdornment' | 'TriggerIcon'>;
	disable?: Disable;
}

type ComboboxProps<Value, Multiple extends boolean | undefined = false> = {
	items: Value[];
	placeholder: string;
	emptyLabel: string;
	slotProps?: SlotProps;
	startAdornment?: ReactNode;
	itemComponent?: (item: Value) => ReactNode;
	valueNode?: (values: Value[] | Value) => ReactNode;
	onAdormentClick?: () => void
	onPaste?: React.ClipboardEventHandler<HTMLElement>
	itemSelectedNoIndicatorClassName?: string;

} & BaseCombobox.Root.Props<Value, Multiple>

export const Combobox = <Value, Multiple extends boolean | undefined = false>({
	items,
	placeholder = '',
	emptyLabel,
	itemComponent,
	startAdornment,
	slotProps,
	valueNode,
	onAdormentClick,
	onPaste,
	itemSelectedNoIndicatorClassName,
	...props
}: ComboboxProps<Value, Multiple>) => {
	const id = useId();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const hasSingleValue = !props.multiple && props.value != null;
	const isIndicatorEnabled = !slotProps?.disable?.checkIndicator;
	
	const focusInput = () => {
		inputRef.current?.focus();
	};

	const getItemValue = (item: Value) => {
		if (isPlainObject(item)) {
			if (isValueLabelPair(item)) {
				return item.value as Primitive
			}

			if (props.itemToStringValue) {
				return props.itemToStringValue(item)
			}

			return JSON.stringify(item)
		}

		return item as Primitive
	}

	const getItemLabel = (item: Value) => {
		if (isPlainObject(item)) {
			if (isValueLabelPair(item)) {
				return item.label as Primitive
			}

			if (props.itemToStringLabel) {
				return props.itemToStringLabel(item)
			}

			return JSON.stringify(item)
		}

		return item as Primitive
	}

	return (
		<BaseCombobox.Root items={items} {...props}>
			<div className={clsx(styles.Container, slotProps?.classes?.Container)}>
				{props.multiple
					?
					<BaseCombobox.Chips
						className={clsx(styles.Chips, slotProps?.classes?.Chips)}
						ref={containerRef}
						onClick={focusInput}
						onPasteCapture={onPaste}>
						{startAdornment && <button className={clsx(styles.StartAdornment, slotProps?.classes?.StartAdornment)} onClick={onAdormentClick}>
							{startAdornment}
						</button>}
						<BaseCombobox.Value>
							{(values: Value[]) =>
								<>
									{valueNode
										? valueNode(values)
										: values.map((value) => (
											<BaseCombobox.Chip
												key={getItemValue(value)}
												className={styles.Chip}
											>
												{getItemValue(value)}
												<BaseCombobox.ChipRemove className={styles.ChipRemove} aria-label="Remove">
													<X />
												</BaseCombobox.ChipRemove>
											</BaseCombobox.Chip>
										))}

									<BaseCombobox.Input
										ref={inputRef}
										placeholder={isEmpty(values) ? placeholder : ''}
										id={id}
										className={clsx(styles.Input, slotProps?.classes?.Input)} />
								</>
							}
						</BaseCombobox.Value>
						{!slotProps?.disable?.trigger && <BaseCombobox.Trigger className={clsx(styles.Trigger, slotProps?.classes?.Trigger)}>
							<ChevronDown className={clsx(styles.TriggerIcon, slotProps?.classes?.TriggerIcon)} />
						</BaseCombobox.Trigger>}
					</BaseCombobox.Chips>
					:
					<div
						className={clsx(styles.InputWrapper, slotProps?.classes?.InputWrapper)}
						onClick={focusInput}
						onPasteCapture={onPaste}>
						<BaseCombobox.Input
							ref={inputRef}
							placeholder={placeholder}
							id={id}
							className={clsx(styles.Input, slotProps?.classes?.Input)} />
						<div className={clsx(styles.ActionButtons, slotProps?.classes?.ActionButtons)}>
							{startAdornment && <button className={clsx(styles.StartAdornment, slotProps?.classes?.StartAdornment)} onClick={onAdormentClick}>
								{startAdornment}
							</button>}
							{!slotProps?.disable?.trigger && <BaseCombobox.Trigger
								className={clsx(styles.Trigger, slotProps?.classes?.Trigger)}
								data-selected={hasSingleValue}
								aria-label="Open popup">
								<ChevronDown className={clsx(styles.TriggerIcon, slotProps?.classes?.TriggerIcon)} />
							</BaseCombobox.Trigger>}
						</div>
					</div>
				}
			</div>
			<BaseCombobox.Portal>
				<BaseCombobox.Positioner
					className={clsx(styles.Positioner, slotProps?.classes?.Positioner)}
					sideOffset={4}
					anchor={containerRef}>
					<BaseCombobox.Popup className={clsx(styles.Popup, slotProps?.classes?.Popup)}>
						{!slotProps?.disable?.emptyLabel &&
							<BaseCombobox.Empty className={clsx(styles.Empty, slotProps?.classes?.Empty)}>
								{emptyLabel}
							</BaseCombobox.Empty>}
						<BaseCombobox.List className={clsx(styles.List, slotProps?.classes?.List)}>
							{(item: Value, index) => (
								<BaseCombobox.Item
									key={index}
									value={item}
									data-has-indicator={isIndicatorEnabled}
									className={clsx(
										styles.Item,
										slotProps?.classes?.Item,
										!isIndicatorEnabled && styles.ItemNoIndicator,
										!isIndicatorEnabled && itemSelectedNoIndicatorClassName
									)}>
									{isIndicatorEnabled &&
										<BaseCombobox.ItemIndicator
											className={clsx(styles.ItemIndicator, slotProps?.classes?.ItemIndicator)}>
											<Check className={clsx(styles.ItemIndicatorIcon, slotProps?.classes?.ItemIndicatorIcon)} />
										</BaseCombobox.ItemIndicator>}
									{itemComponent
										? <div className={styles.ItemText}>{itemComponent(item)}</div>
										: <div className={styles.ItemText}>{getItemLabel(item)}</div>}
									{index < items.length - 1 && !slotProps?.disable?.separator && <BaseSeparator orientation="horizontal" className={styles.Separator} />}
								</BaseCombobox.Item>
							)}
						</BaseCombobox.List>
					</BaseCombobox.Popup>
				</BaseCombobox.Positioner>
			</BaseCombobox.Portal>
		</BaseCombobox.Root >
	)
}
