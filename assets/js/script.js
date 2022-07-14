let page = 'zero';

printCard();

document.querySelectorAll('.next').forEach( e => e.addEventListener('click', () => {
    if(page == 'zero') { 
        page = 'one';
    } else {
        page = 'zero';
    }

    eraseCard(); 
    printCard();
}));

function printCard () {
    moviesJson.map((item) => {
        if(item.id == page) {
            let cardItem = document.querySelector('.cardItem').cloneNode(true);
        
            document.querySelector('.row').append(cardItem);
            
            cardItem.classList.add('clone');
            cardItem.classList.add(`${item.id}`);
            cardItem.querySelector('h3').innerHTML = item.title;
            cardItem.querySelector('.dsmovie-card img').src = item.img;
            cardItem.querySelector('.dsmovie-card img').alt = item.title;
        }         
    });
}

function eraseCard() {
    document.querySelectorAll('.clone').forEach(e => {
        if(!e.classList.contains(`${page}`)) {
            e.remove();
        }
    });
}