import type React from 'react';
import { type CSSProperties } from 'react';
import clsx from 'clsx';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { ZCombobox } from '../../../../../../../components/ZCombobox/ZCombobox';
import { ZTooltip } from '../../../../../../../components/ZTooltip/ZTooltip';
import { ZTyphography } from '../../../../../../../components/ZTypography/ZTypography';
import type { Unit } from '../../../../../../../types/types';
import styles from './UnitHierarchyRow.module.scss';
import { useUnitStore } from '../../../../../../../zustand/userUnit';
import { UnitHierarchyActions } from './UnitHierarchyActions/UnitHierarchyActions';
import type { Actions } from '../../UnitHierarchyContent';


type UnitHierarchyRowProps = {
    unit: Unit;
    depth: number;
    isOpen: boolean;
    isVisible: boolean;
    statusId: number;
    units: Unit[];
    parentUnit: Unit;
    selectedUnit: Unit | null;
    onToggleOpen: () => void;
    onToggleVisibility: () => void;
    onToggleStatus: () => void;
    onDelete: () => void;
    onSelectUnit: (unit: Unit | null) => void;
    pendingAction: { unitId: number; type: Actions; } | null;
    setPendingAction: React.Dispatch<React.SetStateAction<{ unitId: number; type: Actions; } | null>>;
};

export const UnitHierarchyRow = ({
    unit,
    depth,
    isOpen,
    isVisible,
    statusId,
    units,
    parentUnit,
    selectedUnit,
    onToggleOpen,
    onToggleVisibility,
    onToggleStatus,
    onDelete,
    onSelectUnit,
    pendingAction,
    setPendingAction
}: UnitHierarchyRowProps) => {
    const screenUnit = useUnitStore(s => s.screenUnit);
    const hasConfirm = pendingAction?.unitId === unit.id;
    const confirmLabel = pendingAction?.type === 'visibility'
        ? (isVisible ? 'להסתיר?' : 'להציג?')
        : pendingAction?.type === 'status'
            ? (statusId === 1 ? 'לנעול?' : 'לפתוח?')
            : pendingAction?.type === 'delete'
                ? 'מחיקה'
                : '';

    const confirmAction = () => {
        if (pendingAction?.unitId === unit.id && pendingAction.type === 'visibility') {
            onToggleVisibility();
        }
        if (pendingAction?.unitId === unit.id && pendingAction.type === 'status') {
            onToggleStatus();
        }
        if (pendingAction?.unitId === unit.id && pendingAction.type === 'delete') {
            onDelete();
        }
        setPendingAction(null);
    };

    const requestAction = (type: Actions) => {
        setPendingAction((prev) => {
            if (prev?.unitId === unit.id && prev.type === type) {
                return null;
            }
            return { unitId: unit.id, type };
        });
    };
    const tooltipSlotProps = { classes: { Popup: styles.TooltipPopup } };

    return (
        <>
            <div
                className={styles.Row}
                data-confirm={hasConfirm}
                data-subrow={depth > 0}
                style={{ ['--row-depth' as string]: depth } as CSSProperties}>
                <div className={styles.RightGroup}>
                    <div className={styles.RowContent}>
                        {unit.level !== 4 && <ZTooltip title={isOpen ? 'צמצם יחידה' : 'הרחב יחידה'} slotProps={tooltipSlotProps}>
                            <button
                                type="button"
                                className={styles.ExpandButton}
                                onClick={onToggleOpen}>
                                {isOpen ? <ChevronDown /> : <ChevronRight />}
                            </button>
                        </ZTooltip>}
                        <ZTyphography slotProps={{
                            classes: {
                                Label: styles.UnitLabel
                            }
                        }}>{unit.description}</ZTyphography>
                    </div>
                </div>
                <div className={styles.LeftGroup}>

                    <UnitHierarchyActions
                        isVisible={isVisible}
                        statusId={statusId}
                        parentUnit={parentUnit}
                        showVisibility={unit.parentId === screenUnit.id}
                        onRequestVisibility={() => requestAction('visibility')}
                        onRequestStatus={() => requestAction('status')}
                        onRequestDelete={() => requestAction('delete')}
                    />
                <button
                    type="button"
                    data-visible={hasConfirm}
                    className={clsx(
                        styles.ConfirmButton,
                        pendingAction?.type === 'delete' && styles.ConfirmDelete,
                        pendingAction?.type === 'visibility' && styles.ConfirmDelete,
                        pendingAction?.type === 'status' && statusId === 1 && styles.ConfirmLock,
                        pendingAction?.type === 'status' && statusId !== 1 && styles.ConfirmOpen
                    )}
                    onClick={hasConfirm ? confirmAction : undefined}>
                    {confirmLabel}
                </button>
                </div>
            </div>
            {isOpen && (
                <div className={styles.ComboRow}>
                    <ZCombobox
                        items={units}
                        value={selectedUnit ?? undefined}
                        onValueChange={(value) => onSelectUnit((value as Unit) ?? null)}
                        isItemEqualToValue={(item, selected) => selected ? item.id === selected.id : false}
                        itemToStringLabel={(item) => item.description}
                        itemToStringValue={(item) => item.id.toString()}
                        startAdornment={<Plus className={styles.Plus} />}
                        placeholder="בחר יחידה"
                        emptyLabel="אין יחידות להצגה"
                        slotProps={{
                            classes: {
                                Container: styles.ComboContainer,
                                Trigger: styles.ComboTrigger,
                                Input: styles.ComboInput
                            }
                        }}
                    />
                </div>
            )}
        </>
    );
};
