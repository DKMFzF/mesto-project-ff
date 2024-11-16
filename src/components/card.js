export const createCard = (nameCard, imgSrc, handleLike, handleImageClick) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item.card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = imgSrc;
  cardImg.alt = nameCard;
  cardTitle.textContent = nameCard;
  
  likeButton.addEventListener("click", handleLike);
  cardImg.addEventListener("click", () => handleImageClick(cardImg, cardTitle));

  return cardElement;
}

export const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
}

export const deleteCard = (cardElement, deleteRequest, item) => {
  const btnDeleteCard = cardElement.querySelector('.card__delete-button');
  btnDeleteCard.addEventListener('click', () => {
    cardElement.remove();
    deleteRequest(item);
  });
}
