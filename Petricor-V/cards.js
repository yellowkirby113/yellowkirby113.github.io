// Balatro-style Card Hand Interaction
document.addEventListener('DOMContentLoaded', () => {
    const cardHand = document.getElementById('card-hand');
    const cards = cardHand.querySelectorAll('.card');
    
    let draggedCard = null;
    let draggedIndex = null;

    cards.forEach((card, index) => {
        // Drag start
        card.addEventListener('dragstart', (e) => {
            draggedCard = card;
            draggedIndex = index;
            card.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        // Drag end
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            draggedCard = null;
            draggedIndex = null;
        });

        // Drag over - allow drop
        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        // Drop
        card.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedCard && draggedCard !== card) {
                // Get all cards as array
                const cardsArray = Array.from(cardHand.children);
                const dropIndex = cardsArray.indexOf(card);
                
                // Remove dragged card from its position
                cardHand.removeChild(draggedCard);
                
                // Insert at new position
                if (dropIndex < draggedIndex) {
                    cardHand.insertBefore(draggedCard, card);
                } else {
                    cardHand.insertBefore(draggedCard, card.nextSibling);
                }
                
                // Re-attach event listeners
                attachCardListeners();
            }
        });
    });

    // Allow dropping on the hand container itself
    cardHand.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    cardHand.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedCard) {
            cardHand.appendChild(draggedCard);
        }
    });

    function attachCardListeners() {
        // Re-initialize if needed after DOM changes
        // This is called after reordering
    }
});
