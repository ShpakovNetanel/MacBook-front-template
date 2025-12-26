import { isEmpty } from 'lodash'
import { useErrorMessageStore } from '../../zustand/ErrorMessage'
import styles from './Committees.module.scss'
import { Content } from './Content/Content'
import { Header } from './Header/Header'
import { ErrorPage } from './ErrorPage/ErrorPage'

export const Committees = () => {
    const errorMessage = useErrorMessageStore((state) => state.error);

    return (
        <div className={styles.DabaPage}>
            <>
                <div className={styles.Header}>
                    <Header />
                </div>
                <div className={styles.Content}>
                    {isEmpty(errorMessage) ?
                        <Content />
                        : <ErrorPage message={errorMessage} />}
                </div>
            </>
        </div>
    )
}