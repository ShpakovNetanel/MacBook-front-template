import { Typhography } from "../../../../../../../components/Typography/Typography";
import styles from './MaterialMultiply.module.scss';

type MaterialMultiplyProps = {
    multiply: number;
}

export const MaterialMultiply = ({ multiply }: MaterialMultiplyProps) => {
    return multiply !== 0 && multiply !== 1 && (
        <Typhography slotProps={{
            classes: {
                Label: styles.Multiply
            }
        }}>{`מגיע בכפולות של: ${multiply}`}</Typhography>
    )
}