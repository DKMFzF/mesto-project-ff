const addCardButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');

// The function of uploading a card to a page

function createCard(nameCard, imgSrc) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');

    cardImg.src = imgSrc;
    cardImg.alt = nameCard;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => { 
        deleteCard(cardElement)
    });

    cardElement.querySelector('.card__title').textContent = nameCard;

    return cardElement;
}

// Card deletion function

function deleteCard(cardElement) {
    cardElement.remove();
}

// Adding cards to the page

initialCards.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    placesList.append(cardElement);
});