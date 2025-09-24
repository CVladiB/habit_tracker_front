const BASE_URL = 'http://localhost:8080';
const USER_SERVICE_URL = 'user-service';

async function fetchWithError<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(url, options);

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(JSON.stringify(errorData));
    }

    return res.json();
}

export const api = {
    login: (login: string, password: string) =>
        fetchWithError(`${BASE_URL}/${USER_SERVICE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        }),

    register: (data: {
        login: string;
        password: string;
        name: string;
        birthday: string;
        phone: string;
        telegram: string;
        email: string;
    }) => fetchWithError(`${BASE_URL}/${USER_SERVICE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }),
};