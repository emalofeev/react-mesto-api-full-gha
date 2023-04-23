class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfileInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  editProfile(dataUser) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataUser),
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(dataCard) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataCard),
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }

  addLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }

  changeAvatar(link) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(link),
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:3000/',
});
