import { getInitialCards, getUserName, editDataProfile, addNewCard } from "../components/api.js";
import { createCard, handleLikeButtonClick } from "../components/card.js";
import {
  openPopup,
  closePopup,
  setClosePopupOnOverlayClick,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import "../pages/index.css";

// DOM-elements
const placesList = document.querySelector(".places__list");
const btnEdit = document.querySelector(".profile__edit-button");
const btnNewCard = document.querySelector(".profile__add-button");
const btnClosePoput = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__image");
const formEditProfile = document.forms.editProfile;
const formAddNewCard = document.forms.newPlace;
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const titleNewCard = formAddNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkNewCard = formAddNewCard.querySelector(".popup__input_type_url");

// config form-valid
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup-form-submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input-error_active",
};

// img-cards-popup
const handleCardImageClick = (cardImg, cardTitle) => {
  popupImageElement.src = cardImg.src;
  popupImageElement.alt = cardImg.alt;
  popupCaption.textContent = cardTitle.textContent;
  openPopup(popupImage);
};

// load info profile
const loadProfElements = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImg.style.backgroundImage = `url(${data.avatar})`;
};

// valid forms
enableValidation(validationConfig);

// Opening a pop-up for profile editing
btnEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEdit);
});

// Opening a popup to add a new card with validation reset
btnNewCard.addEventListener("click", () => {
  clearValidation(formAddNewCard, validationConfig);
  openPopup(popupNewCard);
});

// Closing popups when clicking on the close buttons
btnClosePoput.forEach((btnClose) => {
  btnClose.addEventListener("click", () => {
    const popup = btnClose.closest(".popup");
    closePopup(popup);
  });
});

/*
 * Installing closing handlers by clicking on the
 * overlay for each popup separately
 */
setClosePopupOnOverlayClick(popupEdit);
setClosePopupOnOverlayClick(popupNewCard);
setClosePopupOnOverlayClick(popupImage);

// Sending a profile editing form
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  editDataProfile(profileTitle.textContent, profileDescription.textContent);
  closePopup(popupEdit);
});

// Sending a form for adding a new card
formAddNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardElement = createCard(
    titleNewCard.value,
    linkNewCard.value,
    handleLikeButtonClick,
    handleCardImageClick
  );
  placesList.prepend(newCardElement);
  addNewCard(titleNewCard.value, linkNewCard.value);
  formAddNewCard.reset();
  closePopup(popupNewCard);
});

// Load user and cards with Promise.all
Promise.all([getUserName(), getInitialCards()])
  .then(([userData, cards]) => {
    loadProfElements(userData);
    cards.forEach((item) => {
      const cardElement = createCard(
        item.name,
        item.link,
        handleLikeButtonClick,
        handleCardImageClick
      );

      // add quantity btn like in card
      cardElement.querySelector('.card__quantity-like').textContent = item.likes.length;
      
      placesList.append(cardElement);
    });
  })
  .catch((err) => console.log(err));
