// The function of uploading a card to a page
function createCard(
  nameCard,
  imgSrc,
  handleLike,
  handleAddAttributesToImagePopup,
  popupImage,
  popupImageElement,
  popupCaption
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = imgSrc;
  cardImg.alt = nameCard;

  cardTitle.textContent = nameCard;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => deleteCard(cardElement));

  likeButton.addEventListener("click", handleLike);

  // open poput click by card img
  cardImg.addEventListener("click", () =>
    handleAddAttributesToImagePopup(
      popupImage,
      popupImageElement,
      popupCaption,
      cardImg,
      cardTitle
    )
  );

  return cardElement;
}

// action like button card
function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// delete card
function deleteCard(cardElement) {
  cardElement.remove();
}

export { createCard, handleLikeButtonClick, deleteCard };
