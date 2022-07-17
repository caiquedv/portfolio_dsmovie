// Initial data
let movieId = sessionStorage.getItem("id");
let form = document.querySelector('form');
let emailInput = form.querySelector('input');
let voteInput = form.querySelector('select');
let i;

// Events
    // insere as informações no card
document.querySelector('.card img').src = moviesJson[movieId].img;
document.querySelector('.card img').alt = moviesJson[movieId].title;
document.querySelector('.card h3').innerHTML = moviesJson[movieId].title;

nativeValidation();

// functions
function nativeValidation() {
    form.addEventListener('submit', (event) => { // Validação nativa do formulário
        event.preventDefault();
        clearErrors(); 
    
        let send = true;
        let check = checkInput(); 
       
        if(check !== true) { 
            send = false;
            showError(emailInput, check); 
        }
        
        if(send) { 
            localStorage.setItem("votes", `${localStorage.votes}-${movieId}#${voteInput.value}`);
            opener.location.reload(); 
            window.alert('Obrigado pelo seu voto!');
            // form.submit();
            window.close();            
        }
    });
}

function checkInput() { //verifica se o input foi preenchico corretamente
    let rules = emailInput.getAttribute('data-rules').split('|');
    
    for(i in rules) {
        switch(rules[i]) {
            case 'required':
                if(emailInput.value == '') {
                    return 'Campo não pode ser vazio!';
                }
            break;

            case 'email':
                if(emailInput.value != '') {
                    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    
                    if(!regex.test(emailInput.value.toLowerCase())) {
                        return 'E-mail digitado não é válido!';
                    }
                }
            break;
        }
    }

    return true;
}

function showError(input, error) { 
    input.style.borderColor = '#FF0000';

    let errorElement = document.createElement('div');

    errorElement.classList.add('error');
    errorElement.innerHTML = error;
    input.parentElement.insertBefore(errorElement, input.ElementSibling);
}

function clearErrors() { 
    let errorElements = document.querySelectorAll('.error');
    let errorQuantity = errorElements.length;
    
    for(i = 0 ; i < errorQuantity; i++) {
        errorElements[i].remove();
    }
}
