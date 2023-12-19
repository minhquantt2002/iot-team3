import { TableRow, TableCell, Typography } from "@mui/material"

const TableBodyEmpty = ({ text, len }: { [key: string]: string | number }) => {
    return (
        <>
            <TableRow key={`row_empt`}>
                <TableCell align="center" key={`cell_empt`} colSpan={len as number + 1}>
                    <Typography variant="subtitle1">
                        {text}
                    </Typography>
                </TableCell>
            </TableRow>
        </>
    )
}

export default TableBodyEmpty