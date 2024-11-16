const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-26",
  headers: {
    authorization: "f0998318-31f6-4d3e-8baa-13705e6511f3",
    "Content-Type": "application/json",
  },
};

// User
export const getUserName = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    getRequestVer
  );
};

// Cards
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    getRequestVer
  );
};

// Check Request
const getRequestVer = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

// edit data profile
export const editDataProfile = (newName, newDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newDescription,
        })
    });
}

// add new card
export const addNewCard = (titleCard, linkImg) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: titleCard,
      link: linkImg 
    })
  }).then(getRequestVer);
};

// delete card
export const deleteCardRequest = (item) => {
  return fetch(`${config.baseUrl}/cards/${item._id}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

// like card
export const requestLikeCard = (item) => {
  return fetch(`${config.baseUrl}/cards/likes/${item._id}`, {
    method: 'PUT',
    headers: config.headers
  });
}