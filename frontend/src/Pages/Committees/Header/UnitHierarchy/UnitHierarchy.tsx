import { useMemo, useState } from 'react';
import { useFetchUnits } from '../../../../api/units';
import { Drawer } from '../../../../components/Drawer/Drawer';
import type { Unit } from '../../../../types/types';
import styles from './UnitHierarchy.module.scss';
import { UnitHierarchyContent } from './UnitHierarchyContent/UnitHierarchyContent';
import { useUnitOverridesStore } from '../../../../zustand/unitOverrides';

export const UnitHierarchy = () => {
    const units = useFetchUnits();
    const [openUnitIds, setOpenUnitIds] = useState<Set<number>>(new Set());
    const [selectedUnitById, setSelectedUnitById] = useState<Record<number, Unit | null>>({});
    const { setVisibility, setStatus, deleteUnit } = useUnitOverridesStore();

    const unitsByParent = useMemo(() => {
        const map = new Map<number | null, Unit[]>();
        units.forEach((unit) => {
            const parentKey = unit.parent?.id ?? null;
            const siblings = map.get(parentKey) ?? [];
            siblings.push(unit);
            map.set(parentKey, siblings);
        });
        return map;
    }, [units]);

    const toggleOpen = (unitId: number) => {
        setOpenUnitIds((prev) => {
            const next = new Set(prev);
            if (next.has(unitId)) {
                next.delete(unitId);
            } else {
                next.add(unitId);
            }
            return next;
        });
    };

    const stubAction = async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
    };

    const toggleVisibility = async (unitId: number, isVisible: boolean) => {
        await stubAction();
        setVisibility(unitId, isVisible ? 'hidden' : 'visible');
    };

    const toggleStatus = async (unitId: number, statusId: number) => {
        await stubAction();
        setStatus(unitId, statusId === 1 ? 0 : 1);
    };

    const handleDelete = async (unitId: number) => {
        await stubAction();
        deleteUnit(unitId);
    };

    return (
        <Drawer
            slotProps={{
                direction: 'right',
                classes: {
                    Trigger: styles.Trigger,
                    Icon: styles.Icon,
                    Drawer: styles.Drawer
                },
                width: '40vw'
            }}>
            <div className={styles.DrawerContent}>
                <UnitHierarchyContent
                    unitsByParent={unitsByParent}
                    openUnitIds={openUnitIds}
                    selectedUnitById={selectedUnitById}
                    units={units}
                    toggleOpen={toggleOpen}
                    toggleVisibility={toggleVisibility}
                    toggleStatus={toggleStatus}
                    onDelete={handleDelete}
                    onSelectUnit={(unitId, unit) => {
                        setSelectedUnitById(() => (unit ? { [unitId]: unit } : {}));
                    }}
                    onActivateUnit={(unitId) => {
                        setSelectedUnitById((prev) => {
                            const currentSelection = prev[unitId] ?? null;
                            return currentSelection ? { [unitId]: currentSelection } : {};
                        });
                    }}
                />
            </div>
        </Drawer>
    );
};
