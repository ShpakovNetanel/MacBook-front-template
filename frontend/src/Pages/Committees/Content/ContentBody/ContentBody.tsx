import { ArrowDownAz, ChevronRight, Filter, SortAsc } from "lucide-react";
import { ZAccordion } from "../../../../components/ZAccordion/ZAccordion";
import type { Report } from "../../../../types/types";
import { CategoryLabel } from "./CategoryLabel/CategoryLabel";
import styles from './ContentBody.module.scss';
import { Row } from "./Row/Row";
import { ZTooltip } from "../../../../components/ZTooltip/ZTooltip";

type ContentBodyProps = {
    reports: Report[];
}

export const ContentBody = ({ reports }: ContentBodyProps) => {
    const categories = [...new Set(reports.map(report => report.material.category))];

    return <div className={styles.ContentBody}>
        {categories.map(category =>
            <ZAccordion
                key={category}
                trigger={
                    <>
                        {<ChevronRight className={styles.TriggerIcon} />}
                        <CategoryLabel label={category} />
                    </>
                }
                headerNode={
                    <div className={styles.Actions}>
                        <ZTooltip title="מיון" slotProps={{
                            side: 'top'
                        }}>
                            <ArrowDownAz />
                        </ZTooltip>
                        <ZTooltip title="סינון" slotProps={{
                            side: 'top'
                        }}>
                            <Filter />
                        </ZTooltip>
                    </div>
                }
                slotProps={{
                    classes: {
                        Header: styles.Header
                    }
                }}>
                {reports.filter(report => report.material.category === category).map((report) => (
                    <Row key={report.material.id} report={report} />
                ))}
            </ZAccordion>
        )}
    </div>
}