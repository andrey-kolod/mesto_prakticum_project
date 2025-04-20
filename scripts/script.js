"use strict";

// --------- profile popup variable ------------

const editProfileButton = document.querySelector("#edit-button");
const closeProfilePopupButton = document.querySelector(
  "#profile-popup-close-button"
);
const editProfilePopup = document.querySelector("#edit-profile-popup");
const saveProfileButton = document.querySelector("#save-profile-button");
const popupOpened = "popup_opened";
const popupClosed = "popup_closed";
let userNameField = document.querySelector("#edit-user-name");
let userDescriptionField = document.querySelector("#edit-user-description");
let profileUserName = document.querySelector("#profile-user-name");
let profileUserDescription = document.querySelector(
  "#profile-user-description"
);

// ---------- picture popup variable ----------

const addPictureButton = document.querySelector("#add-picture-button");
const closePicturesPopupButton = document.querySelector(
  "#pictures-popup-close-button"
);
const addPicturesPopup = document.querySelector("#add-pictures-popup");
const savePicturesButton = document.querySelector("#save-pictures-button");
let placeNameField = document.querySelector("#edit-place-name");
let placeLinkField = document.querySelector("#edit-place-link");

// --------- input variables -------------

const inp = document.querySelectorAll(".popup__container_fields");
const esc = document.querySelectorAll(".popup");

// --------- add cards variables------------

const placeTemplate = document.querySelector("#place").content;
const places = document.querySelector(".elements");

// ---------- open and close popup ------------
function openPopup(button) {
  button.classList.add(popupOpened);
  button.classList.remove(popupClosed);
}

function closePopup(button) {
  button.classList.remove(popupOpened);
  button.classList.add(popupClosed);
}

// ----- open profile popup ------

editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
});
// ----- close profile popup ------

closeProfilePopupButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closePopup(editProfilePopup);
});

// -------- close popup with click ----------

esc.forEach((item) => {
  item.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup") && evt.button === 0) {
      closePopup(this.closest(".popup"));
    }
  });
});

// ------ close popup with esc ---------

document.addEventListener("keyup", function (evt) {
  esc.forEach((item) => {
    if (!item.classList.contains("popup_closed") && evt.key === "Escape") {
      closePopup(item);
    }
  });
});

//!!!!!!!!!!! --------- broadcast value from profile fields ----------

const getProfileInfo = function () {
  userNameField.value = profileUserName.textContent.trim();
  userDescriptionField.value = profileUserDescription.textContent.trim();
};

getProfileInfo();

//!!!!!!!!!! --------- save edited value in profile and close popup ------------

const saveProfileInfo = function () {
  profileUserName.textContent = userNameField.value.trim();
  profileUserDescription.textContent = userDescriptionField.value.trim();
  getProfileInfo();
};

saveProfileButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  saveProfileInfo();
  closePopup(editProfilePopup);
});

inp.forEach((item) => {
  item.addEventListener("keyup", function (evt) {
    if (evt.code === "Enter" && evt.target.matches(".profile-input")) {
      saveProfileInfo();
      closePopup(this.closest(".popup"));
    } else if (evt.code === "Enter" && evt.target.matches(".place-input")) {
      addPlaceInArray(placeNameField.value, placeLinkField.value);
      saveAddedPicture();
      closePopup(this.closest(".popup"));
    }
  });
});

// ----- open picture popup ------

addPictureButton.addEventListener("click", function () {
  openPopup(addPicturesPopup);
});

// ----- close picture popup ------

closePicturesPopupButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closePopup(addPicturesPopup);
});
// ------- save picture and close place popup ------------

const saveAddedPicture = function () {
  const placeElement = placeTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  placeElement.querySelector(".elements__element_pic").src =
    placeLinkField.value;
  placeElement.querySelector(".elements__element_header").textContent =
    placeNameField.value;

  if (placeLinkField.value.length > 0 && placeNameField.value.length > 0) {
    places.prepend(placeElement);
  }

  placeNameField.value = "";
  placeLinkField.value = "";

  closePopup(addPicturesPopup);

  deletePictureButton = document.querySelectorAll(
    ".elements__element_pic_remove-button"
  );
  deletePictureButton.forEach((button) => {
    button.addEventListener("click", (item) => {
      deletePlaceCard(item);
    });
  });

  popupOverlay();

  closeFullScreenPicturePopupButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    closePopup(fullScreenPicturePopup);
  });
};

savePicturesButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  addPlaceInArray(placeNameField.value, placeLinkField.value);
  saveAddedPicture();
  addLike();
});

// --------- photo cards in array --------------

const initialCards = [
  {
    name: "Los Angeles",
    link: "https://images.unsplash.com/photo-1518416177092-ec985e4d6c14?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "New York",
    link: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Moscow",
    link: "https://images.unsplash.com/photo-1523263983652-bb7473e297ad?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // {
  //   name: "Spb",
  //   link: "https://etu.ru/assets/cache/images/en/why-us/cultural-capital/1280x854-spb-view-bridges01.0cb.jpg",
  // },
];

// ------------- add place in HTML ---------------

const addPlacesInHtml = function () {
  initialCards.forEach((index) => {
    const placeElement = placeTemplate
      .querySelector(".elements__element")
      .cloneNode(true);

    placeElement.querySelector(".elements__element_pic").src = index.link;

    placeElement.querySelector(".elements__element_header").textContent =
      index.name;

    places.prepend(placeElement);
  });
};

addPlacesInHtml();

// --------- add picture in array ---------------

const addPlaceInArray = function (name, link) {
  let initialCard = {};
  initialCard.name = name;
  initialCard.link = link;
  initialCards.push(initialCard);
};

// ------------ like picture card -------------
const addLike = function () {
  const likeButton = document.querySelectorAll(".elements__element_like-img");

  likeButton.forEach((item) => {
    item.addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__element_like-img_active");
    });
  });
};

addLike();

// -------------- remove place card ----------------

// кнопка
let deletePictureButton = document.querySelectorAll(
  ".elements__element_pic_remove-button"
);

// событие

const deletePlaceCard = (item) => {
  const place = item.target.closest(".elements__element");
  place.remove();
  removePlaceFromArray(place);
};

deletePictureButton.forEach((button) => {
  button.addEventListener("click", deletePlaceCard);
});

//---------- удаление из массива -------------
const removePlaceFromArray = (place) => {
  const placeLink = place
    .closest(".elements__element")
    .querySelector(".elements__element_pic");

  const deleteIndexFromArray = function (initialCards) {
    let arrayIndex;
    initialCards.findIndex((item, index) => {
      const itemLink = item.link === placeLink.src;
      const itemName =
        item.name ===
        place.querySelector(".elements__element_header").textContent;
      if (!itemLink && !itemName) return;
      if (itemLink && itemName) {
        arrayIndex = index;
      }
    });
    initialCards.splice(arrayIndex, 1);
  };
  deleteIndexFromArray(initialCards);
};

//----------------- open picture -----------

const fullScreenPicturePopup = document.querySelector(
  "#full-screen-picture-popup"
);

const closeFullScreenPicturePopupButton = document.querySelector(
  "#full-screen-picture-close-button"
);

const overlayHeader = document.querySelector(".full-screen-picture-header");

const popupOverlay = function () {
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
};
popupOverlay();

closeFullScreenPicturePopupButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  closePopup(fullScreenPicturePopup);
});

// Валидация
//!!! Переделать с form и element. Добавить метод reset. validity.

const editProfileForm = document.forms["editProfileForm"];

const userName = editProfileForm.elements["user-name"];
const userDescription = editProfileForm.elements["user-description"];

const showInputError = (inputName, validationMessage) => {
  // console.log(validationMessage);

  inputName.classList.add("popup__container_field-error_visible");
};

const hideInputError = (inputName) => {
  inputName.classList.remove("popup__container_field-error_visible");
};

// Вывод сообщения
const isValid = (inputElement) => {
  const errorMessage = inputElement.nextElementSibling;
  if (inputElement.validity.valid) {
    hideInputError(errorMessage);
  } else {
    errorMessage.textContent = inputElement.validationMessage;
    showInputError(errorMessage, inputElement.validationMessage);
  }
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Функция проверки валидности
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// Функция переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};
// Функция перебора всех инпутов
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__container_fields")
  );
  const buttonElement = formElement.querySelector(
    ".popup__container_save-button"
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (inputElement) => {
      const inputElementTarget = inputElement.target;
      isValid(inputElementTarget);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Перебор форм

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__container"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

// Валидация кнопки Отправить

editProfileButton.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editProfileForm.reset();
});

addPlaceForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addPlaceForm.reset();
});

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
