import { Input as BaseInput } from '@base-ui-components/react/input'
import { clsx } from 'clsx'
import styles from './Input.module.scss'

export default function Input({ className, ...props }: BaseInput.Props) {
  return <BaseInput {...props} className={clsx(styles.Input, className)} />
}