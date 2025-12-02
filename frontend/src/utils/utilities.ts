import { isPlainObject } from "lodash"
import type { ValueLabelPair } from "../components/ZCombobox/ZCombobox"

export function isValueLabelPair(item: unknown):
    item is ValueLabelPair {
    return isPlainObject(item) &&
        typeof item === 'object' &&
        item !== null &&
        'value' in item &&
        'label' in item
}