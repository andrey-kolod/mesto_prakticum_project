// Конфигурация сервера
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "14b58559-029e-496e-9a10-e787d4f1cf4c",
    "Content-Type": "application/json",
  },
};

// Получение данных профиля пользователя с сервера
export async function getServerProfile() {
  return fetch(config.baseUrl + "/users/me", {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Не удалось загрузить данные профиля. Ошибка: ${res.status}. ${res.statusText}`
    );
  });
}

// Получение карточек мест с сервера
export async function getServerCards() {
  return fetch(config.baseUrl + "/cards", {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      console.error(
        `Не удалось загрузить карточки. Ошибка: ${res.status}. ${res.statusText}`
      )
    );
  });
}

// Изменение данных профиля на сервере
export async function setServerProfile(name, about) {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      console.error(
        `Не удалось обновить данные профиля. Ошибка: ${res.status}. ${res.statusText}`
      )
    );
  });
}

// Добавление карточки на сервер
export async function addServerCard(name, link) {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      console.error(
        `Не удалось загрузить карточку. Ошибка: ${res.status}. ${res.statusText}`
      )
    );
  });
}

// Удаление карточки
export async function deleteServerCard(name, link, card_id) {
  return fetch(config.baseUrl + `/cards/${card_id}`, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      console.error(
        `Не удалось удалить карточку. Ошибка: ${res.status}. ${res.statusText}`
      )
    );
  });
}

// Добавление лайка к карточке
export async function addLikeServerCard(card_id) {
  return fetch(config.baseUrl + `/cards/likes/${card_id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      console.error(
        `Не удалось поставить лайк. Ошибка: ${res.status}. ${res.statusText}`
      )
    );
  });
}

// Удаление лайка к карточке
export async function deleteLikeServerCard(card_id) {
  return fetch(config.baseUrl + `/cards/likes/${card_id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      console.error(
        `Не удалось убрать лайк. Ошибка: ${res.status}. ${res.statusText}`
      )
    );
  });
}

// Замена аватара на сервере
export async function setServerAvatar(link) {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      console.error(
        `Не удалось обновит аватар. Ошибка: ${res.status}. ${res.statusText}`
      )
    );
  });
}
