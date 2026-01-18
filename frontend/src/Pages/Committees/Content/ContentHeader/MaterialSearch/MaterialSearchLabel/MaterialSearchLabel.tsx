import { Combobox as BaseCombobox } from "@base-ui-components/react";
import type { Material } from "../../../../../../types/types";
import styles from './MaterialSearchLabel.module.scss';
import { isEmpty } from "lodash";

type MaterialSearchLabelProps = {
    materials: Material[] | Material;
}

export const MaterialSearchLabel = ({ materials }: MaterialSearchLabelProps) => {
    const selectedMaterials = Array.isArray(materials) ? materials : [materials];

    return !isEmpty(selectedMaterials)
        ? <BaseCombobox.Chip className={styles.Chip}>
            <span className={styles.ChipText}>
                {selectedMaterials.length > 1
                    ? `נבחרו ${selectedMaterials.length} מק״טים`
                    : `${selectedMaterials[0].id} - ${selectedMaterials[0].description}`}
            </span>
        </BaseCombobox.Chip>
        : null
}
