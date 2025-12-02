import { Circle } from 'lucide-react';
import { ZToast } from '../../../components/ZToast/ZToast';
import styles from './Header.module.scss';
import { MaterialSearch } from './MaterialSearch/MaterialSearch';
import { QuickActions } from './QuickActions/QuickActions';
import { UnitHierarchy } from './UnitHierarchy/UnitHierarchy';

export const Header = () => {
    return (
        <div className={styles.Header}>
            <UnitHierarchy />
            <MaterialSearch />
            <QuickActions />
            <ZToast.Success icon={<Circle />} />
        </div>
    )
}