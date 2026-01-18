import { isPlainObject } from "lodash"
import type { ValueLabelPair } from "../components/Combobox/Combobox"

export function isValueLabelPair(item: unknown):
    item is ValueLabelPair {
    return isPlainObject(item) &&
        typeof item === 'object' &&
        item !== null &&
        'value' in item &&
        'label' in item
}