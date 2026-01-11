import { Eye, EyeOff, KeyRound, Lock, Trash2 } from 'lucide-react';
import { ZTooltip } from '../../../../../../../../components/ZTooltip/ZTooltip';
import type { Unit } from '../../../../../../../../types/types';
import styles from './UnitHierarchyActions.module.scss';

type UnitHierarchyActionsProps = {
    isVisible: boolean;
    statusId: number;
    parentUnit: Unit;
    showVisibility: boolean;
    onRequestVisibility: () => void;
    onRequestStatus: () => void;
    onRequestDelete: () => void;
};

export const UnitHierarchyActions = ({
    isVisible,
    statusId,
    showVisibility,
    parentUnit,
    onRequestVisibility,
    onRequestStatus,
    onRequestDelete
}: UnitHierarchyActionsProps) => {
    const tooltipSlotProps = { classes: { Popup: styles.TooltipPopup } };

    return (
        <div className={styles.Actions} data-actions>
            {showVisibility && (
                <ZTooltip title={isVisible ? 'הסתר יחידה' : 'הצג יחידה'} slotProps={tooltipSlotProps}>
                    <button
                        type="button"
                        className={styles.IconButton}
                        onClick={onRequestVisibility}>
                        {isVisible ? <Eye /> : <EyeOff />}
                    </button>
                </ZTooltip>
            )}
            {parentUnit.status.id === 0 &&
                <>
                    <ZTooltip title={statusId === 1 ? 'פתח יחידה' : 'נעל יחידה'} slotProps={tooltipSlotProps}>
                        <button
                            type="button"
                            className={styles.IconButton}
                            onClick={onRequestStatus}>
                            {statusId === 1 ? <KeyRound /> : <Lock />}
                        </button>
                    </ZTooltip>
                    <ZTooltip title='מחק קשר'>
                        <button type="button"
                            className={styles.IconButton}
                            onClick={onRequestDelete}>
                            <Trash2 />
                        </button>
                    </ZTooltip>
                </>
            }
        </div>
    );
};
