"use strict";

import {
  editProfileButton,
  closeProfilePopupButton,
  addPictureButton,
  closePicturesPopupButton,
  overLay,
  editProfilePopup,
  saveProfileButton,
  addPicturesPopup,
  savePicturesButton,
  closeFullScreenPicturePopupButton,
  avatarPopupOpenElement,
  avatarPopup,
  avatarPopupCloseButton,
  saveAvatarButton,
  avatarInput,
  profileUserName,
  profileUserAbout,
  profileUserAvatar,
  placeNameField,
  placeLinkField,
  fullScreenPicturePopup,
} from "./src/components/constants.js";

import {
  openPopup,
  closePopup,
  getProfileInfo,
  closePopupOnClick,
  closePopupOnEsc,
  saveProfileInfo,
  saveFormInfoOnEnter,
  popupOverlay,
  savingButtonText,
  savedButtonText,
  uploadAvatar,
} from "./src/components/modal.js";

import {
  deletePictureButton,
  addPlaceInArray,
  addPlacesInHtml,
  addLike,
} from "./src/components/card.js";

import {
  enableValidation,
  submitButtonValidation,
} from "./src/components/validate.js";

import {
  getServerProfile,
  getServerCards,
  setServerProfile,
  addServerCard,
  setServerAvatar,
} from "./src/components/api.js";

//
//
// ----- ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ -----

// Загрузка данных профиля с сервера
export const profileData = await getServerProfile();

// Установить данные профиля на страницу
setLocalProfile(profileData);

// Загрузка данных профиля в локальное хранилище
export function setLocalProfile(profile) {
  profileUserName.textContent = profile.name; // установка имени пользователя в html
  profileUserAbout.textContent = profile.about; // установка описания пользователя в html
  profileUserAvatar.src = profile.avatar; // установка аватара пользователя в html
  getProfileInfo(); // установить значения в поля ввода в попап профиля
}
//
//
// ------- КАРТОЧКИ МЕСТ -----------
// Загрузка карточек мест с сервера
try {
  const cards = await getServerCards();
  setLocalCards(cards); // загрузить карточки в локальное хранилище
} catch (err) {
  console.error(`Что-то пошло не так: ${err}`);
}

// Загрузка всех карточек с сервера в локальное хранилище
function setLocalCards(cards) {
  cards.forEach((card) => {
    setLocalCard(card); // установить карточку в локальное хранилище
  });
}

// Добавление одной карточки с сервера в локальное хранилище
function setLocalCard(card) {
  const userIsOwner = card.owner._id === profileData._id; // определить пользователя является владельцем карточки
  const likeState = card.likes.some((item) => item._id === profileData._id); // определить состояние лайка карточки
  addPlaceInArray(
    card.name,
    card.link,
    userIsOwner,
    card._id,
    card.likes,
    likeState
  ); // добавить карточку в массив initialCards
  addPlacesInHtml(card._id, likeState); // добавить карточку в html документ
  deletePictureButton(); // добавить кнопку удаления карточки
  popupOverlay(); // добавить обработчик нажатия на картинку
  addLike(); // добавить обработчик нажатия на лайк
}
//
//
//
// ------ УПРАВЛЕНИЕ ПОПАПОМ ---------

// Открыть попап профиля
editProfileButton.addEventListener("click", () => openPopup(editProfilePopup)); // обработчик кнопки редактирования профиля

// Сохранение инфо из полей ввода на сервере и в профиле
async function saveProfileInfoOnServerAndHTML(evt) {
  try {
    evt.preventDefault();
    savingButtonText(saveProfileButton); // изменить текст кнопки во время сохранения
    saveProfileInfo(); // отображение данных профиля на странице и установление значений в поля ввода
    await setServerProfile(
      profileUserName.textContent,
      profileUserAbout.textContent
    );
    savedButtonText(saveProfileButton);
    closePopup(editProfilePopup);
  } catch (err) {
    console.error(`Что-то пошло не так: ${err}`);
  }
}

// Сохранить инфо из полей ввода на сервере и в профиле
saveProfileButton.addEventListener("click", (evt) =>
  saveProfileInfoOnServerAndHTML(evt)
); //обработчик кнопки сохранения профиля

// Закрыть попап профиля
closeProfilePopupButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  closePopup(editProfilePopup); // закрыть попап профиля
  getProfileInfo(); // установить значения в поля ввода в попап профиля
});

//
//
// ----- КАРТОЧКИ МЕСТ -----

// Загрузка карточек с сервера
getServerCards();

// Открыть попап с картинкой
addPictureButton.addEventListener("click", () => {
  openPopup(addPicturesPopup);
}); // обработчик кнопки открытия окна добавления картинки

// Закрыть попап с картинкой
closePicturesPopupButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  closePopup(addPicturesPopup);
}); // обработчик кнопки закрытия попапа

// Добавление кнопок удаления места
deletePictureButton(); // обработчик кнопки удаления картинки

// Сохранение добавленного изображения
async function saveAddedPictureOnServerAndHTML(evt) {
  try {
    evt.preventDefault();
    savingButtonText(savePicturesButton); // изменить текст кнопки во время сохранения
    setLocalCard(
      await addServerCard(placeNameField.value, placeLinkField.value)
    ); // добавить карточку на сервер
    savedButtonText(savePicturesButton); // изменить текст кнопки после сохранения
    closePopup(addPicturesPopup); // закрыть попап загрузки картинки
  } catch (err) {
    console.error(`Что-то пошло не так: ${err}`);
  }
}

// Сохранить добавленное изображение
savePicturesButton.addEventListener("click", (evt) => {
  saveAddedPictureOnServerAndHTML(evt);
}); // обработчик кнопка сохранения добаленного места

// Закрытие попапа с картинкой
closeFullScreenPicturePopupButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closePopup(fullScreenPicturePopup);
}); // обработчик кнопки закрытия попап просмотра фото

//
//
// ----- АВАТАР ПОЛЬЗОВАТЕЛЯ -----

// Открыть окно загрузки аватара
avatarPopupOpenElement.addEventListener("click", (item) => {
  item.preventDefault();
  openPopup(avatarPopup);
}); // обработчик поля аватара (кнопки открытия аватара)

// Закрыть окно загрузки аватара
avatarPopupCloseButton.addEventListener("click", (item) => {
  item.preventDefault();
  closePopup(avatarPopup);
}); // обработчик кнопки закрытия аватара

// Сохранение аватара на сервере и в html
async function saveNewAvatar() {
  try {
    const avatarLink = avatarInput.value; // присваивание ссылки из инпута
    await setServerAvatar(avatarLink); // заменить ссылку на сервере
    uploadAvatar(profileData.avatar); // обновить аватар на странице
    closePopup(avatarPopup); // закрыть попап аватара
  } catch (err) {
    console.error(`Что-то пошло не так: ${err}`);
  }
}

// Сохранить аватар
saveAvatarButton.addEventListener("click", (item) => {
  item.preventDefault();
  saveNewAvatar();
}); // обработчик кнопки сохранения аватара

//
//
// ----- МАНИПУЛЯЦИЯ ПОПАПОМ -----

// Закрытие попап кликом на оверлей
closePopupOnClick(overLay);

// Закрытие попап клавишей ESC
closePopupOnEsc(overLay);

// Сохранение данных при нажатии Enter
saveFormInfoOnEnter();

//
//
// ----- ПРОЧЕЕ -----

// Перебор полей ввода
enableValidation();

// Валидация кнопки Отправить
submitButtonValidation(editProfileButton);
submitButtonValidation(addPictureButton);
