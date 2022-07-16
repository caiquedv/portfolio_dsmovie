let formItemId = localStorage.getItem("id");

document.querySelector('.card img').src = moviesJson[formItemId].img;
document.querySelector('.card img').alt = moviesJson[formItemId].title;
document.querySelector('.card h3').innerHTML = moviesJson[formItemId].title;