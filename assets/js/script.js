// initial data
let cardPage = sessionStorage.cardPage == undefined ? 'page-1' : sessionStorage.cardPage;
let currentPage = parseInt(cardPage.slice(5));
let pageBtns = document.querySelectorAll('.page-item');
let pageEnuns = document.querySelectorAll('.pageEnum');
let pageQuantity = pageEnuns.length;
let maxCard = 12;
let j;
const reducer = (accumulator, curr) => accumulator + curr;

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
        let voteQuantity = 0;
        let votesSum = 0;
        let totalRating;
        let average;
        let roundedAvg;
        let votes = [movie.review.one, movie.review.two, movie.review.three, movie.review.four, movie.review.five];

        // verifica se o item no objeto pertence a pagina e delimita a quantidade de impressão
        if (movie.page == cardPage && clonesQuantity < maxCard) {
            document.querySelector('.row').append(cloneCard);

            // insere as informações dos cards clonados
            cloneCard.classList.add('clone');
            cloneCard.classList.add(`${movie.page}`);
            cardTitle.innerHTML = movie.title;
            cardImg.src = movie.img;
            cardImg.alt = movie.title;

            updateReview(movie.id);

            rateBtn.setAttribute('data-movie-id', movie.id);
            rateBtn.addEventListener('click', () => {
                sessionStorage.setItem("id", rateBtn.getAttribute('data-movie-id')); // salva no navegador o id do card avaliado p/ construção do form
                sessionStorage.setItem("cardPage", cardPage);
                window.open('form.html');
            });

            // atualiza votos ao avaliar filme
            if (localStorage.votes) {
                let userVote = localStorage.votes.split('-');

                userVote.forEach(e => {
                    let ratedMovieId = e.split('#')[0];
                    let starWeight = parseInt(e.split('#')[1]);
                    updateReview(ratedMovieId, starWeight)
                });
            }
        }

        function updateReview(formMovie, sWeight) {
            if (formMovie == movie.id.toString()) {
                voteQuantity += 1;

                for (j = 0; j < 5; j++) {
                    votesSum += sWeight == j + 1 ? (voteQuantity + votes[j]) * (j + 1) : votes[j] * (j + 1);
                }

                average = (votesSum / 15) < 5 ? (votesSum / 15) : 5
                totalRating = votes.reduce(reducer) + voteQuantity - 1;

                rating.innerHTML = average.toFixed(1);
                pCard.innerHTML = `${totalRating} avaliações`;
                votesSum = 0;

                roundedAvg = Math.floor(average);
                updateStars(roundedAvg);
                return roundedAvg;
            }
        }

        function updateStars(avg) {
            for (j = 0; j < 5; j++) {
                switch (avg) {
                    default:
                        cardStars[j].src = "assets/img/star-empty.svg";
                        break;
                    case 1:
                        cardStars[j].src = j > 0 ? "assets/img/star-empty.svg" : cardStars[j].src = "assets/img/star-full.svg";
                        break;
                    case 2:
                        cardStars[j].src = j < 2 ? "assets/img/star-full.svg" : cardStars[j].src = "assets/img/star-empty.svg";
                        break;
                    case 3:
                        cardStars[j].src = j < 3 ? "assets/img/star-full.svg" : cardStars[j].src = "assets/img/star-empty.svg";
                        break;
                    case 4:
                        cardStars[j].src = j < 4 ? "assets/img/star-full.svg" : cardStars[j].src = "assets/img/star-empty.svg";
                        break;
                    case 5:
                        cardStars[j].src = "assets/img/star-full.svg";
                        break;
                }
            }
        }
    });
}

function pagination() {
    activeClass(pageBtns); // Verifica qual o item ativo
    disabledClass(); // desabilita next e prev ao chegar na ultima e primeira paginas

    // Verifica qual botão clicado e sua ação
    pageBtns.forEach(btn => btn.addEventListener('click', () => {
        if (btn.id == 'next' && currentPage < pageQuantity) {
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

            if (btn.innerText == currentPage) {
                btn.classList.add('active');
                btn.ariaCurrent = 'page';
            }
        });
    }

    function disabledClass() {
        let prev = document.getElementById('prev');
        let next = document.getElementById('next');

        currentPage > 1 ? prev.classList.remove('disabled') : prev.classList.add('disabled');
        currentPage < 3 ? next.classList.remove('disabled') : next.classList.add('disabled');
    }

    function eraseCard() {
        document.querySelectorAll('.clone').forEach(cloneCard => {
            if (!cloneCard.classList.contains(`${cardPage}`)) {
                cloneCard.remove();
            }
        });
    }
}



