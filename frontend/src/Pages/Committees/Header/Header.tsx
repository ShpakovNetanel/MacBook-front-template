import { Separator as BaseSeparator } from '@base-ui-components/react';
import { useState } from 'react';
import { DatePicker } from '../../../components/DatePicker/DatePicker';
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
                <BaseSeparator orientation='vertical' className={styles.Separator} />
                <ReportTypes />
            </div>
            <div className={styles.Left}>
                <SaveButton />
                <LaunchButton />
                <BaseSeparator orientation='vertical' className={styles.Separator} />
                <UnitChanger />
                <BaseSeparator orientation='vertical' className={styles.Separator} />
                <DatePicker value={screenDate}
                    setValue={setScreenDate} 
                    dateFormat='dd.MM.yyyy'/>
                <QuickActions />
            </div>
        </div>
    )
}
