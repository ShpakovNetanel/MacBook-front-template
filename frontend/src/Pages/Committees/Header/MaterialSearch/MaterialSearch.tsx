import { Plus } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { useFetchMaterials } from "../../../../api/materials";
import { ZCombobox } from "../../../../components/ZCombobox/ZCombobox";
import type { Material } from "../../../../types/types";
import { MaterialSearchItem } from "./MaterailSearchItem/MaterialSearchItem";
import styles from './MaterialSearch.module.scss';
import { MaterialSearchLabel } from "./MaterialSearchLabel/MaterialSearchLabel";
import { REPORT_TYPES } from "../../../../utils/MainConstants/ReportTypes";
import { useReportTypeStore } from "../../../../zustand/reportType";

export const MaterialSearch = () => {
    const materials = useFetchMaterials();
    const reportType = useReportTypeStore(s => s.reportType);
    const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);

    const addMaterials = () => {
        setSelectedMaterials([]);
    }

    return (
        <div className={styles.Combobox}>
            <button type='button' className={styles.Plus} onClick={addMaterials}
                style={{
                    '--report-color': REPORT_TYPES.colorsFunctions.getPrimary(reportType)
                } as CSSProperties}>
                <Plus />
            </button>
            <ZCombobox
                value={selectedMaterials}
                onValueChange={setSelectedMaterials}
                isItemEqualToValue={(item, selectedItem) => item.id === selectedItem.id}
                items={materials}
                multiple
                slotProps={{
                    classes: {
                        Container: styles.Container,
                        ItemIndicatorIcon: styles.ItemIndicatorIcon
                    }
                }}
                placeholder='בחירת מק״ט'
                emptyLabel='אין מק״טים להצגה'
                itemComponent={(item: Material) => <MaterialSearchItem item={item} />}
                valueNode={(materials: Material[] | Material) => <MaterialSearchLabel materials={materials} />}
            />
        </div>
    )
}