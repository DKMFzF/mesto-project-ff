export const createCard = (nameCard, imgSrc, handleLike, handleImageClick, likesCount) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".places__item.card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__quantity-like");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = imgSrc;
  cardImg.alt = nameCard;
  cardTitle.textContent = nameCard;
  likeCounter.textContent = likesCount;

  likeButton.addEventListener("click", (evt) => handleLike(evt, likeButton, likeCounter));
  cardImg.addEventListener("click", () => handleImageClick(cardImg, cardTitle));

  return cardElement;
};

export const deleteCard = (cardElement, deleteRequest, item) => {
  const btnDeleteCard = cardElement.querySelector('.card__delete-button');
  btnDeleteCard.addEventListener('click', () => {
    cardElement.remove();
    deleteRequest(item);
  });
}
