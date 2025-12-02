import { Field } from '@base-ui-components/react'
import styles from './NotFound.module.scss';

export const NotFound = () => {
    return (
        <Field.Root className={styles.page}>
            <Field.Label className={styles.notFound}>Not Found</Field.Label>
        </Field.Root>
    )
}