import * as config from '../../config'
import { User } from '../../common/User'

export const fetchUsers = async () => {
    const res = await fetch(
        config.API_USER_URL,
        {
            method: 'GET',
        }
    ).then(result => result.json())
    return res;
}

export const fetchUserById = async (id: string) => {
    const res = await fetch(
        config.API_USER_URL + `${id}/`,
        {
            method: 'GET',
        }
    ).then(result => result.json())
    return res;
}

export const addUser = async (user: User) => {
    const res = await fetch(
        config.API_USER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    )
    console.log(res.status)
    return res.status
}

export const updateUser = async (user: User) => {
    const res = await fetch(
        config.API_USER_URL + `${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }
    )
    console.log(res.status)
    return res.status
}

export const deleteUser = async ({ sub }: { [key: string]: string }) => {
    const res = await fetch(
        config.API_USER_URL + `${sub}`, {
        method: 'DELETE',
        // headers: { 'Content-Type': 'application/json' },
    }
    )
    console.log(res.status)
    return res.status
}