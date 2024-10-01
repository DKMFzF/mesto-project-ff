const addCardButton = document.querySelector('.profile__add-button');
const placeList = document.querySelector('.places__list');

// The function of uploading a card to a page

function createCard(nameCard, imgSrc) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = imgSrc;
    cardElement.querySelector('.card__image').alt = nameCard;
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => { 
        deleteCard(cardElement)
    });

    cardElement.querySelector('.card__title').textContent = nameCard;

    return placeList.append(cardElement);
}

// Card deletion function

function deleteCard(cardElement) {
    cardElement.remove();
}

// Event handler for clicking the add card button

addCardButton.addEventListener('click', () => {
    initialCards.forEach(item => { 
        createCard(item.name, item.link);
    });
});