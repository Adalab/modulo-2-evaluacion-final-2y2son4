'use strict';
const apiUrl = 'http://api.tvmaze.com/search/shows?q=';
const noImageUrlText = 'Image not found';
const noImageUrl = `https://via.placeholder.com/210x295/ffffff/666666/?text=${noImageUrlText}`;
// const noImageUrlFavorite = `https://via.placeholder.com/125x175/ffffff/666666/?text=${noImageUrlText}`;
const formElement = document.querySelector('.js-form');
const searchInputElement = document.querySelector('.js-search-input');
const searchBtnElement = document.querySelector('.js-search-btn');
const listElement = document.querySelector('.js-list');

let series = [];
// let favorites = [];

// prevent submit form
function handleForm(ev) {
  ev.preventDefault();
}

formElement.addEventListener('submit', handleForm);

// fetch data from API:
function getDataFromApi() {
  const search = searchInputElement.value;
  fetch(apiUrl + search)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      paintCards();
    });
}

searchBtnElement.addEventListener('click', getDataFromApi);

// paint card:
function paintCards() {
  let htmlCode;
  for (const serie of series) {
    htmlCode += '<article class="page__card">';
    htmlCode += '<li class="js-list-element">';
    htmlCode += `<h2 class="page__card--title">${serie.show.name}</h2>`;
    if (serie.show.image === null) {
      htmlCode += `<img class="js-image page__card--img" src="${noImageUrl}" alt="${serie.show.name}" />`;
    } else {
      htmlCode += `<img class="js-image page__card--img" src="${serie.show.image.medium}" alt="${serie.show.name}" />`;
    }
    htmlCode += '</li>';
    htmlCode += '</article>';
  }
  listElement.innerHTML = htmlCode;
}

getDataFromApi();
