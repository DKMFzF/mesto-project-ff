import { createCard, handleLikeButtonClick } from "./card";

// main element
export let placesList = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// popups
export const popupImage = document.querySelector(".popup_type_image");
export const popupEdit = document.querySelector(".popup_type_edit");
const popups = document.querySelectorAll(".popup");

// forms
export const formEditProfile = document.forms.editProfile;
export const formAddNewCard = document.forms.newPlace;

// forms elements
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

// open img popup
function handleAddAttributesToImagePopup(cardImg, cardTitle) {
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");

  popupImageElement.src = cardImg.src;
  popupImageElement.alt = cardImg.alt;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupImage);
}

// open popup
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  document.addEventListener("keydown", handleEscClose);

  if (popup === popupEdit) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
}

// close popup
function closePoputs() {
  popups.forEach((popup) => {
    popup.classList.remove("popup_is-opened");
    popup.classList.add("popup_is-animated");
  });
  document.removeEventListener("keydown", handleEscClose);
}

// close poput by push esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closePoputs();
  }
}

// processing the submission of the form for adding a new card
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePoputs();
}

// Processing the submission of the form for adding a new card
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const titleNewCard = formAddNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const linkNewCard = formAddNewCard.querySelector(".popup__input_type_url");

  placesList.prepend(
    createCard(
      titleNewCard.value,
      linkNewCard.value,
      handleLikeButtonClick,
      handleAddAttributesToImagePopup
    )
  );

  formAddNewCard.reset();
  closePoputs();
}

export {
  handleAddAttributesToImagePopup,
  openPopup,
  closePoputs,
  handleEscClose,
  handleFormProfileSubmit,
  handleFormNewCardSubmit,
};
