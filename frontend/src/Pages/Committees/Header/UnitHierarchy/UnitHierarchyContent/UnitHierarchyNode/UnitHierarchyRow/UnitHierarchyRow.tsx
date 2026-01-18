import clsx from 'clsx';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import type React from 'react';
import { type CSSProperties } from 'react';
import { Tooltip } from '../../../../../../../components/Tooltip/Tooltip';
import { Typhography } from '../../../../../../../components/Typography/Typography';
import type { Unit } from '../../../../../../../types/types';
import type { Actions } from '../../UnitHierarchyContent';
import { UnitHierarchyActions } from './UnitHierarchyActions/UnitHierarchyActions';
import { UnitHierarchyCombobox } from './UnitHierarchyCombobox/UnitHierarchyCombobox';
import styles from './UnitHierarchyRow.module.scss';


type UnitHierarchyRowProps = {
    unit: Unit;
    depth: number;
    isOpen: boolean;
    isVisible: boolean;
    statusId: number;
    units: Unit[];
    selectedUnit: Unit | null;
    onToggleOpen: () => void;
    onToggleVisibility: () => void;
    onToggleStatus: () => void;
    onDelete: () => void;
    onSelectUnit: (unit: Unit | null) => void;
    onActivateCombobox: () => void;
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
    selectedUnit,
    onToggleOpen,
    onToggleVisibility,
    onToggleStatus,
    onDelete,
    onSelectUnit,
    onActivateCombobox,
    pendingAction,
    setPendingAction
}: UnitHierarchyRowProps) => {
    const hasConfirm = pendingAction?.unitId === unit.id;
    const confirmLabel = pendingAction?.type === 'status'
        ? (statusId === 0 ? 'לנעול?' : 'לפתוח?')
        : pendingAction?.type === 'delete'
            ? 'למחוק?'
            : '';

    const confirmAction = () => {
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

    const comboboxUnits = units.filter((dbUnit) => dbUnit.level > unit.level &&
        dbUnit?.parent?.id !== unit.id);
    const comboActionLabel = selectedUnit?.parent == null ? 'הוספה' : 'העבר';

    return (
        <>
            <div
                className={styles.Row}
                data-confirm={hasConfirm}
                data-subrow={depth > 0}
                style={{ ['--row-depth' as string]: depth } as CSSProperties}>
                <div className={styles.RightGroup}>
                    <div className={styles.RowContent}>
                        {unit.level !== 4 && <Tooltip
                            title={isOpen ? 'צמצם יחידה' : 'הרחב יחידה'}
                            slotProps={tooltipSlotProps}>
                            <div
                                className={styles.ExpandButton}
                                onClick={onToggleOpen}>
                                {isOpen ? <ChevronDown /> : <ChevronLeft />}
                            </div>
                        </Tooltip>}
                        <Typhography slotProps={{
                            classes: {
                                Label: styles.UnitLabel
                            }
                        }}>{unit.description}</Typhography>
                    </div>
                </div>
                <div className={styles.LeftGroup}>
                    <UnitHierarchyActions
                        isVisible={isVisible}
                        statusId={statusId}
                        unit={unit}
                        onToggleVisibility={() => onToggleVisibility()}
                        onRequestStatus={() => requestAction('status')}
                        onRequestDelete={() => requestAction('delete')}
                    />
                    <button
                        type="button"
                        data-visible={hasConfirm}
                        className={clsx(
                            styles.ConfirmButton,
                            pendingAction?.type === 'delete' && styles.ConfirmDelete,
                            pendingAction?.type === 'status' && statusId === 1 && styles.ConfirmLock,
                            pendingAction?.type === 'status' && statusId !== 1 && styles.ConfirmOpen
                        )}
                        onClick={hasConfirm ? confirmAction : undefined}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
            {isOpen && (
                <UnitHierarchyCombobox
                    items={comboboxUnits}
                    value={selectedUnit ?? null}
                    statusId={statusId}
                    actionLabel={comboActionLabel}
                    onValueChange={onSelectUnit}
                    onActivate={onActivateCombobox}
                    depth={depth}
                />
            )}
        </>
    );
};
