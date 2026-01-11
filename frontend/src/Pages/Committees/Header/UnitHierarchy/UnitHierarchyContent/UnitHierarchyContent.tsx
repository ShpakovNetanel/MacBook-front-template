import { useState } from 'react';
import type { Unit } from '../../../../../types/types';
import { useUnitStore } from '../../../../../zustand/userUnit';
import styles from './UnitHierarchyContent.module.scss';
import { UnitHierarchyNode } from './UnitHierarchyNode/UnitHierarchyNode';

type UnitHierarchyContentProps = {
    unitsByParent: Map<number | null, Unit[]>;
    openUnitIds: Set<number>;
    selectedUnitById: Record<number, Unit | null>;
    units: Unit[];
    toggleOpen: (unitId: number) => void;
    toggleVisibility: (unitId: number, isVisible: boolean) => void;
    toggleStatus: (unitId: number, statusId: number) => void;
    onDelete: (unitId: number) => void;
    onSelectUnit: (unitId: number, unit: Unit | null) => void;
};

export type Actions = 'delete' | 'visibility' | 'status'

type PendingAction = {
    unitId: number;
    type: Actions;
} | null;

export const UnitHierarchyContent = ({
    unitsByParent,
    openUnitIds,
    selectedUnitById,
    units,
    toggleOpen,
    toggleVisibility,
    toggleStatus,
    onDelete,
    onSelectUnit
}: UnitHierarchyContentProps) => {
    const [pendingAction, setPendingAction] = useState<PendingAction>(null);
    const screenUnit = useUnitStore(s => s.screenUnit);

    const rootUnits = unitsByParent.get(screenUnit.id) ?? [];

    return (
        <div className={styles.Content}>
            <div className={styles.Title}>עץ ציוות</div>
            <div className={styles.List}>
                {rootUnits.map((unit) => (
                    <UnitHierarchyNode
                        key={unit.id}
                        unit={unit}
                        depth={0}
                        units={units}
                        parentUnit={screenUnit}
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
        </div>
    );
};
