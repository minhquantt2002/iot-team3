import {
    FormControl, InputLabel, Select as MuiSelect, MenuItem, SelectChangeEvent
} from '@mui/material'

import {useState} from 'react'

export interface OptionProp {
    id: string
    label: string
    parent?: string
}

interface SelectProps {
    title: string
    defaultValue?: { label: string, id: string } | null
    options: OptionProp[]
    handleChange: (e: SelectChangeEvent) => void
    name: string
    size?: 'small' | 'medium'
}

const Select = ({title, name, handleChange, defaultValue, options, size = 'medium'}: SelectProps) => {
    const [value, setValue] = useState(defaultValue !== null ? defaultValue?.id : "")
    const onChangeSelection = (e: SelectChangeEvent) => {
        setValue(e.target.value)
        handleChange(e)
    }
    return (
        <FormControl variant="outlined" sx={{textAlign: 'left'}} size={size}>
            <InputLabel>{title}</InputLabel>
            <MuiSelect
                name={name}
                label={title}
                onChange={onChangeSelection}
                value={value}
            >
                {null !== defaultValue &&
                    <MenuItem key={defaultValue?.id} value={defaultValue?.id}>{defaultValue?.label}</MenuItem>}
                {options.map(item => defaultValue?.label !== item.label.concat(' *') && (<MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>))}
            </MuiSelect>
        </FormControl>
    )
}

export default Select