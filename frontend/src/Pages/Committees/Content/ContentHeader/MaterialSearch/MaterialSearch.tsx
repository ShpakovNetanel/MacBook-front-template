import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetchMaterials, useFetchPastedMaterials } from "../../../../../api/materials";
import { useFetchUnits } from "../../../../../api/units";
import { Combobox } from "../../../../../components/Combobox/Combobox";
import type { Material, Report } from "../../../../../types/types";
import { REPORT_TYPES } from "../../../../../utils/MainConstants/ReportTypes";
import { useReportChangeStore } from "../../../../../zustand/reportsChanges";
import { useUnitStore } from "../../../../../zustand/userUnit";
import { MaterialSearchItem } from "./MaterailSearchItem/MaterialSearchItem";
import styles from './MaterialSearch.module.scss';
import { MaterialSearchLabel } from "./MaterialSearchLabel/MaterialSearchLabel";
import { useReportTypeStore } from "../../../../../zustand/reportType";
import { getLockedRelatedUnits } from "../../../../../utils/unitsUtil";

type MaterialSearchProps = {
    setReports: React.Dispatch<React.SetStateAction<Report[]>>;
    reports: Report[];
}

export const MaterialSearch = ({ setReports, reports }: MaterialSearchProps) => {
    const units = useFetchUnits();
    const [filter, setFilter] = useState('');
    const screenUnit = useUnitStore(s => s.screenUnit);
    const { data: materials } = useFetchMaterials(filter);
    const reportType = useReportTypeStore(s => s.reportType);
    const [pastedIds, setPastedIds] = useState<string[]>([]);
    const { data: pastedMaterials } = useFetchPastedMaterials(pastedIds)
    const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);
    const addMaterialsChanges = useReportChangeStore(s => s.addMaterialsChanges);
    const [comboboxToggle, setComboboxToggle] = useState(false);
    const flashExistingRow = (materialId: string, shouldScroll: boolean) => {
        const rows = Array.from(document.querySelectorAll(`[data-material-id="${materialId}"]`)) as HTMLElement[];
        if (!rows.length) {
            return;
        }

        if (shouldScroll) {
            const mainRow = document.querySelector(
                `[data-material-id="${materialId}"][data-row-kind="row"]`
            ) as HTMLElement | null;
            const scrollTarget = mainRow ?? rows[0];
            scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        rows.forEach((row) => {
            row.removeAttribute('data-flash');
            void row.offsetWidth;
            row.setAttribute('data-flash', 'true');

            const clearFlash = () => {
                row.removeAttribute('data-flash');
                row.removeEventListener('animationend', clearFlash);
            };

            row.addEventListener('animationend', clearFlash);
            window.setTimeout(clearFlash, 1400);
        });
    };

    useEffect(() => {
        if (!pastedMaterials?.length) {
            return;
        }

        setSelectedMaterials((prev) => {
            const existingIds = new Set(prev.map((material) => material.id));
            const next = [...prev];

            for (const material of pastedMaterials) {
                if (!existingIds.has(material.id)) {
                    next.push(material);
                    existingIds.add(material.id);
                }
            }

            return next;
        });
    }, [pastedMaterials]);

    const addMaterials = () => {
        setComboboxToggle(false);
        
        const relevantReportTypes = REPORT_TYPES.getFunctions.getReportingTypes();
        const screenUnitChildren = getLockedRelatedUnits(screenUnit.id, units);
        const existingIds = new Set(reports.map((report) => report.material.id));
        const duplicateIds = selectedMaterials
            .filter((material) => existingIds.has(material.id))
            .map((material) => material.id);

        duplicateIds.forEach((materialId, index) => {
            flashExistingRow(materialId, index === 0);
        });

        const selectedMaterialsReports: Report[] = selectedMaterials
            .filter(selectedMaterials => reports.every(report => report.material.id !==
                selectedMaterials.id)).map(selectedMaterial => ({
                    material: selectedMaterial,
                    items: screenUnitChildren.map(unit => ({
                        unit,
                        types: relevantReportTypes.map(reportType => ({
                            id: reportType,
                            comment: '',
                            quantity: 0,
                            status: 'Active'
                        }))
                    })),
                    allocatedQuantity: null,
                    comment: ''
                }));

        addMaterialsChanges(selectedMaterials, screenUnitChildren, relevantReportTypes)
        setReports((prev) => [...prev, ...selectedMaterialsReports])
        setSelectedMaterials([]);
    }

    const showInput = REPORT_TYPES.getFunctions.getReportingTypes().includes(reportType);

    return (
        <div className={styles.Combobox}
            data-input-visible={showInput}>
            <Combobox
                open={comboboxToggle}
                onOpenChange={setComboboxToggle}
                value={selectedMaterials}
                onValueChange={setSelectedMaterials}
                isItemEqualToValue={(item, selectedItem) => item.id === selectedItem.id}
                items={materials ?? []}
                onInputValueChange={setFilter}
                inputValue={filter}
                multiple
                limit={10}
                startAdornment={<Plus className={styles.Plus} />}
                onAdormentClick={addMaterials}
                onPaste={(event) => {
                    const pastedValue = event.clipboardData.getData('text');
                    const searchedMaterials = pastedValue
                        .split(/[\s,]+/)
                        .map((value) => value.trim())
                        .filter((value) => value !== '');

                    if (!searchedMaterials.length) {
                        return;
                    }

                    setPastedIds([...new Set(searchedMaterials)]);
                    setFilter('')
                }}
                slotProps={{
                    classes: {
                        Checkbox: styles.Checkbox,
                        Container: styles.Container,
                        Chips: styles.Chips,
                        Input: styles.Input,
                        Trigger: styles.Trigger,
                        TriggerIcon: styles.TriggerIcon,
                        Popup: styles.Popup,
                        Item: styles.Item,
                    },
                    disable: {
                        checkIndicator: true,
                        separator: true
                    }
                }}
                placeholder='בחירת מק״ט...'
                emptyLabel='אין מק״טים להצגה'
                itemComponent={(item: Material) => <MaterialSearchItem item={item} />}
                valueNode={(materials: Material[] | Material) => <MaterialSearchLabel materials={materials} />}
            />
        </div>
    )
}
