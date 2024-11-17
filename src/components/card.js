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

  btnDeleteCard.addEventListener("click", () => {
    openPopup(popupDeleteCard);

    formDeleteCard.addEventListener(
      "submit",
      (evt) => {
        evt.preventDefault();
        deleteRequest(item)
          .then(() => {
            cardElement.remove();
            closePopup(popupDeleteCard);
          })
          .catch((err) => console.error(`Ошибка удаления карточки: ${err}`));
      },
      { once: true }
    );
  });

  closePopupButton.addEventListener("click", () => closePopup(popupDeleteCard));
};
