const cardPack = document.getElementById('cardPack')

document.getElementById('cardPack').addEventListener('click', function(event) {
    if (event.target.tagName === 'DIV') {
        cardPack.classList.toggle("movedCards");
    } else if (event.target.tagName === 'INPUT' || event.target.tagName === 'BUTTON') {
        event.stopPropagation();
    }
});