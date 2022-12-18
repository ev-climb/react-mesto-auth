class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }

    getUser(){
        return fetch(`${this._url}users/me`, {
          headers: this._headers
        })
        .then(this._handleResponse)
        }
    
    editUser(name, about) {
        return fetch(`${this._url}users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: about
          })
        })
        .then(this._handleResponse)
      }

    editAvatar(avatar) {
        return fetch(`${this._url}users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatar
          })
        })
        .then(this._handleResponse)
      }

    getAllCards(){
        return fetch(`${this._url}cards`, {
            headers: this._headers
        })
        .then(this._handleResponse)
    }

    addCard(name, link){
        return fetch(`${this._url}cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            link: link
          })
        })
        .then(this._handleResponse)
      }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
        })
        .then(this._handleResponse);
      }

    changeLikeStatus(id, isLiked) {
      return fetch(`${this._url}cards/${id}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this._headers,
      })
      .then(this._handleResponse);
    }
  }

  const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-52/',
    headers: {
      authorization: 'd078071c-2838-4a0d-a4b4-dfd0e6c1822f',
      'Content-Type': 'application/json'
    }
  });

  export default api;
  // изменил название файла