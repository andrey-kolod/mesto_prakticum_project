import { editProfileForm } from "./constants.js";

// Вывод сообщения об ошибке ввода под инпутом
const showInputError = (inputName) => {
  inputName.classList.add("popup__container_field-error_visible");
};

// Скрытие сообщения об ошибке ввода
const hideInputError = (inputName) => {
  inputName.classList.remove("popup__container_field-error_visible");
};

// Вывод/скрытие сообщения об ошибке в зависимости от валидности
function isValid(inputElement) {
  const errorMessage = inputElement.nextElementSibling;
  if (inputElement.validity.valid) {
    hideInputError(errorMessage); // скрыть сообщение об ошибке
  } else {
    errorMessage.textContent = inputElement.validationMessage;
    showInputError(errorMessage); // показать сообщение об ошибке
  }
}

// Проверки валидности инпутов
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Переключение состояния кнопки сохранения
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else if (buttonElement === null) {
    buttonElement = false; // Обход ошибки из-за того, что buttonElement не определен (null)
  } else {
    buttonElement.disabled = false;
  }
}

// Перебора всех инпутов
function setEventListeners(formElement) {
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
}

// Перебор форм
export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__container"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

// Валидация кнопки Отправить
export function submitButtonValidation(button) {
  button.addEventListener("submit", (evt) => {
    evt.preventDefault();
    editProfileForm.reset();
  });
  button.addEventListener("submit", (evt) => {
    evt.preventDefault();
    addPlaceForm.reset();
  });
}

// Очистка уведомлений валидации
export function placeValidInfoClear() {
  document
    .querySelectorAll(".popup__container_field-error_visible")
    .forEach((span) => {
      span.classList.remove("popup__container_field-error_visible");
    });
}
