import { Plus } from "lucide-react";
import { useState } from "react";
import { useFetchMaterials } from "../../../../../api/materials";
import { useFetchUnits } from "../../../../../api/units";
import { ZCombobox } from "../../../../../components/ZCombobox/ZCombobox";
import type { Material, Report } from "../../../../../types/types";
import { REPORT_TYPES } from "../../../../../utils/MainConstants/ReportTypes";
import { useReportChangeStore } from "../../../../../zustand/reportsChanges";
import { useUnitStore } from "../../../../../zustand/userUnit";
import { MaterialSearchItem } from "./MaterailSearchItem/MaterialSearchItem";
import styles from './MaterialSearch.module.scss';
import { MaterialSearchLabel } from "./MaterialSearchLabel/MaterialSearchLabel";

type MaterialSearchProps = {
    setReports: React.Dispatch<React.SetStateAction<Report[]>>;
    reports: Report[];
}

export const MaterialSearch = ({ setReports, reports }: MaterialSearchProps) => {
    const units = useFetchUnits();
    const materials = useFetchMaterials();
    const screenUnit = useUnitStore(s => s.screenUnit);
    const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
    const addMaterialsChanges = useReportChangeStore(s => s.addMaterialsChanges);
    
    const addMaterials = () => {
        const relevantReportTypes = REPORT_TYPES.getFunctions.getTypesWithMaterials();
        const screenUnitChildren = units.filter(unit => unit.parentId === screenUnit.id);

        const selectedMaterialsReports: Report[] = selectedMaterials
            .filter(selectedMaterials => reports.every(report => report.material.id !==
                selectedMaterials.id)).map(selectedMaterial => ({
                    material: selectedMaterial,
                    items: screenUnitChildren.map(unit => ({
                        unit,
                        types: relevantReportTypes.map(reportType => ({
                            id: reportType,
                            comment: '',
                            quantity: 0
                        }))
                    })),
                    comment: ''
                }));

        addMaterialsChanges(selectedMaterials, screenUnitChildren, relevantReportTypes)
        setReports((prev) => [...prev, ...selectedMaterialsReports])
        setSelectedMaterials([]);
    }

    // 20000017 20000018

    return (
        <div className={styles.Combobox}>
            <ZCombobox
                value={selectedMaterials}
                onValueChange={setSelectedMaterials}
                isItemEqualToValue={(item, selectedItem) => item.id === selectedItem.id}
                items={materials}
                multiple
                startAdornment={<Plus className={styles.PlusIcon} onClick={() => console.log('aaa')} />}
                onAdormentClick={addMaterials}
                onPaste={(event) => {
                    const pastedValue = event.clipboardData.getData('text')
                    const searchedMaterials = pastedValue.split("\r\n").slice(0, pastedValue.length).filter((searchedMaterial) => searchedMaterial !== '')
                    console.log(searchedMaterials)
                }}
                slotProps={{
                    classes: {
                        Container: styles.Container,
                        Chips: styles.Chips,
                        ItemIndicatorIcon: styles.ItemIndicatorIcon,
                        Input: styles.Input,
                        Trigger: styles.Trigger,
                        TriggerIcon: styles.TriggerIcon
                    },
                }}
                placeholder='בחירת מק״ט'
                emptyLabel='אין מק״טים להצגה'
                itemComponent={(item: Material) => <MaterialSearchItem item={item} />}
                valueNode={(materials: Material[] | Material) => <MaterialSearchLabel materials={materials} />}
            />
        </div>
    )
}