import { ChevronLeft } from "lucide-react"
import { CategoryLabel } from "../CategoryLabel/CategoryLabel"
import styles from './CategoryTitle.module.scss'

type CategoryTitleProps = {
    category: string;
}

export const CategoryTitle = ({ category }: CategoryTitleProps) => {
    return <>
        <ChevronLeft className={styles.Icon} />
        <CategoryLabel label={category} />
    </>
}