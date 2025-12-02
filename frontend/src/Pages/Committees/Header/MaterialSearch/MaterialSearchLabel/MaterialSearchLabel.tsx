import { Combobox } from "@base-ui-components/react";
import type { Material } from "../../../../../types/types";
import styles from './MaterialSearchLabel.module.scss';
import { X } from "lucide-react";

type MaterialSearchLabelProps = {
    materials: Material[];
}
1
export const MaterialSearchLabel = ({ materials }: MaterialSearchLabelProps) => {
    return materials.length > 1 ?
        <Combobox.Chip className={styles.Chip}>
            {`נבחרו ${materials.length} מק״טים`}
            <Combobox.ChipRemove className={styles.ChipRemove} aria-label="Remove">
                <X />
            </Combobox.ChipRemove>
        </Combobox.Chip> :
        materials.length === 1 ?
            <Combobox.Chip className={styles.Chip}>
                {materials[0].id} - {materials[0].description}
                <Combobox.ChipRemove className={styles.ChipRemove} aria-label="Remove">
                    <X />
                </Combobox.ChipRemove>
            </Combobox.Chip> :
            null
}