// Попапы
export const overLay = document.querySelectorAll(".popup");

// Класс открытого попапа
export const popupOpened = "popup_opened";

// Класс закрытого попапа
export const popupClosed = "popup_closed";

// Инпуты
export const input = document.querySelectorAll(".popup__container_fields");

//
//
// ---- ПРОФИЛЬ ----

// Кнопка редактирования профиля
export const editProfileButton = document.querySelector("#edit-button");

// Кнопка закрытия окна редактирования профиля
export const closeProfilePopupButton = document.querySelector(
  "#profile-popup-close-button"
);

// Попап редактирования профиля
export const editProfilePopup = document.querySelector("#edit-profile-popup");

// Кнопка сохранения профиля
export const saveProfileButton = document.querySelector("#save-profile-button");

// Форма редактирования профиля
export const editProfileForm = document.forms["editProfileForm"];

//
//
// ---- МЕСТО ----

// Кнопка добавления нового места
export const addPictureButton = document.querySelector("#add-picture-button");

// Кнопка закрытия окна добавления нового места
export const closePicturesPopupButton = document.querySelector(
  "#pictures-popup-close-button"
);

// Попап добавления картинок
export const addPicturesPopup = document.querySelector("#add-pictures-popup");

// Кнопка сохранения картинок
export const savePicturesButton = document.querySelector(
  "#save-pictures-button"
);

// Кнопка закрытия окна с картинкой
export const closeFullScreenPicturePopupButton = document.querySelector(
  "#full-screen-picture-close-button"
);

// Массив карточек
export const initialCards = [];

// Секция карточек места в HTML
export const places = document.querySelector(".elements");

// Шаблон места
export const placeTemplate = document.querySelector("#place").content;

// Поле ввода названия места
export let placeNameField = document.querySelector("#edit-place-name");

// Поле ввода ссылки на картинку
export let placeLinkField = document.querySelector("#edit-place-link");

//
//
// ---- АВАТАР ----

// Кнопка открытия окна аватара
export const avatarPopupOpenElement = document.querySelector(
  ".profile__info_avatar"
);

// Попап аватара
export const avatarPopup = document.querySelector("#change-avatar");

// Кнопка закрытия окна аватара
export const avatarPopupCloseButton = document.querySelector(
  "#avatar-popup-close-button"
);

// Кнопка сохранения аватара
export const saveAvatarButton = document.querySelector("#save-avatar-button");

// Поле редактирования аватара
export const avatarInput = document.querySelector("#input-avatar-link");

// Поле ввода имени пользователя
export let userNameField = document.querySelector("#edit-user-name");

// Поле ввода описания пользователя
export let userAboutField = document.querySelector("#edit-user-about");

// Имя пользователя на странице (h1)
export let profileUserName = document.querySelector("#profile-user-name");

// Описание пользователя на странице (p)
export let profileUserAbout = document.querySelector("#profile-user-about");

// Аватар пользователя
export let profileUserAvatar = document.querySelector("#profile-user-avatar");

//
//
// ---- ПОЛНОЭКРАННЫЙ ПРОСМОТР КАРТИНКИ ----

// Попап с картинкой
export const fullScreenPicturePopup = document.querySelector(
  "#full-screen-picture-popup"
);

// Название места на странице когда картинка открыта на весь экран
export const overlayHeader = document.querySelector(
  ".full-screen-picture-header"
);

//
//
// ---- ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ КАРТИНКИ ----

// Попап подтверждения удаления места
export const confirmDeletePicturePopup = document.querySelector(
  "#confirm-delete-picture-popup"
);

// Кнопка подтверждения удаления места
export const confirmDeletePictureButton = document.querySelector(
  "#confirm-delete-picture-button"
);

// Кнопка закрытия попапа удаления места
export const closePopupConfirmDeletePictureButton = document.querySelector(
  "#confirm-delete-pictures-popup-close-button"
);
