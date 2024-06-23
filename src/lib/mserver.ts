const PAPERAPI: string = "https://api.papermc.io/v2/projects/paper";

export type CreateServer = {
    name: string,
    dedicated_ram: number,
    version: string,
    build: string,
} 

export const createServer = async (server: CreateServer) => {
    try {
        const build = await getLatestBuild(server.version);
        server.build = `${build.build}`;

        const resp = await fetch(`http://localhost:3000/server/create`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(server)
        });

        if (resp.ok) {
            return await resp.json() as Server;
        } else {
            const error = await resp.text();
            throw new Error(error);
        }
    } catch (error) {
        throw error;
    }
}

export const getServerByName = async (name: string) => {
    try {
        const resp = await fetch(`http://localhost:3000/server/name/${name}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (resp.ok) {
            return await resp.json();
        } else {
            const error = await resp.text();
            throw new Error(error);
        }
    } catch (error) {
        throw error;
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
            return await resp.json();
        } else {
            const error = await resp.text();
            throw new Error(error);
        }
    } catch (error) {
        throw error;
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
            throw new Error(error);
        }
    } catch (error) {
        throw error;
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
        });

        if (!resp.ok) {
            const error = await resp.text();
            throw new Error(error);
        }
    } catch (error) {
        throw error;
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

export const getPaperData = async () => {
    try {
        const resp = await fetch(`https://api.papermc.io/v2/projects/paper`);

        if (!resp.ok) {
            const error = await resp.text();
            throw new Error(error);
        }

        return await resp.json();
    } catch (error) {
        throw error;
    }
}

export const getLatestBuild = async (version: string) => {
    try {
        const resp = await fetch(`${PAPERAPI}/versions/${version}/builds`);

        if (!resp.ok) {
            const error = await resp.text();
            throw new Error(error);
        }

        const tmp_obj = await resp.json();
        return tmp_obj.builds[tmp_obj.builds.length-1];
    } catch (error) {
        throw error;
    }
}