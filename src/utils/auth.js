export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResult(res) {
  if (res.ok && res.status !== 400 && res.status !== 401) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const signUp = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => checkResult(res))
    .then((res) => {
      return res;
    });
};
export const signIn = (password, email, setInfoTooltip) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => checkResult(res))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResult(res))
    .then((res) => {
      return res;
    });
};
