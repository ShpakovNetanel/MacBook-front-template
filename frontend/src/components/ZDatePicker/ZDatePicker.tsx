import { Popover } from '@base-ui-components/react'
import { format, isValid, parse } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useId, useState, type Dispatch, type SetStateAction } from 'react'
import ZCalendar from '../ZCalendar/ZCalendar'
import ZInput from '../ZInput/ZInput'
import styles from './ZDatePicker.module.scss'

interface DatePickerProps {
    value: Date | undefined
    setValue: Dispatch<SetStateAction<Date | undefined>>
}

const now = new Date()
const endMonth = new Date()
endMonth.setMonth(11)
endMonth.setFullYear(now.getFullYear() + 10)

export const ZDatePicker = ({
    value: selectedDate,
    setValue: setSelectedDate,
}: DatePickerProps) => {
    const [isDateOpened, setIsDateOpened] = useState(false);
    const inputId = useId()

    const [month, setMonth] = useState(new Date())
    const [inputValue, setInputValue] = useState(format(now, 'dd/MM/yyyy'))

    const handleDayPickerSelect = (date: Date | undefined) => {
        if (!date) {
            setInputValue('')
            setSelectedDate(undefined)
        } else {
            setSelectedDate(date)
            setMonth(date)
            setInputValue(format(date, 'dd/MM/yyyy'))
            setIsDateOpened(false)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)

        const parsedDate = parse(event.target.value, 'dd/MM/yyyy', new Date())

        if (isValid(parsedDate)) {
            setSelectedDate(parsedDate)
            setMonth(parsedDate)
        } else {
            setSelectedDate(undefined)
        }
    }

    return (
        <Popover.Root open={isDateOpened} onOpenChange={setIsDateOpened}>
            <div className={styles.InputWrapper}>
                <ZInput
                    id={inputId}
                    value={inputValue}
                    onChange={handleInputChange}
                    type='text'
                    placeholder='dd/mm/yyyy'
                    className={styles.Date}
                    onClick={() => { setIsDateOpened(prev => !prev) }}
                />
                <Popover.Trigger
                    render={<CalendarIcon className={styles.CalendarIcon} />}
                />
            </div>

            <Popover.Portal>
                <Popover.Positioner sideOffset={8}>
                    <Popover.Popup className={styles.Popup}>
                        <ZCalendar
                            month={month}
                            endMonth={endMonth}
                            onMonthChange={setMonth}
                            mode='single'
                            selected={selectedDate}
                            onSelect={handleDayPickerSelect}
                        />
                    </Popover.Popup>
                </Popover.Positioner>
            </Popover.Portal>
        </Popover.Root>
    )
}
