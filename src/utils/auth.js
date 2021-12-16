export const BASE_URL = 'https://auth.nomoreparties.co';

export const signUp = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      console.log(res);
      if (res.status !== 400 && res.status !== 401) {
        return res.json();
      } else {
        return res;
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
export const signIn = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.status !== 400 && res.status !== 401) {
        return res.json();
      } else {
        return res;
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      } else return data;
    })
    .catch((err) => console.log(err));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status !== 401) {
        return res.json();
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
