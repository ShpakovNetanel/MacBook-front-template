import { ZTyphography } from "../../../../../components/ZTypography/ZTypography"
import styles from './CategoryLabel.module.scss';

type CategoryLabelProps = {
    label: string;
}

export const CategoryLabel = ({ label }: CategoryLabelProps) => {
    return <ZTyphography
    slotProps={{ classes: {
        Label: styles.Label
    }}}>
        {label}
    </ZTyphography>
}