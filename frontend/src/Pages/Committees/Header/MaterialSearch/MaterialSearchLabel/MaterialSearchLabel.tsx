import { Combobox } from "@base-ui-components/react";
import type { Material } from "../../../../../types/types";
import styles from './MaterialSearchLabel.module.scss';
import { isEmpty } from "lodash";

type MaterialSearchLabelProps = {
    materials: Material[];
}

export const MaterialSearchLabel = ({ materials }: MaterialSearchLabelProps) => {
    return !isEmpty(materials)
        ? <Combobox.Chip className={styles.Chip}>
            {materials.length > 1
                ? `נבחרו ${materials.length} מק״טים`
                : `${materials[0].id} - ${materials[0].description}`}
        </Combobox.Chip>
        : null
}