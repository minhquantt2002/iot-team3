import * as config from '../../config'

export const fetchUserLogs = async () => {
    const res = await fetch(
        config.API_USER_LOG_URL,
        {
            method: 'GET',
        }
    )
    return res.json()
}

export const fetchUserLogsById = async (id: string) => {
    console.log('nhu chu bin');
    console.log(id);
    const res = await fetch(
        config.API_USER_LOG_URL + `${id}/`,
        {
            method: 'GET',
        }
    )
    return res.json()
}
