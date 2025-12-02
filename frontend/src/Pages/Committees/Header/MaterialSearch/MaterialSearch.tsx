import { Plus } from "lucide-react";
import { useFetchMaterials } from "../../../../api/materials";
import { ZCombobox } from "../../../../components/ZCombobox/ZCombobox";
import type { Material } from "../../../../types/types";
import { MaterialSearchItem } from "./MaterailSearchItem/MaterialSearchItem";
import styles from './MaterialSearch.module.scss';
import { MaterialSearchLabel } from "./MaterialSearchLabel/MaterialSearchLabel";

export const MaterialSearch = () => {
    const materials = useFetchMaterials();

    return (
        <>
            <button className={styles.Plus}>
                <Plus />
            </button>
            <ZCombobox items={materials}
                multiple
                slotProps={{
                    classes: {
                        Input: styles.Input,
                        Container: styles.Container
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