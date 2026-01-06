import { ZTabs } from "../../../../components/ZTabs/ZTabs";
import { REPORT_TYPES } from "../../../../utils/MainConstants/ReportTypes";
import { useReportTypeStore } from "../../../../zustand/reportType";

type Step = {
    value: number;
    label: string;
}

// const steps: Step[] = [
//     { label: 'שצ״ל', value: 2, },
//     { label: 'מלאי', value: 1 },
//     { label: 'דרישות', value: 0 },
//     { label: 'הקצאות', value: 3 }];

export const ReportTypes = () => {
    const reportType = useReportTypeStore(s => s.reportType);
    const updateReportType = useReportTypeStore(s => s.updateReportType);

    const reportTypesTabs = REPORT_TYPES.getFunctions.getTypes().map(reportType => ({
        value: reportType.id,
        label: reportType.text,
        color: reportType.colors.primary
    }));

    return (
        <ZTabs
            activeTab={reportType}
            setActiveTab={updateReportType}
            tabs={reportTypesTabs} />
    );
}