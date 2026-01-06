import { isEmpty } from 'lodash'
import { useErrorMessageStore } from '../../zustand/ErrorMessage'
import styles from './Committees.module.scss'
import { Content } from './Content/Content'
import { Header } from './Header/Header'
import { ErrorPage } from './ErrorPage/ErrorPage'
import type { CSSProperties } from 'react'
import { REPORT_TYPES } from '../../utils/MainConstants/ReportTypes'
import { useReportTypeStore } from '../../zustand/reportType'

export const Committees = () => {
    const errorMessage = useErrorMessageStore((state) => state.error);
    const reportType = useReportTypeStore(s => s.reportType);
    
    return (
        <div className={styles.DabaPage}
            style={{
                '--report-color': REPORT_TYPES.colorsFunctions.getPrimary(reportType)
            } as CSSProperties}>
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