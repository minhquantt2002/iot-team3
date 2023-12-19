import { FilterState, ValueFilter } from "../../common/Filter"
import { PayloadAction } from "@reduxjs/toolkit"

export const init = {
    type: '',
    value: {
        id: ''
    }
}

export const handleChangeInputFilter = (state: FilterState, actions: PayloadAction<{ [key: string]: string }>) => {
    const { searchType, value } = actions.payload
    state.type = searchType
    state.value[searchType as keyof ValueFilter] = value
}

export const resetFiltering = (state: FilterState) => {
    state.type = ''
    Object.keys(state.value).forEach(v => state.value[v as keyof ValueFilter] = '')
}
