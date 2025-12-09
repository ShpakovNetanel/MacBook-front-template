import { Combobox, Separator } from "@base-ui-components/react"
import clsx from "clsx"
import { isEmpty, isPlainObject } from 'lodash'
import { Check, X } from "lucide-react"
import { useId, useRef, type ReactNode } from "react"
import type { ClassNames } from "../../types/baseui"
import styles from './ZCombobox.module.scss'
import { isValueLabelPair } from "../../utils/utilities"

export type Primitive = string | number;
export type ValueLabelPair = { value: any; label: string };

type Disable = {
	emptyLabel?: boolean;
	checkIndicator?: boolean;
	clearable?: boolean;
	separator: boolean;
}

type SlotProps = {
	classes?: ClassNames<typeof Combobox, 'Container' | 'ItemIndicatorIcon'>;
	disable?: Disable;
}

type ZComboboxProps<Value, Multiple extends boolean | undefined = false> = {
	items: Value[];
	placeholder: string;
	emptyLabel: string;
	slotProps?: SlotProps;
	itemComponent?: (item: Value) => ReactNode;
	valueNode?: (values: Value[]) => ReactNode;
} & Combobox.Root.Props<Value, Multiple>

export const ZCombobox = <Value, Multiple extends boolean | undefined = false>({
	items,
	placeholder,
	emptyLabel,
	itemComponent,
	slotProps,
	valueNode,
	...props
}: ZComboboxProps<Value, Multiple>) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const id = useId();

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
		<Combobox.Root items={items} {...props}>
			<div className={clsx(styles.Container, slotProps?.classes?.Container)}>
				{props.multiple
					? <Combobox.Chips className={styles.Chips} ref={containerRef}>
						<Combobox.Value>
							{(values: Value[]) =>
								<>
									{valueNode
										?
										valueNode(values)
										: values.map((value) => (
											<Combobox.Chip
												key={getItemValue(value)}
												className={styles.Chip}
											>
												{getItemValue(value)}
												<Combobox.ChipRemove className={styles.ChipRemove} aria-label="Remove">
													<X />
												</Combobox.ChipRemove>
											</Combobox.Chip>
										))}
									<Combobox.Input
										placeholder={isEmpty(values) ? placeholder : ''}
										id={id}
										className={clsx(styles.Input, slotProps?.classes?.Input)} />
								</>
							}
						</Combobox.Value>
					</Combobox.Chips>
					: <Combobox.Input
						placeholder={placeholder}
						id={id}
						className={clsx(styles.Input, slotProps?.classes?.Input)}>
						<div className={styles.ActionButtons}>
							<Combobox.Clear className={styles.Clear} aria-label="Clear selection">
								<X className={styles.ClearIcon} />
							</Combobox.Clear>
						</div>
					</Combobox.Input>}
			</div>

			<Combobox.Portal>
				<Combobox.Positioner
					className={clsx(styles.Positioner, slotProps?.classes?.Positioner)}
					sideOffset={4}
					anchor={containerRef}>
					<Combobox.Popup className={clsx(styles.Popup, slotProps?.classes?.Popup)}>
						{!slotProps?.disable?.emptyLabel &&
							<Combobox.Empty className={clsx(styles.Empty, slotProps?.classes?.Empty)}>
								{emptyLabel}
							</Combobox.Empty>}
						<Combobox.List className={clsx(styles.List, slotProps?.classes?.List)}>
							{(item: Value, index) => (
								<Combobox.Item
									key={index}
									value={item}
									className={clsx(styles.Item, slotProps?.classes?.Item)}>
									{!slotProps?.disable?.checkIndicator &&
										<Combobox.ItemIndicator
											className={clsx(styles.ItemIndicator, slotProps?.classes?.ItemIndicator)}>
											<Check className={clsx(styles.ItemIndicatorIcon, slotProps?.classes?.ItemIndicatorIcon)} />
										</Combobox.ItemIndicator>}
									{itemComponent
										? itemComponent(item)
										: <div className={styles.ItemText}>{getItemLabel(item)}</div>}
									{index < items.length - 1 && <Separator className={styles.Separator} />}
								</Combobox.Item>
							)}
						</Combobox.List>
					</Combobox.Popup>
				</Combobox.Positioner>
			</Combobox.Portal>
		</Combobox.Root>
	)
}