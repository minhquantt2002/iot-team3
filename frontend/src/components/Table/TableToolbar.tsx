import { Toolbar, Typography } from '@mui/material'

type TableToolbarProps = {
    children: React.ReactNode
    title: string,
}

const TableToolbar = ({ children, title }: TableToolbarProps) => {
    return (
        <>
            <Toolbar>
                <Typography
                    variant='h3'
                    component='div'
                    display={'inline-block'}
                >
                    {title}
                </Typography>
            </Toolbar>
            
            {children}
        </>
    )
}

export default TableToolbar
