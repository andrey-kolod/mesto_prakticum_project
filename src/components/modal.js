import { placeValidInfoClear } from "./validate.js";

import {
  avatarInput,
  popupOpened,
  popupClosed,
  userNameField,
  profileUserName,
  profileUserAbout,
  userAboutField,
  input,
  placeNameField,
  placeLinkField,
  fullScreenPicturePopup,
  overlayHeader,
  profileUserAvatar,
} from "./constants.js";

// ---- УПРАВЛЕНИЕ ПОПАПОМ ----
//
// Открытие попапа
export function openPopup(button) {
  button.classList.add(popupOpened); // добавить класс открытого попапа
  button.classList.remove(popupClosed); // удалить класс закрытого попапа
}

// Закрытие попапа
export function closePopup(button) {
  button.classList.remove(popupOpened); // удалить класса открытого попапа
  button.classList.add(popupClosed); // добавить класса закрытого попапа
  getProfileInfo(); // установить актуальные данные в поля ввода профиля
  placeFieldsClear(); // очистка полей места в попапе загрузки места
  placeValidInfoClear(); // очистка информации об ошибке
}

// Закрыть попап кликом на оверлей
export function closePopupOnClick(popup) {
  popup.forEach((item) => {
    item.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup") && evt.button === 0) {
        closePopup(this.closest(".popup"));
      }
    });
  });
}

// Закрыть попап клавишей ESC
export function closePopupOnEsc(popup) {
  document.addEventListener("keyup", function (evt) {
    popup.forEach((item) => {
      if (!item.classList.contains("popup_closed") && evt.key === "Escape") {
        closePopup(item);
      }
    });
  });
}

// ---- УПРАВЛЕНИЕ ОТОБРАЖЕНИЯ ТЕКСТА ----
//
// Установление значений имени и описания в поля ввода попапа профиля
export function getProfileInfo() {
  userNameField.value = profileUserName.textContent.trim(); // установить значение имени
  userAboutField.value = profileUserAbout.textContent.trim(); // установить значение описания
}

// Отображение данных профиля на странице и установление значений в поля ввода
export function saveProfileInfo() {
  profileUserName.textContent = userNameField.value.trim(); // установить значение имени
  profileUserAbout.textContent = userAboutField.value.trim(); // установить значение описания
  getProfileInfo(); // установить значения в инпуты
}

// Очистка полей ввода места (Назвние места и ссылка)
export function placeFieldsClear() {
  placeNameField.value = "";
  placeLinkField.value = "";
}

// Сохранение данных и закрытие попапа при нажатии на Enter
export function saveFormInfoOnEnter() {
  input.forEach((item) => {
    item.addEventListener("keyup", function (evt) {
      if (
        evt.code === "Enter" &&
        evt.target.matches(".profile-input" && evt.target.button)
      ) {
        saveProfileInfo(); // сохранение профиля
        closePopup(this.closest(".popup")); // закрытие попапа
      }
      if (
        evt.code === "Enter" &&
        evt.target.matches(".place-input") &&
        evt.target.button
      ) {
        saveAddedPicture(); // сохранение места
        closePopup(this.closest(".popup")); // закрытие попапа
      }
    });
  });
}

// Открытие попапа с картинкой
export function popupOverlay() {
  const pictures = document.querySelectorAll(".elements__element_pic");
  pictures.forEach((picture) => {
    picture.addEventListener("click", function (evt) {
      fullScreenPicturePopup.querySelector(".full-screen-picture").src =
        evt.target.src;
      overlayHeader.textContent = evt.target
        .closest(".elements__element")
        .querySelector(".elements__element_header").textContent;
      openPopup(fullScreenPicturePopup);
    });
  });
}

// Сохранить и закрыть попап с аватаром
export function uploadAvatar() {
  profileUserAvatar.src = avatarInput.value; // установить ссылку из инпута в html документ
}

// Изменение текста кнопки во время сохранения
export function savingButtonText(button) {
  button.textContent = "Сохранение...";
}

// Возврат текста кнопки после сохранения
export function savedButtonText(button) {
  button.textContent = "Сохранить";
}
