import React, {Suspense} from 'react'

const Loader = (Component: React.FC) => (props: object) => {
    const Loading = () => (
        // <Dialog open={true}>
        //     <DialogContent>
        //         <CircularProgress/>
        //     </DialogContent>
        // </Dialog>
        <></>
    )

    return (
        <Suspense fallback={<Loading/>}>
            <Component {...props} />
        </Suspense>
    )
}

export default Loader
