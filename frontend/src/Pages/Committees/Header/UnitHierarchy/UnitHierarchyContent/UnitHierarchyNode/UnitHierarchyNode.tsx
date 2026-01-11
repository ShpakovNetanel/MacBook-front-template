import type { Unit } from '../../../../../../types/types';
import type React from 'react';
import { UnitHierarchyRow } from './UnitHierarchyRow/UnitHierarchyRow';
import styles from './UnitHierarchyNode.module.scss';
import type { Actions } from '../UnitHierarchyContent';

type UnitHierarchyNodeProps = {
    unit: Unit;
    depth: number;
    units: Unit[];
    parentUnit: Unit;
    unitsByParent: Map<number | null, Unit[]>;
    openUnitIds: Set<number>;
    selectedUnitById: Record<number, Unit | null>;
    toggleOpen: (unitId: number) => void;
    toggleVisibility: (unitId: number, isVisible: boolean) => void;
    toggleStatus: (unitId: number, statusId: number) => void;
    onDelete: (unitId: number) => void;
    onSelectUnit: (unitId: number, unit: Unit | null) => void;
    pendingAction: { unitId: number; type: Actions; } | null;
    setPendingAction: React.Dispatch<React.SetStateAction<{ unitId: number; type: Actions; } | null>>;
};

export const UnitHierarchyNode = ({
    unit,
    depth,
    units,
    parentUnit,
    unitsByParent,
    openUnitIds,
    selectedUnitById,
    toggleOpen,
    toggleVisibility,
    toggleStatus,
    onDelete,
    onSelectUnit,
    pendingAction,
    setPendingAction
}: UnitHierarchyNodeProps) => {
    const children = unitsByParent.get(unit.id) ?? [];
    const isOpen = openUnitIds.has(unit.id);

    return (
        <div className={styles.UnitBlock}>
            <UnitHierarchyRow
                unit={unit}
                depth={depth}
                isOpen={isOpen}
                isVisible={unit.status.visibility === 'visible'}
                statusId={unit.status.id}
                units={units}
                parentUnit={parentUnit}
                selectedUnit={selectedUnitById[unit.id] ?? null}
                onToggleOpen={() => toggleOpen(unit.id)}
                onToggleVisibility={() => toggleVisibility(unit.id, unit.status.visibility === 'visible')}
                onToggleStatus={() => toggleStatus(unit.id, unit.status.id)}
                onDelete={() => onDelete(unit.id)}
                onSelectUnit={(nextUnit) => onSelectUnit(unit.id, nextUnit)}
                pendingAction={pendingAction}
                setPendingAction={setPendingAction}
            />
            {isOpen && children.length > 0 && (
                <div className={styles.Children}>
                    {children.map((child) => (
                        <UnitHierarchyNode
                            key={child.id}
                            unit={child}
                            parentUnit={unit}
                            depth={depth + 1}
                            units={units}
                            unitsByParent={unitsByParent}
                            openUnitIds={openUnitIds}
                            selectedUnitById={selectedUnitById}
                            toggleOpen={toggleOpen}
                            toggleVisibility={toggleVisibility}
                            toggleStatus={toggleStatus}
                            onDelete={onDelete}
                            onSelectUnit={onSelectUnit}
                            pendingAction={pendingAction}
                            setPendingAction={setPendingAction}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
