import { Popover as BasePopover } from '@base-ui-components/react'
import { format, isValid, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useId, useState, type Dispatch, type SetStateAction } from 'react'
import Calendar from '../Calendar/Calendar'
import Input from '../Input/Input'
import styles from './DatePicker.module.scss'

interface DatePickerProps {
    value: Date | undefined;
    setValue: Dispatch<SetStateAction<Date | undefined>>;
    dateFormat?: string;
}

const now = new Date()
const endMonth = new Date()
endMonth.setMonth(11)
endMonth.setFullYear(now.getFullYear() + 10)

export const DatePicker = ({
    value: selectedDate,
    setValue: setSelectedDate,
    dateFormat = 'dd/MM/yyyy'
}: DatePickerProps) => {
    const [isDateOpened, setIsDateOpened] = useState(false);
    const inputId = useId()

    const [month, setMonth] = useState(new Date())
    const [inputValue, setInputValue] = useState(format(now, dateFormat))

    const handleDayPickerSelect = (date: Date | undefined) => {
        if (!date) {
            setInputValue('')
            setSelectedDate(undefined)
        } else {
            setSelectedDate(date)
            setMonth(date)
            setInputValue(format(date, dateFormat))
            setIsDateOpened(false)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)

        const parsedDate = parse(event.target.value, dateFormat, new Date())

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate)
            setMonth(parsedDate)
        } else {
            setSelectedDate(undefined)
        }
    }

    return (
        <BasePopover.Root open={isDateOpened} onOpenChange={setIsDateOpened}>
            <div className={styles.InputWrapper}>
                <Input
                    id={inputId}
                    value={inputValue}
                    onChange={handleInputChange}
                    type='text'
                    placeholder={dateFormat}
                    className={styles.Date}
                    onClick={() => { setIsDateOpened(prev => !prev) }}
                />
                <BasePopover.Trigger
                    render={<CalendarIcon className={styles.CalendarIcon} />}
                    nativeButton={false}
                />
            </div>

            <BasePopover.Portal>
                <BasePopover.Positioner sideOffset={8}>
                    <BasePopover.Popup className={styles.Popup}>
                        <Calendar
                            month={month}
                            endMonth={endMonth}
                            onMonthChange={setMonth}
                            mode='single'
                            selected={selectedDate}
                            onSelect={handleDayPickerSelect}
                        />
                    </BasePopover.Popup>
                </BasePopover.Positioner>
            </BasePopover.Portal>
        </BasePopover.Root>
    )
}
