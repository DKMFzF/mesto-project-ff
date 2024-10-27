import initialCards from "./cards";
import { createCard, handleLikeButtonClick } from "../components/card";
import {
  handleAddAttributesToImagePopup,
  openPopup,
  closePoputs,
  handleFormProfileSubmit,
  handleFormNewCardSubmit,
  placesList,
  popupEdit,
  formEditProfile,
  formAddNewCard,
} from "../components/modal";
import "../pages/index.css";

// global element
const overlay = document.querySelector(".page__content");
const btnEdit = document.querySelector(".profile__edit-button");
const btnNewCard = document.querySelector(".profile__add-button");
const btnsClosePoput = document.querySelectorAll(".popup__close");
const popupNewCard = document.querySelector(".popup_type_new-card");

// Adding cards to the page
initialCards.forEach((item) => {
  const cardElement = createCard(
    item.name,
    item.link,
    handleLikeButtonClick,
    handleAddAttributesToImagePopup
  );
  placesList.append(cardElement);
});

// open poput type edit profile
btnEdit.addEventListener("click", () => openPopup(popupEdit));

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
formEditProfile.addEventListener("submit", handleFormProfileSubmit);
formAddNewCard.addEventListener("submit", handleFormNewCardSubmit);
