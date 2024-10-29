import initialCards from "./cards";
import { createCard, handleLikeButtonClick } from "../components/card";
import {
  handleAddAttributesToImagePopup,
  openPopup,
  closePoputs,
  handleFormProfileSubmit,
  handleFormNewCardSubmit,
} from "../components/modal";
import "../pages/index.css";

// global element
const overlay = document.querySelector(".page__content");
const placesList = document.querySelector(".places__list");
const btnEdit = document.querySelector(".profile__edit-button");
const btnNewCard = document.querySelector(".profile__add-button");
const btnsClosePoput = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// forms
const formEditProfile = document.forms.editProfile;
const formAddNewCard = document.forms.newPlace;

// popups
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");

// popups element
const popupImageElement = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const titleNewCard = formAddNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkNewCard = formAddNewCard.querySelector(".popup__input_type_url");

// Adding cards to the page
initialCards.forEach((item) => {
  const cardElement = createCard(
    item.name,
    item.link,
    handleLikeButtonClick,
    handleAddAttributesToImagePopup,
    popupImage,
    popupImageElement,
    popupCaption
  );
  placesList.append(cardElement);
});

// open poput type edit profile
btnEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// open poput add new card
btnNewCard.addEventListener("click", () => openPopup(popupNewCard));

// close poput
btnsClosePoput.forEach((item) => {
  item.addEventListener("click", closePoputs);
});

// close poput by click on overlay
overlay.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePoputs();
  }
});

// send forms
formEditProfile.addEventListener("submit", (evt) => {
  handleFormProfileSubmit(
    evt,
    profileTitle,
    profileDescription,
    nameInput,
    jobInput
  );
});

formAddNewCard.addEventListener("submit", (evt) =>
  handleFormNewCardSubmit(
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
  )
);
