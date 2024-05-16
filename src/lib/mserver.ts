export const getServerByName = async (name: string) => {
    try {
        const resp = await fetch(`http://localhost:3000/server/name/${name}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (resp.ok) {
            return await resp.json()
        } else {
            const error = await resp.text()
            throw new Error(error)
        }
    } catch (error) {
        throw error
    }
}

export const getAllServers = async () => {
    try {
        const resp = await fetch('http://localhost:3000/server/all', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (resp.ok) {
            return await resp.json()
        } else {
            const error = await resp.text()
            throw new Error(error)
        }
    } catch (error) {
        throw error
    }
}

export const startServer = async (id: string) => {
    try {
        const resp = await fetch(`http://localhost:3000/server/start/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!resp.ok) {
            const error = await resp.text();
            throw new Error(error)
        }
    } catch(error) {
        throw error
    }
}

export const stopServer = async (id: string) => {
    try {
        const resp = await fetch(`http://localhost:3000/server/stop/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!resp.ok) {
            const error = await resp.text();
            throw new Error(error)
        }
    } catch(error) {
        throw error
    }
}

export type Server = {
    ID: string
    Name: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
    DedicatedRam: number
}