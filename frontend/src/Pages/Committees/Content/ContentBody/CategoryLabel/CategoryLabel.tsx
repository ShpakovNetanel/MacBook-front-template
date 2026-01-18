import { Typhography } from "../../../../../components/Typography/Typography"
import styles from './CategoryLabel.module.scss';

type CategoryLabelProps = {
    label: string;
}

export const CategoryLabel = ({ label }: CategoryLabelProps) => {
    return <Typhography
    slotProps={{ classes: {
        Label: styles.Label
    }}}>
        {label}
    </Typhography>
}