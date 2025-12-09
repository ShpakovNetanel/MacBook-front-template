import { Circle } from 'lucide-react';
import { ZToast } from '../../../components/ZToast/ZToast';
import styles from './Header.module.scss';
import { MaterialSearch } from './MaterialSearch/MaterialSearch';
import { QuickActions } from './QuickActions/QuickActions';
import { UnitHierarchy } from './UnitHierarchy/UnitHierarchy';
import { ReportTypes } from './ReportTypes/ReportTypes';

export const Header = () => {
    return (
        <div className={styles.Header}>
            <UnitHierarchy />
            <ReportTypes />
            <MaterialSearch />
            <QuickActions />
            <ZToast.Success icon={<Circle />} />
        </div>
    )
}