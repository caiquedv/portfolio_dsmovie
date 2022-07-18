// initial data
let cardPage = sessionStorage.cardPage == undefined ? 'page-1' : sessionStorage.cardPage;
let currentPage = parseInt(cardPage.slice(5)); 
let pageBtns = document.querySelectorAll('.page-item'); 
let pageEnuns = document.querySelectorAll('.pageEnum'); 
let pageQuantity = pageEnuns.length;
let maxCard = 12; 
let j;

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
        let cardStars = cloneCard.querySelectorAll('.card-description-bottom img');
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

            // atualiza votos ao avaliar filme
            if(localStorage.votes) {
                let userVote = localStorage.votes.split('-');
                let voteQuantity = 0;
                let ratedMovieId;
                let stars = [1, 2, 3, 4, 5];  
                let votesSum = 0;       
                let totalRating;  
                let average;     

                userVote.forEach(e => {
                    let vote = e.split('#');
                    ratedMovieId = vote[0];

                    if(ratedMovieId == movie.id.toString()) { 
                        voteQuantity += ratedMovieId == movie.id ? 1 : 0;
                        starWeight = parseInt(e.split('#')[1]);

                        votesSum += starWeight == 1 ? (voteQuantity + movie.review.one) * stars[0] : movie.review.one * stars[0];
                        votesSum += starWeight == 2 ? (voteQuantity + movie.review.two) * stars[1] : movie.review.two * stars[1];
                        votesSum += starWeight == 3 ? (voteQuantity + movie.review.three) * stars[2] : movie.review.three * stars[2];
                        votesSum += starWeight == 4 ? (voteQuantity + movie.review.four) * stars[3] : movie.review.four * stars[3];
                        votesSum += starWeight == 5 ? (voteQuantity + movie.review.five) * stars[4] : movie.review.five * stars[4];
                        
                        average = (votesSum / 15) < 5 ? (votesSum / 15) : 5
                        totalRating = parseInt(pCard.innerText.split(' ')[0]) + 1;
                        rating.innerHTML = average.toFixed(1);
                        pCard.innerHTML = `${totalRating} avaliações`;
                        // console.log(average)
                        votesSum = 0;

                        let roundedAvg = Math.floor(average);     
                        updateStars(roundedAvg); 
                    }
                });   
            }
        } 
        function updateStars(avg) {
            // atualiza as estrelas
            switch(avg) {
                case 1: 
                    console.log('ok')
                    cardStars[0].src = "assets/img/star-full.svg";
                    cardStars[1].src = "assets/img/star-empty.svg";
                    cardStars[2].src = "assets/img/star-empty.svg";
                    cardStars[3].src = "assets/img/star-empty.svg";
                    cardStars[4].src = "assets/img/star-empty.svg";
                    break;
                case 2:
                    console.log('ok')
                    cardStars[0].src = "assets/img/star-full.svg";
                    cardStars[1].src = "assets/img/star-full.svg";
                    cardStars[2].src = "assets/img/star-empty.svg";
                    cardStars[3].src = "assets/img/star-empty.svg";
                    cardStars[4].src = "assets/img/star-empty.svg";
                    break;
                case 3:
                    console.log('ok')
                    cardStars[0].src = "assets/img/star-full.svg";
                    cardStars[1].src = "assets/img/star-full.svg";
                    cardStars[2].src = "assets/img/star-full.svg";
                    cardStars[3].src = "assets/img/star-empty.svg";
                    cardStars[4].src = "assets/img/star-empty.svg";
                    break;
                case 4:
                    console.log('ok')
                    cardStars[0].src = "assets/img/star-full.svg";
                    cardStars[1].src = "assets/img/star-full.svg";
                    cardStars[2].src = "assets/img/star-full.svg";
                    cardStars[3].src = "assets/img/star-full.svg";
                    cardStars[4].src = "assets/img/star-empty.svg";
                    break;
                case 5:
                    console.log('ok')
                    cardStars[0].src = "assets/img/star-full.svg";
                    cardStars[1].src = "assets/img/star-full.svg";
                    cardStars[2].src = "assets/img/star-full.svg";
                    cardStars[3].src = "assets/img/star-full.svg";
                    cardStars[4].src = "assets/img/star-full.svg";
                    break;
                    default:
                        console.log(average)
                    cardStars[0].src = "assets/img/star-empty.svg";
                    cardStars[1].src = "assets/img/star-empty.svg";
                    cardStars[2].src = "assets/img/star-empty.svg";
                    cardStars[3].src = "assets/img/star-empty.svg";
                    cardStars[4].src = "assets/img/star-empty.svg";
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



