import { useState } from 'react';
import { useFetchReports } from '../../../api/reports';
import { useFetchUnits } from '../../../api/units';
import type { Report } from '../../../types/types';
import { useUnitStore } from '../../../zustand/userUnit';
import styles from './Content.module.scss';
import { ContentBody } from './ContentBody/ContentBody';
import { ContentHeader } from './ContentHeader/ContentHeader';

export const Content = () => {
    const { screenUnit } = useUnitStore();
    const units = useFetchUnits();

    const [reports, setReports] = useState<Report[]>(useFetchReports())
    const childrenDescriptions = units.filter(unit => unit.parentId === screenUnit.id && unit.status.id === 0).map(
        unit => unit.description
    );

    return (
        <div className={styles.Content}>
            <ContentHeader
                unitsDescriptions={childrenDescriptions}
                setReports={setReports}
                reports={reports} />
            <ContentBody reports={reports} />
        </div>
    )
}
