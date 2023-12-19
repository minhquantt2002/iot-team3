import { TableHead, TableRow } from '@mui/material'

type TableHeaderProps = {
    children: React.ReactNode
}

const TableHeader = (props: TableHeaderProps) => {
    const { children } = props
    return (
        <TableHead>
            <TableRow>
                { children }
            </TableRow>
        </TableHead>
    )
}

export default TableHeader
