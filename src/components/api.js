const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
        authorization: 'f0998318-31f6-4d3e-8baa-13705e6511f3',
        'Content-Type': 'application/json'
    }
}

// User
export const getUserName = () => {
    return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(getRequestVer);
}

// Cards
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}`, { headers: config.headers })
    .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

// Check Request
const getRequestVer = (res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
}