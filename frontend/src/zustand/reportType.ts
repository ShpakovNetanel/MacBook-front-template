import { create } from "zustand";
import { ReportType } from "../utils/MainConstants/ReportTypes"

type State = {
    reportType: ReportType;
}

type Action = {
    updateReportType: (reportType: ReportType) => void;
}

export const useReportTypeStore = create<State & Action>((set) => ({
    reportType: ReportType.USAGE,
    updateReportType: (reportType: ReportType) => set({ reportType })
}))