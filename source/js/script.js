'use strict';

// var pageHeader = document.querySelector('.page-header');
// var headerToggle = document.querySelector('.page-header__toggle');

// pageHeader.classList.remove('page-header--nojs');

// headerToggle.addEventListener('click', function () {
//   if (pageHeader.classList.contains('page-header--closed')) {
//     pageHeader.classList.remove('page-header--closed');
//     pageHeader.classList.add('page-header--opened');
//   } else {
//     pageHeader.classList.add('page-header--closed');
//     pageHeader.classList.remove('page-header--opened');
//   }
// });

var slider = document.querySelector('.slider');
var sliderPuctures = slider.querySelectorAll('.slider__slide');
var sliderButtonLeft = slider.querySelector('.slider__button--left');
var sliderButtonRight = slider.querySelector('.slider__button--right');
var sliderButtons = slider.querySelectorAll('.slider__button');
var sliderThumbsList = slider.querySelector('.slider__list');
var sliderThumbs = slider.querySelectorAll('.slider__item');
var sliderThumbsCurrent = sliderThumbsList.querySelector('.slider__item--current');

var tabs = document.querySelector('.promo__tabs');
var tabslink = tabs.querySelectorAll('.tabs__link');
var tabsElement = tabs.querySelectorAll('.tabs__element');

var similarReviewTemplate = document.querySelector('#reviews')
    .content.querySelector('.reviews__item');
var reviewButton = document.querySelector('.reviews__button');
var reviewList = document.querySelector('.reviews__list');

var modal = document.querySelector('.modal');
var modalform = modal.querySelector('.modal__form');
var modalItem = modal.querySelectorAll('.modal__item');
var modalItemRequired = modal.querySelectorAll('[required]');
var modalInput = modal.querySelectorAll('.modal__input');
var modalClose = modal.querySelector('.modal__close');
var submitButton = modal.querySelector('.modal__button');
var modalName = modal.querySelector('#user-name');
var modalAdvantages = modal.querySelector('#advantages');
var modalDisadvantages = modal.querySelector('#disadvantages');
var modalComment = modal.querySelector('#comment');

var position = {
  getMin: 0,
  getMax: sliderThumbs.length - 1
};

var index = Array.from(sliderThumbs).indexOf(sliderThumbsCurrent);

var sliderTransform = function (direction) {
  if (direction === 'right') {
    if (index >= position.getMax) {
      return;
    }
    if (sliderButtonLeft.classList.contains('slider__button--disabled')) {
      sliderButtonLeft.classList.remove('slider__button--disabled');
    }
    if (index >= position.getMin) {
      index++;
      sliderThumbs[index - 1].classList.remove('slider__item--current');
      sliderPuctures[index - 1].classList.add('slider__slide--hidden');
      sliderThumbs[index].classList.add('slider__item--current');
      sliderPuctures[index].classList.remove('slider__slide--hidden');

      // sliderThumbs = slider.querySelectorAll('.slider__item');
      sliderThumbsCurrent = sliderThumbsList.querySelector('.slider__item--current');
      index = Array.from(sliderThumbs).indexOf(sliderThumbsCurrent);
    }
    if (Array.from(sliderThumbs).indexOf(sliderThumbsCurrent) === position.getMax) {
      sliderButtonRight.classList.add('slider__button--disabled');
    }
  }
  if (direction === 'left') {
    if (index === position.getMin) {
      return;
    }
    if (sliderButtonRight.classList.contains('slider__button--disabled')) {
      sliderButtonRight.classList.remove('slider__button--disabled');
    }
    if (index <= position.getMax) {
      index--;
      sliderThumbs[index + 1].classList.remove('slider__item--current');
      sliderPuctures[index + 1].classList.add('slider__slide--hidden');
      sliderThumbs[index].classList.add('slider__item--current');
      sliderPuctures[index].classList.remove('slider__slide--hidden');

      // sliderThumbs = slider.querySelectorAll('.slider__item');
      sliderThumbsCurrent = sliderThumbsList.querySelector('.slider__item--current');
      index = Array.from(sliderThumbs).indexOf(sliderThumbsCurrent);
    }
    if (index === position.getMin) {
      sliderButtonLeft.classList.add('slider__button--disabled');
    }
  }
};

var onButtonClick = function (evt) {
  if (evt.target.classList.contains('slider__button')) {
    evt.preventDefault();
    var direction = evt.target.classList.contains('slider__button--right') ? 'right' : 'left';
    sliderTransform(direction);
  }
};

var sliderButtonListener = function () {
  sliderButtons.forEach(function (item) {
    item.addEventListener('click', onButtonClick);
  });
};

var onTabClickChange = function (link, element) {
  link.addEventListener('click', function () {
    for (var i = 0; i < tabsElement.length; i++) {
      tabsElement[i].classList.add('tabs__element--hidden');
    }
    for (var j = 0; j < tabslink.length; j++) {
      tabslink[j].classList.remove('tabs__link--active');
    }
    element.classList.remove('tabs__element--hidden');
    link.classList.add('tabs__link--active');
  });
};

for (var i = 0; i < tabslink.length; i++) {
  onTabClickChange(tabslink[i], tabsElement[i]);
}

sliderButtonListener();

var onTumbsClickChange = function (link, element) {
  link.addEventListener('click', function () {
    for (var k = 0; k < sliderPuctures.length; k++) {
      sliderPuctures[k].classList.add('slider__slide--hidden');
    }
    for (var g = 0; g < sliderThumbs.length; g++) {
      sliderThumbs[g].classList.remove('slider__item--current');
    }
    element.classList.remove('slider__slide--hidden');
    link.classList.add('slider__item--current');

    // sliderThumbs = slider.querySelectorAll('.slider__item');
    sliderThumbsCurrent = sliderThumbsList.querySelector('.slider__item--current');
    index = Array.from(sliderThumbs).indexOf(sliderThumbsCurrent);

    if (Array.from(sliderThumbs).indexOf(link) === sliderThumbs.length - 1) {
      sliderButtonRight.classList.add('slider__button--disabled');
    } else {
      sliderButtonRight.classList.remove('slider__button--disabled');
    }

    if (Array.from(sliderThumbs).indexOf(link) === 0) {
      sliderButtonLeft.classList.add('slider__button--disabled');
    } else {
      sliderButtonLeft.classList.remove('slider__button--disabled');
    }
  });
};

for (var j = 0; j < sliderThumbs.length; j++) {
  onTumbsClickChange(sliderThumbs[j], sliderPuctures[j]);
}

reviewButton.addEventListener('click', function () {
  modal.classList.remove('modal--hidden');
});


modalClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modal.classList.add('modal--hidden');
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (!modal.classList.contains('modal--hidden')) {
      modal.classList.add('modal--hidden');
    }
  }
});

var highlightInvalidElement = function (item) {
  item.parentElement.classList.add('modal__item--error');
};

var unhighlightInvalidElement = function (item) {
  item.parentElement.classList.remove('modal__item--error');
};

var onFormInvalid = function (evt) {
  highlightInvalidElement(evt.target);
};

var onElementCheckValidity = function (evt) {
  if (!evt.target.checkValidity()) {
    highlightInvalidElement(evt.target);
  } else {
    unhighlightInvalidElement(evt.target);
  }
};

modalform.addEventListener('invalid', onFormInvalid, true);
modalform.addEventListener('change', onElementCheckValidity);

modalform.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderReview();
  modal.classList.add('modal--hidden');
});

// var ratingList = modal.querySelectorAll('.rating__list');
var ratingItem = modal.querySelectorAll('.rating__item');

var onRatingClickChange = function (target) {
  target.addEventListener('click', function () {
    var indexRating = Array.from(ratingItem).indexOf(target);

    for (var b = ratingItem.length - 1; b > indexRating; b--) {
      if (ratingItem[b].classList.contains('rating__item--selected')) {
        ratingItem[b].classList.remove('rating__item--selected');
      }
    }

    for (var k = 0; k <= indexRating; k++) {
      ratingItem[k].classList.add('rating__item--selected');
    }
  });
};

for (var g = 0; g < ratingItem.length; g++) {
  onRatingClickChange(ratingItem[g]);
}

var createRatingFragment = function () {
  var RatingFragment = document.createDocumentFragment();
  for (var x = 0; x < ratingItem.length; x++) {
    var featureItem = document.createElement('li');
    featureItem.className = ratingItem[x].className;
    featureItem.classList.remove('rating__item--modal');
    featureItem.insertAdjacentHTML('afterbegin', '<svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg"><path d="M8.63145 0L10.5103 5.87336L16.5906 5.87336L11.6716 9.50329L13.5505 15.3766L8.63145 11.7467L3.71242 15.3766L5.59132 9.50329L0.672291 5.87336L6.75254 5.87336L8.63145 0Z"/></svg>');
    // featureItem.insertAdjacentHTML('afterbegin', '<svg width="17" height="16"><use link:href="img/sprite_auto.svg#icon-rating-star"></use></svg>');
    RatingFragment.appendChild(featureItem);
  }
  return RatingFragment;
};

var renderReview = function () {
  var reviewItem = similarReviewTemplate.cloneNode(true);

  reviewItem.querySelector('.reviews__author')
      .textContent = modalName.value;
  reviewItem.querySelector('.reviews__description--advantages')
      .textContent = modalAdvantages.value;
  reviewItem.querySelector('.reviews__description--disadvantages')
      .textContent = modalDisadvantages.value;
  reviewItem.querySelector('.reviews__description--comment')
      .textContent = modalComment.value;
  reviewItem.querySelector('.rating__list').innerHTML = '';
  reviewItem.querySelector('.rating__list').appendChild(createRatingFragment());

  reviewList.appendChild(reviewItem);

  return reviewItem;
};
