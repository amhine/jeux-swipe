

let cards = document.querySelectorAll('.photoo'); 
let likeButton = document.querySelector('.like');
let dislikeButton = document.querySelector('.dislike');
let cardIndex = 0;

function swipe(direction) {
    let currentCard = cards[cardIndex];

    
    if (direction === 'right') {
        currentCard.style.transform = 'translateX(470px)';
    } else {
        currentCard.style.transform = 'translateX(-700px)';
    }

    setTimeout(() => {
        currentCard.style.opacity = '0'; 
        currentCard.style.display = 'none'; 
        cardIndex++; 

       
        if (cardIndex < cards.length) {
            // carte suivante
            cards[cardIndex].style.display = 'flex';
            cards[cardIndex].style.opacity = '1'; 
            cards[cardIndex].style.transform = 'translateX(0)'; 
        }
    }, 50); // temps animation 
}

likeButton.addEventListener('click', () => swipe('right'));
dislikeButton.addEventListener('click', () => swipe('left'));
