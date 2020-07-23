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
var sliderThumbs = slider.querySelectorAll('.slider__item');

var tabs = document.querySelector('.promo__tabs');
var tabslink = tabs.querySelectorAll('.tabs__link');
var tabsElement = tabs.querySelectorAll('.tabs__element');

var position = {
  getMin: 0,
  getMax: sliderThumbs.length - 1
};

var sliderPosition = 0;

var sliderTransform = function (direction) {
  if (direction === 'right') {
    if (sliderPosition >= position.getMax) {
      return;
    }
    if (sliderButtonLeft.classList.contains('slider__button--disabled')) {
      sliderButtonLeft.classList.remove('slider__button--disabled');
    }
    if (sliderPosition >= position.getMin) {
      sliderPosition++;
      sliderThumbs[sliderPosition - 1].classList.remove('slider__item--current');
      sliderPuctures[sliderPosition - 1].classList.add('slider__slide--hidden');
      sliderThumbs[sliderPosition].classList.add('slider__item--current');
      sliderPuctures[sliderPosition].classList.remove('slider__slide--hidden');

    }
    if (sliderPosition === position.getMax) {
      sliderButtonRight.classList.add('slider__button--disabled');
    }
  }
  if (direction === 'left') {
    if (sliderPosition === position.getMin) {
      return;
    }
    if (sliderButtonRight.classList.contains('slider__button--disabled')) {
      sliderButtonRight.classList.remove('slider__button--disabled');
    }
    if (sliderPosition <= position.getMax) {
      sliderPosition--;
      sliderThumbs[sliderPosition + 1].classList.remove('slider__item--current');
      sliderPuctures[sliderPosition + 1].classList.add('slider__slide--hidden');
      sliderThumbs[sliderPosition].classList.add('slider__item--current');
      sliderPuctures[sliderPosition].classList.remove('slider__slide--hidden');
    }
    if (sliderPosition === position.getMin) {
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
