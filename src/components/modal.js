function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  removeInputErrorInPopup();
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) closePopup(openedPopup);
  }
}

function setClosePopupOnOverlayClick(popup) {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      removeInputErrorInPopup();
      closePopup(popup);
    }
  });
}

function removeInputErrorInPopup() {
  const popupInpErr = document.querySelectorAll(".popup__input-error"); 
  const popupInp = document.querySelectorAll(".popup__input");
  const popupBtn = document.querySelectorAll('#profile-btn-save');
  popupInpErr.forEach(err => err.classList.remove('popup__input-error_active'))
  popupInp.forEach(inputErr => inputErr.classList.remove('popup__input_error'));
  popupBtn.forEach(btnErr =>  {
    btnErr.classList.remove('button_inactive');
    btnErr.removeAttribute('disabled');
  });
}

export { openPopup, closePopup, handleEscClose, setClosePopupOnOverlayClick };
