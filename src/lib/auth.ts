import { writable, type Writable } from "svelte/store"

export type User = {
    id: number,
    username: string,
}

export let user: Writable<User | null> = writable(null);

export const login = async (username: string, password: string) => {
    try {
        const resp = await fetch('http://localhost:3000/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
            })
        })

        if (resp.ok) {
            const data = await resp.json()
            user.set(data)
        } else {
            const err_msg = await resp.text()
            throw new Error(err_msg)
        }
    } catch (err) {
        throw err
    }
}

export const validateSession = async () => {
    try {
        const resp = await fetch('http://localhost:3000/validate', {
            method: 'GET',
            credentials: 'include',
        })

        if (resp.ok) {
            const data = await resp.json()
            const user_data = {
                id: data.ID,
                username: data.Username,
            };
            user.set(user_data)
            return true
        } else {
            user.set(null)
            return false
        }
    } catch (err) {
        throw err
    }
}