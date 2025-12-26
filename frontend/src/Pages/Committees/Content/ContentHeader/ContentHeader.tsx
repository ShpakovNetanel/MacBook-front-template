import { ZTyphography } from '../../../../components/ZTypography/ZTypography';
import styles from './ContentHeader.module.scss';

type ContentHeaderProps = {
    unitsDescriptions?: string[];
}

export const ContentHeader = ({ unitsDescriptions }: ContentHeaderProps) => {
    return (
        <div className={styles.Units}>
            {unitsDescriptions?.map((description, index) => (
                <ZTyphography key={index} slotProps={{
                    classes: {
                        Label: styles.UnitDescription
                    }
                }}>
                    {description}
                </ZTyphography>
            ))}
        </div>
    )
}