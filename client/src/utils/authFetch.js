import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokensStorage';

export async function authFetch(url, options = {}, retry = true) {
    const accessToken = getAccessToken();
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401 && retry) {
        const refreshToken = getRefreshToken();
        const res = await fetch('http://localhost:5000/api/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (res.ok) {
            const data = await res.json();
            setTokens({ accessToken: data.accessToken, refreshToken });
            return authFetch(url, options, false);
        } else {
            clearTokens();
            window.location.href = '/login';
        }
    }

    return response;
}
