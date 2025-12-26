import { useFetchReports } from '../../../api/reports';
import { useFetchUnits } from '../../../api/units';
import { useReportTypeStore } from '../../../zustand/reportType';
import { useUnitStore } from '../../../zustand/userUnit';
import styles from './Content.module.scss';
import { ContentBody } from './ContentBody/ContentBody';
import { ContentHeader } from './ContentHeader/ContentHeader';

export const Content = () => {
    const { screenUnit } = useUnitStore();
    const units = useFetchUnits();
    const reports = useFetchReports();

    const childrenDescriptions = units.filter(unit => unit.parentId === screenUnit.id && unit.status.id === 0).map(
        unit => unit.description
    );
    const childrenReports = reports.map(report => ({
        ...report,
        items: report.items.filter(item => item.unit.parentId === screenUnit.id)
    }))

    return (
        <div className={styles.Content}>
            <ContentHeader unitsDescriptions={childrenDescriptions} />
            <ContentBody reports={childrenReports}/>
        </div>
    )
}
