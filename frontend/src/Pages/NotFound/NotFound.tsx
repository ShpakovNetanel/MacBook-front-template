import { Field as BaseField } from '@base-ui-components/react'
import styles from './NotFound.module.scss';

export const NotFound = () => {
    return (
        <BaseField.Root className={styles.page}>
            <BaseField.Label className={styles.notFound}>Not Found</BaseField.Label>
        </BaseField.Root>
    )
}
