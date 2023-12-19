import { Skeleton, TableCell, TableRow } from "@mui/material"

const TableLoader = ({ length }: { [key: string]: number }) => {
    const loadRows: React.ReactNode[] = []
    const loadCells: React.ReactNode[] = []
    for (let i = 0; i < length; i++) {
        loadCells.push(<TableCell key={i + 1}><Skeleton variant="rounded" sx={{ fontSize: '1rem' }} /></TableCell>)
    }
    for (let i = 0; i < 5; i++) {
        loadRows.push(<TableRow key={i}>{loadCells}</TableRow>)
    }
    return (
        <>
            {loadRows.map(v => v)}
        </>
    )
}

export default TableLoader