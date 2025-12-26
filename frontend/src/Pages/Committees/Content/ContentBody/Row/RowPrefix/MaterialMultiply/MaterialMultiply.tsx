import { ZTyphography } from "../../../../../../../components/ZTypography/ZTypography";

type MaterialMultiplyProps = {
    multiply: number;
}

export const MaterialMultiply = ({ multiply }: MaterialMultiplyProps) => {
    return multiply !== 0 && multiply !== 1 && (
        <ZTyphography>{`מגיע בכפולות של: ${multiply}`}</ZTyphography>
    )
}