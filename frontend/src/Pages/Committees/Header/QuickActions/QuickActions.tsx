import { EllipsisVertical } from "lucide-react"
import { ZSpeedDial, type SpeedDialItem } from "../../../../components/ZSpeedDial/ZSpeedDial"
import { ExcelButtons } from "./ExcelButtons/ExcelButtons";
import { MaterialPresets } from "./MaterialPresets/MaterialPresets";

export const QuickActions = () => {
    const actions: SpeedDialItem[] = [
        {
            component: <ExcelButtons />,
            closeOnClick: false
        },
        {
            component: <MaterialPresets />,
            closeOnClick: false
        },
    ];

    return (
        <ZSpeedDial items={actions}
            trigger={<EllipsisVertical />} />
    )
}