import { Plus } from "lucide-react";
import { useState } from "react";
import { useFetchMaterials } from "../../../../api/materials";
import { ZCombobox } from "../../../../components/ZCombobox/ZCombobox";
import type { Material } from "../../../../types/types";
import { MaterialSearchItem } from "./MaterailSearchItem/MaterialSearchItem";
import styles from './MaterialSearch.module.scss';
import { MaterialSearchLabel } from "./MaterialSearchLabel/MaterialSearchLabel";

export const MaterialSearch = () => {
    const materials = useFetchMaterials();
    const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([]);

    const addMaterials = () => {    
        setSelectedMaterials([]);
    }

    return (
        <>
            <button type='button' className={styles.Plus} onClick={addMaterials}>
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
                valueNode={(materials: Material[]) => <MaterialSearchLabel materials={materials} />}
            />
        </>
    )
}