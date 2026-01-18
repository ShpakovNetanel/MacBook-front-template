import { Typhography } from "../../../components/Typography/Typography";
import styles from './ErrorPage.module.scss';

type ErrorPageProps = {
    message?: string;
};

export const ErrorPage = ({ message }: ErrorPageProps) => {
    return <div className={styles.Page}>
        <Typhography slotProps={{
            classes: {
                Label: styles.Message
            }
        }}>{message}</Typhography>
    </div>
}