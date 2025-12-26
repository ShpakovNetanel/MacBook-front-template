import { ZTyphography } from "../../../../../../components/ZTypography/ZTypography";
import type { Material } from "../../../../../../types/types";
import { MaterialMultiply } from "./MaterialMultiply/MaterialMultiply";
import styles from './RowPrefix.module.scss';

type RowPrefixProps = {
    material: Material;
}

export const RowPrefix = ({ material }: RowPrefixProps) => {
    return <div className={styles.Prefix}>
        <div className={styles.MaterialId}>
            <ZTyphography>{material.id}</ZTyphography>
            <ZTyphography>-</ZTyphography>
            <ZTyphography slotProps={{
                classes: {
                    Label: styles.Nickname
                }
            }}>{material.nickname}</ZTyphography>
        </div>
        <ZTyphography>{material.description}</ZTyphography>
        <MaterialMultiply multiply={material.multiply}/>
    </div>
}