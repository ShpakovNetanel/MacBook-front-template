import { Typhography } from "../../../../../../components/Typography/Typography";
import type { Material } from "../../../../../../types/types";
import { MaterialMultiply } from "./MaterialMultiply/MaterialMultiply";
import styles from './RowPrefix.module.scss';

type RowPrefixProps = {
    material: Material;
}

export const RowPrefix = ({ material }: RowPrefixProps) => {
    return <div className={styles.Prefix}>
        <div className={styles.MaterialId}>
            <Typhography slotProps={{
                classes: {
                    Label: styles.Id
                }
            }}>{material.id}</Typhography>
            <Typhography>-</Typhography>
            <Typhography slotProps={{
                classes: {
                    Label: styles.Nickname
                }
            }}>{material.nickname}</Typhography>
        </div>
        <Typhography slotProps={{
            classes: {
                Label: styles.Description
            }
        }}>{material.description}</Typhography>
        <MaterialMultiply multiply={material.multiply}/>
    </div>
}