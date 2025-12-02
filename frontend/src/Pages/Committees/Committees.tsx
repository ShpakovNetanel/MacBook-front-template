import styles from './Committees.module.scss'
import { Content } from './Content/Content'
import { Header } from './Header/Header'

export const Committees = () => {
    return (
        <div className={styles.Page}>
            <div className={styles.Header}>
                <Header />
            </div>
            <div className={styles.Content}>
                <Content />
            </div>
        </div>
    )
}