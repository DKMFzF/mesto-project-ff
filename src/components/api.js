const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
        authorization: 'f0998318-31f6-4d3e-8baa-13705e6511f3',
        'Content-Type': 'application/json'
    }
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, { 
        headers: config.headers 
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};