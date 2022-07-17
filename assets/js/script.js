// initial data
let cardPage = sessionStorage.cardPage == undefined ? 'page-1' : sessionStorage.cardPage;
let currentPage = parseInt(cardPage.slice(5)); 
let pageBtns = document.querySelectorAll('.page-item'); 
let pageEnuns = document.querySelectorAll('.pageEnum'); 
let pageQuantity = pageEnuns.length;
let maxCard = 12; 

// events
printCard(); // imprime os cards na tela
pagination(); // controla a paginação

// functions
function printCard() {
    moviesJson.map((movie) => {
        let cloneCard = document.querySelector('.cardItem').cloneNode(true); 
        let clonesQuantity = document.querySelectorAll('.clone').length; 
        let cardImg = cloneCard.querySelector('.card img');
        let rateBtn = cloneCard.querySelector('.btn');
        let cardTitle = cloneCard.querySelector('h3');
        let pCard = cloneCard.querySelector('p');
        let rating = cloneCard.querySelector('h4');
        

        // verifica se o item no objeto pertence a pagina e delimita a quantidade de impressão
        if(movie.page == cardPage && clonesQuantity < maxCard ) { 
            document.querySelector('.row').append(cloneCard); 

            // insere as informações dos cards clonados
            cloneCard.classList.add('clone'); 
            cloneCard.classList.add(`${movie.page}`);
            cardTitle.innerHTML = movie.title; 
            cardImg.src = movie.img; 
            cardImg.alt = movie.title;
            rateBtn.setAttribute('data-movie-id', movie.id);
            rateBtn.addEventListener('click', () => { 
                sessionStorage.setItem("id", rateBtn.getAttribute('data-movie-id')); // salva no navegador o id do card avaliado p/ construção do form
                sessionStorage.setItem("cardPage", cardPage);
                window.open('form.html');
            });

            // atualiza votos
            if(localStorage.votes) {
                let userVote = localStorage.votes.split('-');

                userVote.forEach(vote => {
                    let ratedMovieId = vote.split('#')[0];
                    let userVote = vote.split('#')[1];
                    let reviews = pCard.innerText.split(' ')[0];
                    let currentRating = parseFloat(rating.innerText);

                    if(ratedMovieId == movie.id.toString()) { 
                        pCard.innerHTML = parseFloat(reviews) + 1;

                        let ratingAverage = (currentRating + userVote /  parseInt(pCard.innerText)).toFixed(2);
                        rating.innerHTML = ratingAverage <= 5 ? ratingAverage : 5;
                    }
                });
            }
        }         
    }); 
}

function pagination() { 
    activeClass(pageBtns); // Verifica qual o item ativo
    disabledClass(); // desabilita next e prev ao chegar na ultima e primeira paginas

    // Verifica qual botão clicado e sua ação
    pageBtns.forEach(btn => btn.addEventListener('click', () => { 
        if(btn.id == 'next' && currentPage < pageQuantity) { 
            cardPage = `page-${currentPage += 1}`;
        
        } else if (btn.id == 'prev' && currentPage > 1) {
           cardPage = `page-${currentPage -= 1}`; 

        } else if (btn.classList.contains('pageEnum')) { 
            currentPage = parseInt(btn.querySelector('a').innerText); 
            cardPage = `page-${currentPage}`; 
        }

        activeClass(pageEnuns);
        disabledClass();
        eraseCard(); // apaga os cards clonados ao trocar de pagina
        printCard(); 
        sessionStorage.setItem('cardPage', cardPage);
    }));

    function activeClass(allBtns) { 
        allBtns.forEach(btn => { 
            btn.classList.remove('active'); 
            btn.ariaCurrent = '';
            
            if(btn.innerText == currentPage) {
                btn.classList.add('active');
                btn.ariaCurrent = 'page';
            }
        });
    }

    function disabledClass() {
        let prev =  document.getElementById('prev');
        let next =  document.getElementById('next');

        currentPage > 1 ? prev.classList.remove('disabled') : prev.classList.add('disabled');
        currentPage < 3 ? next.classList.remove('disabled') : next.classList.add('disabled');
    }

    function eraseCard() {
        document.querySelectorAll('.clone').forEach(cloneCard => { 
            if(!cloneCard.classList.contains(`${cardPage}`)) { 
                cloneCard.remove(); 
            }
        });
    }
}



