import link from "./Link"

export const loginUser = async (credentials) => {
    const response = await link.post("/login", credentials)
    return response.data
}

export const getUsers = async (page = 1) => {
    const response = await link.get(`/users?page=${page}`)
    return response.data
}

export const getUserById = async (id) => {
    const response = await link.get(`/users/${id}`)
    return response.data
}

export const updateUser = async ({ id, userData }) => {
    const response = await link.put(`/users/${id}`, userData)
    return response.data
}

export const deleteUser = async (id) => {
    const response = await link.delete(`/users/${id}`)
    return response.data
}

