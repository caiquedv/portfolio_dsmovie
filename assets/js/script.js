// initial data
let page = 'id-1'; // pagina atual
let currentPage = parseInt(page.slice(3)); // numero da pagina atual
let pageItem = document.querySelectorAll('.page-item'); // array com os elementos da paginação
let pageEnum = document.querySelectorAll('.pageEnum'); // array com os numeros da paginação
let maxCards = 12; // quantidade de cards exibidos por pagina

// events
printCard(); // imprime os cards na tela
pagination(); // ativa a navegação da pagina

// functions
function printCard() {
    // p/ cada item no objeto
    moviesJson.map((item) => {
        let cardItem = document.querySelector('.cardItem').cloneNode(true); // cria modelo de card clonado
        let clonesQuantity = document.querySelectorAll('.clone').length; // conta a quantidade de clones criados

        // se o id for o mesmo da pagina e a quantidade de clones criados for menor que o maximo da pagina
        if(item.id == page && clonesQuantity < maxCards ) { // verifica se o item no objeto pertence a pagina e delimita a quantidade de impressão
            document.querySelector('.row').append(cardItem); // insere o clone do card no html
            // insere as informações dos cards clonados
            cardItem.classList.add('clone'); // insere a classe que identifica como clone
            cardItem.classList.add(`${item.id}`); // insere o id que identifica o numero da pagina a que pertence
            cardItem.querySelector('h3').innerHTML = item.title; // insere o titulo 
            cardItem.querySelector('.card img').src = item.img; // insere a img 
            cardItem.querySelector('.card img').alt = item.title; // insere o texto alternativo da img
        }         
    });
}

function pagination() {
   // no array de itens da paginação adiciona evento de click em cada item 
    pageItem.forEach(e => e.addEventListener('click', () => { 
        if(e.id == 'next' && currentPage < pageEnum.length) { // se ao clicar no botao next não for a ultima pagina
            page = `id-${currentPage += 1}`; // altera o numero da pagina para a proxima
            
            activeClass(pageEnum, pageItem[currentPage]); // muda a classe active do elemento atual para o proximo

        } else if (e.id == 'prev' && currentPage > 1) { // se ao clicar no botao anterior não for a primeira pagina
           page = `id-${currentPage -= 1}`; // altera o numero da pagina para a proxima

           activeClass(pageEnum, pageItem[currentPage]); // muda a classe active do elemento atual para o proximo

        } else if(e.classList.contains('pageEnum')) { // se ao clicar no item, ele for um dos numeros
            // pagina atual é igual ao texto dentro da tag ancora dentro do item atual, convertido em inteiro
            currentPage = parseInt(e.querySelector('a').innerText); 
            page = `id-${currentPage}`; // altera o numero da pagina de acordo com o numero clicado

            activeClass(pageEnum, e); // // muda a classe active do elemento atual para o clicado
        }

      
        disabledClass(); // insere a classe disabled em next e prev
        eraseCard(); // apaga os cards clonados
        printCard(); // imprime os novos cards clonados
    }));

    function activeClass(itemRemove, itemAdd) { 
        itemRemove.forEach(e => { // p cada elemento no array de pagição
            e.classList.remove('active'); // remove a classe active
            e.ariaCurrent = ''; // remove aria-current
        });

        itemAdd.classList.add('active'); // no elemento atual insere a classe active
        itemAdd.ariaCurrent = 'page' // no elemento atual insere aria-current
    }

    function disabledClass() {
        let prev =  document.getElementById('prev') // botao proximo
        let next =  document.getElementById('next') // botao anterior

        //remove e adiciona disabled nos botoes next e prev quando entra e sai da primeira e ultima pagina
        // se não for a primeira pagina -> remova disabled -> se for adicione disabled
        currentPage > 1 ? prev.classList.remove('disabled') : prev.classList.add('disabled');
        // se não for a ultima pagina -> remova disabled -> se for adicione disabled
        currentPage < 3 ? next.classList.remove('disabled') : next.classList.add('disabled');
    }

    function eraseCard() {
        let clones = document.querySelectorAll('.clone');

        clones.forEach(e => { // p cada item no array de clones
            if(!e.classList.contains(`${page}`)) { // se o item não contem a classe pagina(se ele não pertence a pagina)
                e.remove(); // remova-o
            }
        });
    }
}