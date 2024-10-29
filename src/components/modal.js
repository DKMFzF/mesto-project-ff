// open img popup
function handleAddAttributesToImagePopup(
  popupImage,
  popupImageElement,
  popupCaption,
  cardImg,
  cardTitle
) {
  popupImageElement.src = cardImg.src;
  popupImageElement.alt = cardImg.alt;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupImage);
}

// open popup
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

// close popup
function closePoputs() {
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// close poput by push esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closePoputs();
  }
}

// processing the submission of the form for adding a new card
function handleFormProfileSubmit(evt, profileTitle, profileDescription, nameInput, jobInput) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePoputs();
}

// Processing the submission of the form for adding a new card
function handleFormNewCardSubmit(
  evt,
  formAddNewCard,
  popupImage,
  placesList,
  titleNewCard,
  linkNewCard,
  popupImageElement,
  popupCaption,
  createCard,
  handleLikeButtonClick
) {
  evt.preventDefault();
  placesList.prepend(
    createCard(
      titleNewCard.value,
      linkNewCard.value,
      handleLikeButtonClick,
      handleAddAttributesToImagePopup,
      popupImage,
      popupImageElement,
      popupCaption
    )
  );
  formAddNewCard.reset();
  closePoputs();
}

export {
  handleAddAttributesToImagePopup,
  openPopup,
  closePoputs,
  handleFormProfileSubmit,
  handleFormNewCardSubmit,
};
