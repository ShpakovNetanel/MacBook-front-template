import { Eye, EyeOff, KeyRound, Lock, Trash2 } from 'lucide-react';
import { Tooltip } from '../../../../../../../../components/Tooltip/Tooltip';
import type { Unit } from '../../../../../../../../types/types';
import styles from './UnitHierarchyActions.module.scss';
import { useUnitStore } from '../../../../../../../../zustand/userUnit';
import { UNIT_STATUSES } from '../../../../../../../../utils/MainConstants/UnitStatuses';

type UnitHierarchyActionsProps = {
    isVisible: boolean;
    statusId: number;
    unit: Unit;
    onToggleVisibility: () => void;
    onRequestStatus: () => void;
    onRequestDelete: () => void;
};

export const UnitHierarchyActions = ({
    isVisible,
    statusId,
    unit,
    onToggleVisibility,
    onRequestStatus,
    onRequestDelete
}: UnitHierarchyActionsProps) => {
    const screenUnit = useUnitStore(s => s.screenUnit);
    const tooltipSlotProps = { classes: { Popup: styles.TooltipPopup } };

    const showVisibility = unit.status.id === UNIT_STATUSES.WAITING_FOR_ALLOCATION.id &&
        unit.parent?.id === screenUnit.id

    return (
        <div className={styles.Actions} data-actions>
            {showVisibility && (
                <Tooltip title={isVisible ? 'הסתר יחידה' : 'הצג יחידה'} slotProps={tooltipSlotProps}>
                    <div
                        className={styles.IconButton}
                        onClick={onToggleVisibility}>
                        {isVisible ? <Eye /> : <EyeOff />}
                    </div>
                </Tooltip>
            )}
            {unit.parent?.status?.id === 0 &&
                <>
                    <Tooltip title={statusId === 1 ? 'פתח יחידה' : 'נעל יחידה'} slotProps={tooltipSlotProps}>
                        <div
                            className={styles.IconButton}
                            onClick={onRequestStatus}>
                            {statusId === 1 ? <KeyRound /> : <Lock />}
                        </div>
                    </Tooltip>
                    <Tooltip title='מחק קשר'>
                        <div className={styles.IconButton}
                            onClick={onRequestDelete}>
                            <Trash2 />
                        </div>
                    </Tooltip>
                </>
            }
        </div>
    );
};
