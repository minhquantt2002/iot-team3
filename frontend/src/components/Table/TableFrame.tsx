import { Box, Paper, TableContainer, Table } from '@mui/material'

type TableFrameProps = {
    Toolbar: React.ReactNode,
    Content: React.ReactNode,
}

const TableFrame = ({ Toolbar, Content }: TableFrameProps) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {Toolbar}
                <TableContainer>
                    <Table sx={{ minWidth: 750 }}>
                        {Content}
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}

export default TableFrame
