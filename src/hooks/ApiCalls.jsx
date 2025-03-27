import link from "./Link"

export const loginUser = async (loggedData) => {
    const res = await link.post("/login", loggedData)
    return res.data
}

export const getUsers = async (page = 1) => {
    const res = await link.get(`/users?page=${page}`)
    return res.data
}

export const getUserById = async (id) => {
    const res = await link.get(`/users/${id}`)
    return res.data
}

export const updateUser = async ({ id, userData }) => {
    const res = await link.put(`/users/${id}`, userData)
    return res.data
}

export const deleteUser = async (id) => {
    const res = await link.delete(`/users/${id}`)
    return res.data
}

