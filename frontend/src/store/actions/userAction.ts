import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { ResponseState } from "../../common/Ui"
import { deleteUser, fetchUsers, updateUser, addUser, fetchUserById } from "../services/userApi"

import { User } from "../../common/User"

export const init: ResponseState = {
    statusCode: 200,
    data: [],
    status: 'success',
    form: {}
}

export const resetStatusCode = (state: ResponseState) => {
    state.statusCode = 200
}

export const setFormUser = (state: ResponseState, action: PayloadAction<User>) => {
    state.form = action.payload
}

export const handleChangeForm = (state: ResponseState, action: PayloadAction<{ [key: string]: string }>) => {
    const { name, value } = action.payload
    const form = state.form as User
    form[name as keyof User] = value;
    state.form = form
}

export const resetForm = (state: ResponseState, action: PayloadAction<User>) => {
    state.form = {} as User
}

export const getUserByAdmin = createAsyncThunk(
    'getUsers',
    async () => {
        return await fetchUsers();
    }
)

export const getUserById = createAsyncThunk(
    'getUserById',
    async ({ id }: { [key: string]: string }) => {
        return await fetchUserById(id);
    }
)

export const addUserByAdmin = createAsyncThunk(
    "addUser",
    async (user: User) => {
        return await addUser(user)
    }
)

export const updateUserByAdmin = createAsyncThunk(
    "updateUser",
    async (user: User) => {
        return await updateUser(user)
    }
)

export const deleteUserByAdmin = createAsyncThunk(
    "deleteUser",
    async ({ sub }: { [key: string]: string }) => {
        const res = await deleteUser({ sub })
        return { res: res, id: sub }
    }
)

export const getUserInStore = (data: User[], id: string) => {
    const index = data.findIndex((value: User) => value.id === id)
    return data[index]
}

export const formatDataUser = (data: any): User[] => {
    return data.map((row: User): User => {
        return {
            ...row,
            dob: row['dob'].split('-').reverse().join('-'),
        }
    })
}
