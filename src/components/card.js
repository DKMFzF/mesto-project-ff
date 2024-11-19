// TODO: исправить ошибки Ревьюера 

export const createCard = (
  nameCard,
  imgSrc,
  handleLike,
  handleImageClick,
  likesCount
) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__quantity-like");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImg.src = imgSrc;
  cardImg.alt = nameCard;
  cardTitle.textContent = nameCard;
  likeCounter.textContent = likesCount;

  // Установка обработчиков
  likeButton.addEventListener("click", (evt) =>
    handleLike(evt, likeButton, likeCounter)
  );
  cardImg.addEventListener("click", () => handleImageClick(cardImg, cardTitle));

  return cardElement;
};

// FIXME: переделать функцию deleteCard
export const deleteCard = (
  cardElement,
  deleteRequest,
  item,
  openPopup,
  closePopup
) => {
  const btnDeleteCard = cardElement.querySelector(".card__delete-button");
  const popupDeleteCard = document.querySelector(".popup_type_dalete-card");
  const formDeleteCard = popupDeleteCard.querySelector(".popup__form");
  const closePopupButton = popupDeleteCard.querySelector(".popup__close");
  btnDeleteCard.addEventListener('click', () => {
    deleteRequest(item)
    .then(() => {
      cardElement.remove();
    });
  });
};

export const handleLikeButtonClick = (evt, likeButton, likeCounter, unlikeCard, likeCard) => {
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
