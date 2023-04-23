class Api {
  constructor({ baseUrl }) {
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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._getResponseData);
  }

  editProfile(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }

  addCard({ name, link }) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, link }),
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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }

  changeAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(this._getResponseData)
      .catch((err) => {
        console.log(err);
      });
  }
}

export const api = new Api({
  baseUrl: 'https://api.emalofeev.nomoredomains.monster/',
});
