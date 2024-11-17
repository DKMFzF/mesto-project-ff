import {
  getInitialCards,
  getUserName,
  editDataProfile,
  addNewCard,
  deleteCardRequest,
  likeCard,
  unlikeCard,
  avatarEdit
} from "../components/api.js";
import {
  createCard,
  deleteCard,
} from "../components/card.js";
import {
  openPopup,
  closePopup,
  setClosePopupOnOverlayClick,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import "../pages/index.css";

// DOM-elements
const placesList = document.querySelector(".places__list");
const btnEditAvatar = document.querySelector("#avatar");
const btnEdit = document.querySelector(".profile__edit-button");
const btnNewCard = document.querySelector(".profile__add-button");
const btnClosePoput = document.querySelectorAll(".popup__close");
const btnClosePoputAvatar = document.querySelector(".popup__button_avatar");
const btnClosePoputProfile = document.querySelector(".popup__button_profile");
const btnClosePoputNewCard = document.querySelector(".popup__button_new-card");
const inputAvatraLink = document.querySelector("#avatar-link");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImg = document.querySelector(".profile__image");
const formEditAvatar = document.forms.editProfileAvatar;
const formEditProfile = document.forms.editProfile;
const formAddNewCard = document.forms.newPlace;
const popupAvatarEdit = document.querySelector('.popup_type_avatar');
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

// loading in btn save
const renderLoading = (isLoading, btnClose) => {
  if (isLoading) {
    btnClose.textContent = 'Сохранение...';
  } else {
    btnClose.textContent = 'Сохранить';
  }
}

// like and removing like
const handleLikeButtonClick = (evt, likeButton, likeCounter) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const cardElement = evt.target.closest(".places__item.card");
  const cardId = cardElement.dataset.cardId;

  if (!cardElement || !cardElement.dataset.cardId) {
    console.error("Ошибка: ID карточки не найден.");
    return;
  }

  const apiRequest = isLiked ? unlikeCard : likeCard;

  apiRequest(cardId)
    .then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.error(`Ошибка обновления лайка: ${err}`));
};

// valid forms
enableValidation(validationConfig);

// Opening a pop-up for avatar editing
btnEditAvatar.addEventListener('click', (evt) => {
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupAvatarEdit);
});

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
setClosePopupOnOverlayClick(popupAvatarEdit);
setClosePopupOnOverlayClick(popupEdit);
setClosePopupOnOverlayClick(popupNewCard);
setClosePopupOnOverlayClick(popupImage);

// Sending a avatar editing
formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderLoading(true, btnClosePoputAvatar);
  avatarEdit(inputAvatraLink)
    .then(() => {
      btnEditAvatar.style.backgroundImage = `url(${inputAvatraLink.value})`;
      closePopup(popupAvatarEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => renderLoading(false, btnClosePoputAvatar));
});

// Sending a profile editing form
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();

  renderLoading(true, btnClosePoputProfile);
  editDataProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(popupEdit);
    })
    .catch((err) => console.error(err))
    .finally(() => renderLoading(false, btnClosePoputProfile));
});

// Sending a form for adding a new card
formAddNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  renderLoading(true, btnClosePoputNewCard);
  addNewCard(titleNewCard.value, linkNewCard.value)
    .then((cardData) => {
      const newCardElement = createCard(
        cardData.name,
        cardData.link,
        handleLikeButtonClick,
        handleCardImageClick,
        cardData.likes.length
      );

      newCardElement.dataset.cardId = cardData._id;
      deleteCard(newCardElement, deleteCardRequest, cardData);

      placesList.prepend(newCardElement);
      formAddNewCard.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => console.error(err))
    .finally(() => renderLoading(false, btnClosePoputNewCard));
});

// Load user and cards with Promise.all
Promise.all([getUserName(), getInitialCards()])
  .then(([userData, cards]) => {
    console.log(userData)
    loadProfElements(userData);
    cards.forEach((item) => {
      const cardElement = createCard(
        item.name,
        item.link,
        handleLikeButtonClick,
        handleCardImageClick,
        item.likes.length
      );

      cardElement.dataset.cardId = item._id;

      if (userData._id !== item.owner._id)
        cardElement.querySelector(".card__delete-button").style.display =
          "none";
      else deleteCard(cardElement, deleteCardRequest, item);

      if (item.likes.some((like) => like._id === userData._id))
        cardElement
          .querySelector(".card__like-button")
          .classList.add("card__like-button_is-active");

      placesList.append(cardElement);
    });
  })
  .catch((err) => console.error(err));
