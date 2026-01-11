import { ZAccordion } from "../../../../components/ZAccordion/ZAccordion";
import type { Report, Unit } from "../../../../types/types";
import { CategoryTitle } from "./CategoryTitle/CategoryTitle";
import styles from './ContentBody.module.scss';
import { Row } from "./Row/Row";

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
    const categories = [...new Set(reports.map(report => report.material.category))];

    return <div className={styles.ContentBody}>
        {categories.map(category =>
            <ZAccordion
                key={category}
                title={<CategoryTitle category={category} />}
                slotProps={{
                    classes: {
                        Header: styles.Header,
                        Panel: styles.Panel
                    }
                }}>
                {reports.filter(report => report.material.category === category).map((report) => (
                    <Row
                        key={report.material.id}
                        report={report}
                        childrenToDisplay={childrenToDisplay}
                        transitionProps={transitionProps} />
                ))}
            </ZAccordion>
        )}
    </div>
}
