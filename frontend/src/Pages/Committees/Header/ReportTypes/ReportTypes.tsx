import { Tabs } from "../../../../components/Tabs/Tabs";
import { REPORT_TYPES } from "../../../../utils/MainConstants/ReportTypes";
import { useReportTypeStore } from "../../../../zustand/reportType";

export const ReportTypes = () => {
    const reportType = useReportTypeStore(s => s.reportType);
    const updateReportType = useReportTypeStore(s => s.updateReportType);

    const reportTypesTabs = REPORT_TYPES.getFunctions.getTypes().map(reportType => ({
        value: reportType.id,
        label: reportType.text,
        color: reportType.colors.primary
    }));

    return (
        <Tabs
            activeTab={reportType}
            setActiveTab={updateReportType}
            tabs={reportTypesTabs} />
    );
}