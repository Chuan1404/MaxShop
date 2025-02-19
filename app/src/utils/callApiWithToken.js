import { authService } from "services";

const callApiWithToken = async (url, options = {}) => {
    const token = JSON.parse(localStorage.getItem('token'));
    options = {
        ...options,
        headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
        }
    }
    let res = await fetch(url, options)
    if (res.status === 401) {
        const refreshToken = await authService.refreshToken();
        console.log(refreshToken)

        token.accessToken = refreshToken.data;
        localStorage.setItem('token', JSON.stringify(token))

        options = {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token.accessToken}`
            }
        }
        res = await fetch(url, options)
    }

    return res.json()
}

export default callApiWithToken