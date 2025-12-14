import { Combobox } from "@base-ui-components/react";
import type { Material } from "../../../../../types/types";
import styles from './MaterialSearchLabel.module.scss';
import { isEmpty } from "lodash";

type MaterialSearchLabelProps = {
    materials: Material[] | Material;
}

export const MaterialSearchLabel = ({ materials }: MaterialSearchLabelProps) => {
    const selectedMaterials = Array.isArray(materials) ? materials : [materials];

    return !isEmpty(selectedMaterials)
        ? <Combobox.Chip className={styles.Chip}>
            {selectedMaterials.length > 1
                ? `נבחרו ${selectedMaterials.length} מק״טים`
                : `${selectedMaterials[0].id} - ${selectedMaterials[0].description}`}
        </Combobox.Chip>
        : null
}