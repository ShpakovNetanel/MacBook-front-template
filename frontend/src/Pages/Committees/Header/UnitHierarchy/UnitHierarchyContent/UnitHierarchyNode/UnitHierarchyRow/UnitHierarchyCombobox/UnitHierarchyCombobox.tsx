import { Combobox as BaseCombobox } from '@base-ui-components/react';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { AlertTriangle, Plus, X, XCircle } from 'lucide-react';
import { useMemo, useRef, useState, type CSSProperties } from 'react';
import type { Unit } from '../../../../../../../../types/types';
import styles from './UnitHierarchyCombobox.module.scss';
import { UNIT_STATUSES } from '../../../../../../../../utils/MainConstants/UnitStatuses';

type UnitHierarchyComboboxProps = {
    items: Unit[];
    value: Unit | null;
    statusId: number;
    actionLabel: string;
    onValueChange: (unit: Unit | null) => void;
    depth: number;
    onActivate?: () => void;
};

export const UnitHierarchyCombobox = ({
    items,
    value,
    statusId,
    actionLabel,
    onValueChange,
    depth,
    onActivate
}: UnitHierarchyComboboxProps) => {
    const hasSelection = Boolean(value);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(() => value?.description ?? '');
    const fieldRef = useRef<HTMLDivElement | null>(null);

    const statusLabel = value?.parent
        ? statusId === UNIT_STATUSES.WAITING_FOR_ALLOCATION.id
            ? `נעולה ב${value?.parent?.description}`
            : `נמצאת ב${value?.parent?.description}`
        : '';

    const filteredItems = useMemo(() => {
        if (!query.trim()) {
            return items;
        }
        const lowered = query.trim().toLowerCase();
        return items.filter((item) => item.description.toLowerCase().includes(lowered));
    }, [items, query]);

    const handleSelect = (unit: Unit | null) => {
        if (unit) {
            setQuery(unit.description);
        }
        onValueChange(unit);
        setOpen(false);
    };

    const handleInputChange = (nextValue: string) => {
        setQuery(nextValue);
        setOpen(true);
        if (!nextValue.trim()) {
            onValueChange(null);
        }
    };

    const handleClear = () => {
        setQuery('');
        onValueChange(null);
        setOpen(false);
    };

    const rootKey = value?.id ?? 'empty';

    return (
        <div className={styles.Row} style={{
            ['--row-depth' as string]: depth
        } as CSSProperties}>
            <BaseCombobox.Root
                key={rootKey}
                items={filteredItems}
                value={value ?? null}
                open={open}
                onOpenChange={setOpen}
                onValueChange={(nextValue) => handleSelect((nextValue as Unit) ?? null)}>
                <div className={styles.Field} ref={fieldRef}>
                    <button
                        data-hide={!isEmpty(value)}
                        type="button"
                        className={styles.ClearButton}
                        onClick={handleClear}>
                        <X className={styles.ClearIcon} />
                    </button>
                    <BaseCombobox.Input
                        className={styles.Input}
                        placeholder="בחר יחידה"
                        style={{
                            ['--row-depth' as string]: depth
                        } as CSSProperties}
                        value={query}
                        onFocus={() => {
                            onActivate?.();
                            setOpen(true);
                        }}
                        onChange={(event) => handleInputChange(event.target.value)}
                    />
                    {hasSelection && !isEmpty(statusLabel) && (
                        <div
                            className={clsx(
                                styles.StatusInline,
                                statusId === 1 ? styles.StatusLocked : styles.StatusActive
                            )}>
                            {statusId === 1
                                ? <XCircle className={styles.StatusIcon} />
                                : <AlertTriangle className={styles.StatusIcon} />}
                            <span className={styles.StatusText}>{statusLabel}</span>
                        </div>
                    )}
                    <button type="button" className={styles.PlusButton} aria-label="Add">
                        <Plus className={styles.PlusIcon} />
                    </button>
                </div>
                <BaseCombobox.Portal>
                    <BaseCombobox.Positioner
                        className={styles.Positioner}
                        anchor={fieldRef}
                        sideOffset={6}>
                        <BaseCombobox.Popup className={styles.Popup}>
                            {filteredItems.length === 0 ? (
                                <BaseCombobox.Empty className={styles.Empty}>
                                    אין יחידות להצגה
                                </BaseCombobox.Empty>
                            ) : (
                                <BaseCombobox.List className={styles.List}>
                                    {(item: Unit) => (
                                        <BaseCombobox.Item
                                            key={item.id}
                                            value={item}
                                            className={styles.Item}>
                                            {item.description}
                                        </BaseCombobox.Item>
                                    )}
                                </BaseCombobox.List>
                            )}
                        </BaseCombobox.Popup>
                    </BaseCombobox.Positioner>
                </BaseCombobox.Portal>
            </BaseCombobox.Root>
            <button
                type="button"
                data-visible={hasSelection}
                className={styles.ActionButton}>
                {actionLabel}
            </button>
        </div>
    );
};
