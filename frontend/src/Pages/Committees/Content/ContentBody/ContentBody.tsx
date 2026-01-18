import { isEmpty } from "lodash";
import { Accordion } from "../../../../components/Accordion/Accordion";
import type { Report, ReportStatus, Unit } from "../../../../types/types";
import { CategoryTitle } from "./CategoryTitle/CategoryTitle";
import styles from './ContentBody.module.scss';
import { Row } from "./Row/Row";
import { Typhography } from "../../../../components/Typography/Typography";
import { useReportTypeStore } from "../../../../zustand/reportType";
import { useReportChangeStore } from "../../../../zustand/reportsChanges";

type ContentBodyProps = {
    reports: Report[];
    childrenToDisplay: Unit[];
    transitionProps: Record<string, string>;
}

export const ContentBody = ({
    reports,
    childrenToDisplay,
    transitionProps,
}: ContentBodyProps) => {
    const reportType = useReportTypeStore(s => s.reportType);
    const reportsChanges = useReportChangeStore(s => s.reportsChanges);

    const getReportStatus = (report: Report): ReportStatus => {
        const statusChanges = reportsChanges.filter(change =>
            change.materialId === report.material.id && change.type === reportType
        );

        if (statusChanges.length > 0) {
            return statusChanges.some(change => change.status === 'Active')
                ? 'Active'
                : 'Disabled';
        }

        const typeStatuses = report.items
            .map(item => item.types.find(type => type.id === reportType)?.status)
            .filter((status): status is ReportStatus => Boolean(status));

        if (typeStatuses.length === 0) {
            return 'Active';
        }

        return typeStatuses.some(status => status === 'Active')
            ? 'Active'
            : 'Disabled';
    };

    const activeReports = reports.filter(report => getReportStatus(report) === 'Active');
    const categories = [...new Set(activeReports.map(report => report.material.category))];

    const displayReports = !isEmpty(childrenToDisplay) &&
        !isEmpty(activeReports)

    return <div className={styles.ContentBody}
        data-has-rows={displayReports}>
        {displayReports
            ? categories.map(category =>
                <Accordion
                    key={category}
                    title={<CategoryTitle category={category} />}
                    slotProps={{
                        classes: {
                            Header: styles.Header,
                            Panel: styles.Panel
                        }
                    }}>
                    {activeReports.filter(report => report.material.category === category).map((report) => (
                        <Row
                            key={report.material.id}
                            report={report}
                            childrenToDisplay={childrenToDisplay}
                            transitionProps={transitionProps} />
                    ))}
                </Accordion>
            )
            : <Typhography>אין מק״טים להצגה</Typhography>}
    </div>
}
