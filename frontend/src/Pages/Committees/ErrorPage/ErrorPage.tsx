import { ZTyphography } from "../../../components/ZTypography/ZTypography";
import styles from './ErrorPage.module.scss';

type ErrorPageProps = {
    message?: string;
};

export const ErrorPage = ({ message }: ErrorPageProps) => {
    return <div className={styles.Page}>
        <ZTyphography slotProps={{
            classes: {
                Label: styles.Message
            }
        }}>{message}</ZTyphography>
    </div>
}