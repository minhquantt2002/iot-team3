import React, { useState } from "react"

import { FormControl, Box, TextField } from '@mui/material'

import Select from "../Select"

import { typeSearch } from "../../common/Filter"

import { useAppDispatch } from "../../store/hooks"
import { handleChangeInputFilter } from "../../store/reducers/filterReducer"

type TableFilteringProps = {
    title: string,
}

const TableFiltering = ({ title }: TableFilteringProps) => {
    title = title.replaceAll(' ', '')
    const dispatch = useAppDispatch()
    const [searchType, setSearchType] = useState('')

    const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        dispatch(handleChangeInputFilter({ searchType, value }))
    }
    return (
        <>
            <FormControl sx={ { minWidth: 180, m: '0 12px' } }>
                <Select
                    size='small'
                    name=""
                    title="Tìm kiếm theo"
                    defaultValue={ null }
                    handleChange={ (e) => { setSearchType(e.target.value) } }
                    options={ typeSearch[title as keyof typeof typeSearch] }
                />
            </FormControl>

            <Box sx={ { minWidth: 180 } }>
                <TextField
                    disabled={ searchType === '' }
                    size="small"
                    onChange={ handleChangeTextField }
                />
            </Box>
        </>
    )
}

export default TableFiltering
