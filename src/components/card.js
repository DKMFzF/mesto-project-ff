function createCard(nameCard, imgSrc, handleLike, handleImageClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item.card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = imgSrc;
  cardImg.alt = nameCard;
  cardTitle.textContent = nameCard;

  cardElement.querySelector(".card__delete-button").addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", handleLike);
  cardImg.addEventListener("click", () => handleImageClick(cardImg, cardTitle));

  return cardElement;
}

// Функция показывает попат изображения 
function handleCardImageClick(cardImg, cardTitle, popupImageElement, popupCaption, popupImage, openPopup) {
  popupImageElement.src = cardImg.src;
  popupImageElement.alt = cardImg.alt;
  popupCaption.textContent = cardTitle.textContent;
  openPopup(popupImage);
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, handleLikeButtonClick, deleteCard, handleCardImageClick };
