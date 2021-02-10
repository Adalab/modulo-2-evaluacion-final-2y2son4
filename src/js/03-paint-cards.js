/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

// paint search card:
function paintSearchCards() {
  let htmlCode = '<ul class="main__list">';
  let favClass;
  for (const show of shows) {
    // find if the show is already in the favoriteShows array
    const isInFav = favoriteShows.find((favShow) => favShow.show.id === show.show.id);
    if (isInFav === undefined) {
      favClass = '';
    } else {
      favClass = ' card--favorite';
    }
    // paint HTML code
    htmlCode += `<li class="main__list--element js-list-element${favClass}" id="${show.show.id}">`;
    if (show.show.officialSite === null) {
      htmlCode += `<h2 class="main__card--title">${show.show.name}</h2>`;
    } else {
      htmlCode += '<h2 class="main__card--title">';
      htmlCode += `<a class="main__card--link" href="${show.show.officialSite}" target="_blank" title="${show.show.name} official site">${show.show.name}</a>`;
      htmlCode += '</h2>';
    }

    if (show.show.image === null) {
      htmlCode += `<img class="js-image main__card--img" src="${noImageSrc}" alt="${show.show.name}" />`;
    } else {
      htmlCode += `<img class="js-image main__card--img" src="${show.show.image.medium}" alt="${show.show.name}" />`;
    }

    if (show.show.rating.average === null) {
      htmlCode += '<span class="page__card--rating">-- / 10</span>';
    } else {
      htmlCode += `<span class="page__card--rating">${show.show.rating.average} / 10</span>`;
    }
    htmlCode += '</li>';
  }
  htmlCode += '</ul>';

  removeListenShowEvents();

  const listElement = document.querySelector('.js-search-shows');
  listElement.innerHTML = htmlCode;

  // listen to event after painting
  listenShowEvents();
}

// paint Favorite shows cards
function paintFavoriteCards() {
  // paint HTML code
  let hiddenClass;
  if (favoriteShows.length === 0) {
    hiddenClass = ' hidden';
  } else {
    hiddenClass = '';
  }
  let htmlCode = `<div class="main__favorite${hiddenClass}">`;
  htmlCode += '<button class="js-reset-btn main__favorite--btn">Clean favorites</button>';
  htmlCode += '<ul class="main__list--fav js-list-favorites">';

  // add/remove hidden CSS class for un/favorited shows
  for (const favoriteShow of favoriteShows) {
    htmlCode += `<li class="js-list-element-favorite main__list--lifav" id="${favoriteShow.show.id}">`;
    htmlCode += `<h3 class="page__card--title">${favoriteShow.show.name}</h3>`;

    if (favoriteShow.show.image === null) {
      htmlCode += `<img class="js-image page__card--img" src="${noImageSrcFavorite}" alt="${favoriteShow.show.name}" />`;
    } else {
      htmlCode += `<img class="js-image page__card--img" src="${favoriteShow.show.image.medium}" alt="${favoriteShow.show.name}" />`;
    }
    htmlCode += '</li>';
  }
  htmlCode += '</ul>';
  htmlCode += '</div>';

  removeListenReset();
  removeListenFavoriteShowEvents();

  const listFavoriteElement = document.querySelector('.js-favorite-shows');
  listFavoriteElement.innerHTML = htmlCode;

  // listen to event after painting
  listenFavoriteShowEvents();
  listenResetBtn();
  setInLocalStorage();
}
