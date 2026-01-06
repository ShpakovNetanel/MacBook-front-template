import { ZTyphography } from '../../../../components/ZTypography/ZTypography';
import { MaterialSearch } from './MaterialSearch/MaterialSearch';
import styles from './ContentHeader.module.scss';
import type { Report } from '../../../../types/types';

type ContentHeaderProps = {
    unitsDescriptions?: string[];
    setReports: React.Dispatch<React.SetStateAction<Report[]>>;
    reports: Report[];
}

export const ContentHeader = ({ unitsDescriptions, setReports, reports }: ContentHeaderProps) => {
    return (
        <div className={styles.Header}>
            <MaterialSearch setReports={setReports} reports={reports}/>
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
        </div>
    )
}