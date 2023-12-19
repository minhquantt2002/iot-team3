import { lazy } from 'react'

import MainLayout from "../layout"
import Loader from '../components/Loader'
import Login from '../pages/authn/Login'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

const UserLog = Loader(
    lazy(() => import('../pages/user-log'))
)

const User = Loader(
    lazy(() => import('../pages/user'))
)

const UserDetail = Loader(
    lazy(() => import('../pages/user/user-details'))
)

const NotFound = {
    path: '/*',
    element: <></>,
}

const Authn = {
    path: '/',
    // element: <Outlet />,
    element: localStorage.getItem("access_token") ? <Navigate to="/" /> : <Outlet />,
    children: [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <></>
        }
    ]
}

const MainRoutes = () => [
    {
        path: '/',
        element: localStorage.getItem("access_token") ? <MainLayout /> : <Navigate to="/login" />,
        // element: <MainLayout />,
        children: [
            {
                path: '/user-logs',
                element: <UserLog />
            },
            {
                path: '/users',
                element: <User />
            },
            {
                path: '/users/:id',
                element: <UserDetail />
            },
        ],
    },
    Authn,
    NotFound
]

export default MainRoutes
