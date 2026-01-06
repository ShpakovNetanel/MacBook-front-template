import { Separator } from '@base-ui-components/react';
import { useState } from 'react';
import { ZDatePicker } from '../../../components/ZDatePicker/ZDatePicker';
import styles from './Header.module.scss';
import { LaunchButton } from './LaunchButton/LaunchButton';
import { QuickActions } from './QuickActions/QuickActions';
import { ReportTypes } from './ReportTypes/ReportTypes';
import { SaveButton } from './SaveButton/SaveButton';
import { UnitChanger } from './UnitChanger/UnitChanger';
import { UnitHierarchy } from './UnitHierarchy/UnitHierarchy';

export const Header = () => {
    const [screenDate, setScreenDate] = useState<Date | undefined>();

    return (
        <div className={styles.Header}>
            <div className={styles.Right}>
                <UnitHierarchy />
                <Separator orientation='vertical' className={styles.Separator}/>
            <ReportTypes />
            </div>
            <div className={styles.Left}>
                <SaveButton />
                <LaunchButton />
                <Separator orientation='vertical' className={styles.Separator} />
                <UnitChanger />
                <Separator orientation='vertical' className={styles.Separator} />
                <ZDatePicker value={screenDate}
                    setValue={setScreenDate} /> 
                <QuickActions />
            </div>
        </div>
    )
}