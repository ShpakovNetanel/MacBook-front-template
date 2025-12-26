import { Rocket, Save } from 'lucide-react';
import { ZChip } from '../../../components/ZChip/ZChip';
import styles from './Header.module.scss';
import { MaterialSearch } from './MaterialSearch/MaterialSearch';
import { QuickActions } from './QuickActions/QuickActions';
import { ReportTypes } from './ReportTypes/ReportTypes';
import { UnitChanger } from './UnitChanger/UnitChanger';
import { UnitHierarchy } from './UnitHierarchy/UnitHierarchy';
import { LaunchButton } from './LaunchButton/LaunchButton';
import { SaveButton } from './SaveButton/SaveButton';

export const Header = () => {

    return (
        <div className={styles.Header}>
            <div className={styles.Right}>
                <UnitHierarchy />
                <UnitChanger />
                <ZChip label='בדיווח' slotProps={{
                    backgroundColor: 'white',
                }} />
            </div>
            <ReportTypes />
            <div className={styles.Left}>
                <LaunchButton />
                <SaveButton />
                <MaterialSearch />
                <QuickActions />
            </div>
        </div>
    )
}