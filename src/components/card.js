import {
  deleteServerCard,
  addLikeServerCard,
  deleteLikeServerCard,
} from "./api.js";

import {
  initialCards,
  places,
  placeTemplate,
  confirmDeletePicturePopup,
  confirmDeletePictureButton,
  closePopupConfirmDeletePictureButton,
} from "./constants.js";
import { closePopup, openPopup } from "./modal.js";

//
//

// Добавление места в документ HTML (принимает id карточки и состояние лайка)
export function addPlacesInHtml(card_id, likeState) {
  const element = initialCards[initialCards.length - 1]; // присвоить элементу индекс последнего элемента
  const placeElement = placeTemplate
    .querySelector(".elements__element")
    .cloneNode(true); // клонировать шаблон карточки
  placeElement.querySelector(".elements__element_pic").src = element.link; // установить шаблону ссылку на изображение
  placeElement.querySelector(".elements__element_header").textContent =
    element.name; // установить шаблону название места
  placeElement.querySelector(".elements__element_like-counter").textContent =
    element.likes; // установить шаблону количество лайков
  placeElement
    .querySelector(".elements__element_pic")
    .setAttribute("alt", element.name); // установить alt изображению в шаблоне карточки
  if (likeState) {
    placeElement
      .querySelector(".elements__element_like-img")
      .classList.add("elements__element_like-img_active");
  } // установить лайку активное состояние если есть активные лайки
  placeElement
    .querySelector(".elements__element_pic")
    .setAttribute("dataId", card_id); // установить изображению в шаблоне id карточки
  places.prepend(placeElement); // добавить карточку в начало секции с карточками мест

  // Кнопка удаления места
  const deletePictureButton = document.querySelector(
    ".elements__element_pic_remove-button"
  );

  // Cкрыть с чужих картинок кнопоки удаления
  if (!element.userIsOwner) {
    deletePictureButton.classList.add("disable_btn");
  }
}

// Добавление места в массив initialCards (принимает имя, ссылку на картинку, владельца, id карточки и количество лайков)
export function addPlaceInArray(name, link, owner, cardId, likes) {
  let initialCard = {}; // объявление массива
  initialCard.name = name; // имя
  initialCard.link = link; // ссылка на картинку
  initialCard.userIsOwner = owner; // владельец
  initialCard.id = cardId; // id карточки
  initialCard.likes = likes.length; // количество лайков
  initialCards.push(initialCard); // добавление в конец массива
}

// Установление/снятие лайка
export function addLike() {
  const likeButton = document.querySelector(".elements__element_like-img");
  likeButton.addEventListener("click", function (evt) {
    const cardId = likeButton
      .closest(".elements__element")
      .querySelector(".elements__element_pic")
      .getAttribute("dataId");
    const eventTarget = evt.target;
    if (!eventTarget.classList.contains("elements__element_like-img_active")) {
      // Установка лайка месту на сервере
      (async function () {
        try {
          const likeCount = await addLikeServerCard(cardId, eventTarget);
          eventTarget
            .closest(".elements__element")
            .querySelector(".elements__element_like-counter").textContent =
            likeCount.likes.length;
        } catch (err) {
          console.error(`Что-то пошло не так: ${err}`);
        }
      })();
    } else {
      // Удалить лайк места на сервере
      (async function () {
        try {
          const likeCount = await deleteLikeServerCard(cardId, eventTarget);
          eventTarget
            .closest(".elements__element")
            .querySelector(".elements__element_like-counter").textContent =
            likeCount.likes.length;
        } catch (err) {
          console.error(`Что-то пошло не так: ${err}`);
        }
      })();
    }
    evt.target.classList.toggle("elements__element_like-img_active");
  });
}

// Удаление карточки места из HTML и массива
export function deletePlaceCard(item) {
  const place = item.target.closest(".elements__element");
  place.remove(); // удалить место из html
  removePlaceFromArray(place, initialCards); // удалить место из массива
}

// Удаление элемента из массива
function removePlaceFromArray(place, initialCards) {
  const placeId = place
    .closest(".elements__element")
    .querySelector(".elements__element_pic"); // определение ближайшего изображения
  let arrayIndex;
  initialCards.findIndex((item, index) => {
    const id = item.id === placeId.getAttribute("dataId");
    if (!id) return;
    if (id) {
      arrayIndex = index;
      // Удалить карточку с сервера
      (async function () {
        try {
          await deleteServerCard(item.name, item.link, item.id);
        } catch (err) {
          console.error(`Что-то пошло не так: ${err}`);
        }
      })();
    }
  });
  initialCards.splice(arrayIndex, 1);
}

// Переменная для хранения кнопок "удалить место"
let deletePictureButtons;

// Удалить карточки
export function deletePictureButton() {
  // Запись кнопок в переменную
  deletePictureButtons = document.querySelectorAll(
    ".elements__element_pic_remove-button"
  );

  // Открытие попапа подтверждения удаления и подтверждения удаления нажатием на кнопку
  deletePictureButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
      const targetDeletePictureButton = evt; // записать в переменную нажатую кнопку
      openPopup(confirmDeletePicturePopup); // открыть попап подтверждения удаления

      confirmDeletePictureButton.addEventListener("click", (evt) => {
        evt.preventDefault();
        (async function () {
          try {
            await deletePlaceCard(targetDeletePictureButton); // удалить карточку с сервера
          } catch (err) {
            console.error(`Что-то пошло не так: ${err}`);
          }
        })();
        closePopup(confirmDeletePicturePopup); // закрыть попап подтверждения удаления
      }); // обработчик кнопки подтверждения удаления ("Да")
    }); // обработчик кнопки удаления карточки ("Корзиночки")
  }); // установка слушателя на кнопки удаления карточек
}

// Закрыть попап подтверждения удаления нажатием на кнопку закрытия попапа
closePopupConfirmDeletePictureButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  closePopup(confirmDeletePicturePopup); // закрыть попап подтверждения удаления
}); // обработчик кнопки закрытия попапа подтверждения удаления карточки
