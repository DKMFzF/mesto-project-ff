import initialCards from "./cards";
import { createCard, handleLikeButtonClick } from "../components/card.js";
import {
  openPopup,
  closePopup,
  setClosePopupOnOverlayClick
} from "../components/modal.js";
import "../pages/index.css";

// DOM-elements
const placesList = document.querySelector(".places__list");
const btnEdit = document.querySelector(".profile__edit-button");
const btnNewCard = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEditProfile = document.forms.editProfile;
const formAddNewCard = document.forms.newPlace;
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
const titleNewCard = formAddNewCard.querySelector(".popup__input_type_card-name");
const linkNewCard = formAddNewCard.querySelector(".popup__input_type_url");

// Adding cards to a page
initialCards.forEach((item) => {
  const cardElement = createCard(
    item.name,
    item.link,
    handleLikeButtonClick,
    (cardImg, cardTitle) => {
      popupImageElement.src = cardImg.src;
      popupImageElement.alt = cardImg.alt;
      popupCaption.textContent = cardTitle.textContent;
      openPopup(popupImage);
    }
  );
  placesList.append(cardElement);
});

// Opening a pop-up for profile editing
btnEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEdit);
});

// Opening a popup to add a new card
btnNewCard.addEventListener("click", () => openPopup(popupNewCard));

// Closing popups when clicking on the close buttons
document.querySelectorAll(".popup__close").forEach((btnClose) => {
  btnClose.addEventListener("click", () => {
    const popup = btnClose.closest(".popup");
    closePopup(popup);
  });
});

// Installing closing handlers by clicking on the overlay for each popup separately
setClosePopupOnOverlayClick(popupEdit);
setClosePopupOnOverlayClick(popupNewCard);
setClosePopupOnOverlayClick(popupImage);

// Sending a profile editing form
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
});

// Sending a form for adding a new card
formAddNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardElement = createCard(
    titleNewCard.value,
    linkNewCard.value,
    handleLikeButtonClick,
    (cardImg, cardTitle) => {
      popupImageElement.src = cardImg.src;
      popupImageElement.alt = cardImg.alt;
      popupCaption.textContent = cardTitle.textContent;
      openPopup(popupImage);
    }
  );
  placesList.prepend(newCardElement);
  formAddNewCard.reset();
  closePopup(popupNewCard);
});
