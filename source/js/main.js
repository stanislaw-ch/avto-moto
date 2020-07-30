'use strict';

(function () {
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

  var similarReviewTemplate = document.querySelector('#reviews').content.querySelector('.reviews__item');
  var reviewButton = document.querySelector('.reviews__button');
  var reviewList = document.querySelector('.reviews__list');

  var modal = document.querySelector('.modal');
  var modalform = modal.querySelector('.modal__form');
  var modalClose = modal.querySelector('.modal__close');
  var modalName = modal.querySelector('#user-name');
  var modalAdvantages = modal.querySelector('#advantages');
  var modalDisadvantages = modal.querySelector('#disadvantages');
  var modalComment = modal.querySelector('#comment');
  var modalRating = modal.querySelectorAll('.rating__item');

  // console.log(modalRating);

  var index = Array.from(sliderThumbs).indexOf(sliderThumbsCurrent);

  var ratingItem = modal.querySelectorAll('.rating__item');

  var Position = {
    GET_MIN: 0,
    GET_MAX: sliderThumbs.length - 1
  };

  function storageAvailable(type) {
    try {
      var storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Отслеживает клики на кнопки слайдера
   */
  var sliderButtonListener = function () {
    sliderButtons.forEach(function (item) {
      item.addEventListener('click', onButtonClick);
    });
  };

  /**
   * Определяет и передает направление по клику на кнопоку слайдера
   * @param {object} evt
   */
  var onButtonClick = function (evt) {
    if (evt.target.classList.contains('slider__button')) {
      evt.preventDefault();
      var direction = evt.target.classList.contains('slider__button--right') ? 'right' : 'left';
      sliderTransform(direction);
    }
  };

  /**
   * Обрабатывает клики на кнопки слайдера
   * @param {object} direction
   */
  var sliderTransform = function (direction) {
    if (direction === 'right') {
      if (index >= Position.GET_MAX) {
        return;
      }
      if (sliderButtonLeft.classList.contains('slider__button--disabled')) {
        sliderButtonLeft.classList.remove('slider__button--disabled');
      }
      if (index >= Position.GET_MIN) {
        index++;
        sliderThumbs[index - 1].classList.remove('slider__item--current');
        sliderPuctures[index - 1].classList.add('slider__slide--hidden');
        sliderThumbs[index].classList.add('slider__item--current');
        sliderPuctures[index].classList.remove('slider__slide--hidden');

        sliderThumbsCurrent = sliderThumbsList.querySelector('.slider__item--current');
        index = Array.from(sliderThumbs).indexOf(sliderThumbsCurrent);
      }
      if (Array.from(sliderThumbs).indexOf(sliderThumbsCurrent) === Position.GET_MAX) {
        sliderButtonRight.classList.add('slider__button--disabled');
      }
    }
    if (direction === 'left') {
      if (index === Position.GET_MIN) {
        return;
      }
      if (sliderButtonRight.classList.contains('slider__button--disabled')) {
        sliderButtonRight.classList.remove('slider__button--disabled');
      }
      if (index <= Position.GET_MAX) {
        index--;
        sliderThumbs[index + 1].classList.remove('slider__item--current');
        sliderPuctures[index + 1].classList.add('slider__slide--hidden');
        sliderThumbs[index].classList.add('slider__item--current');
        sliderPuctures[index].classList.remove('slider__slide--hidden');

        sliderThumbsCurrent = sliderThumbsList.querySelector('.slider__item--current');
        index = Array.from(sliderThumbs).indexOf(sliderThumbsCurrent);
      }
      if (index === Position.GET_MIN) {
        sliderButtonLeft.classList.add('slider__button--disabled');
      }
    }
  };

  /**
   * Обрабатывает клики по миниатюрам слайдера
   * @param {object} onClickTumb
   * @param {object} hideSlide
   */
  var onTumbsClickChange = function (onClickTumb, hideSlide) {
    onClickTumb.addEventListener('click', function () {
      for (var i = 0; i < sliderPuctures.length; i++) {
        sliderPuctures[i].classList.add('slider__slide--hidden');
      }
      for (var j = 0; j < sliderThumbs.length; j++) {
        sliderThumbs[j].classList.remove('slider__item--current');
      }
      hideSlide.classList.remove('slider__slide--hidden');
      onClickTumb.classList.add('slider__item--current');

      sliderThumbsCurrent = sliderThumbsList.querySelector('.slider__item--current');
      index = Array.from(sliderThumbs).indexOf(sliderThumbsCurrent);

      if (Array.from(sliderThumbs).indexOf(onClickTumb) === sliderThumbs.length - 1) {
        sliderButtonRight.classList.add('slider__button--disabled');
      } else {
        sliderButtonRight.classList.remove('slider__button--disabled');
      }

      if (Array.from(sliderThumbs).indexOf(onClickTumb) === 0) {
        sliderButtonLeft.classList.add('slider__button--disabled');
      } else {
        sliderButtonLeft.classList.remove('slider__button--disabled');
      }
    });
  };

  /**
   * Делает активным таб по клику
   * @param {object} onClickTab
   * @param {object} hideTab
   */
  var onTabClickChange = function (onClickTab, hideTab) {
    onClickTab.addEventListener('click', function () {
      for (var i = 0; i < tabsElement.length; i++) {
        tabsElement[i].classList.add('tabs__element--hidden');
      }
      for (var j = 0; j < tabslink.length; j++) {
        tabslink[j].classList.remove('tabs__link--active');
      }
      hideTab.classList.remove('tabs__element--hidden');
      onClickTab.classList.add('tabs__link--active');
    });
  };

  /**
   * Добавляет класс с ошибкой для поля ввода
   * @param {object} item
   */
  var highlightInvalidElement = function (item) {
    item.parentElement.classList.add('modal__item--error');
  };


  /**
   * Удаляет класс с ошибкой для поля ввода
   * @param {object} item
   */
  var unhighlightInvalidElement = function (item) {
    item.parentElement.classList.remove('modal__item--error');
  };

  /**
   * Передает объект не прошедшего валидацию
   * @param {object} evt
   */
  var onFormInvalid = function (evt) {
    highlightInvalidElement(evt.target);
  };

  /**
   * Обрабатывает изменения поля ввода и проеверяет его на валидность
   * @param {object} evt
   */
  var onElementCheckValidity = function (evt) {
    if (!evt.target.checkValidity()) {
      highlightInvalidElement(evt.target);
    } else {
      unhighlightInvalidElement(evt.target);
    }
  };

  /**
   * Возвращает список с рейтингом отзыва, переданного пользователем
   * @return {object} RatingFragment
   */
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

  /**
   * Добавляет новый отзыв,
   * @return {object} RatingFragment
   */
  var renderReview = function () {
    var reviewItem = similarReviewTemplate.cloneNode(true);

    reviewItem.querySelector('.reviews__item h3')
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

    console.log(reviewObjectList[0].name);

    return reviewItem;
  };

  /**
   * Обрабатывает клики по рейтингу отзыва
   * @param {object} target
   */
  var onRatingClickChange = function (target) {
    target.addEventListener('click', function () {
      var indexRating = Array.from(ratingItem).indexOf(target);

      for (var i = ratingItem.length - 1; i > indexRating; i--) {
        if (ratingItem[i].classList.contains('rating__item--selected')) {
          ratingItem[i].classList.remove('rating__item--selected');
        }
      }

      for (var j = 0; j <= indexRating; j++) {
        ratingItem[j].classList.add('rating__item--selected');
      }
    });
  };

  // Передает элемет миниатюр слайдера по клику
  for (var i = 0; i < sliderThumbs.length; i++) {
    onTumbsClickChange(sliderThumbs[i], sliderPuctures[i]);
  }

  // Передает элемет таба по клику
  for (var j = 0; j < tabslink.length; j++) {
    onTabClickChange(tabslink[j], tabsElement[j]);
  }

  // Передает элемет рейтинга по клику
  for (var k = 0; k < ratingItem.length; k++) {
    onRatingClickChange(ratingItem[k]);
  }

  sliderButtonListener();

  modalform.addEventListener('invalid', onFormInvalid, true);
  modalform.addEventListener('change', onElementCheckValidity);

  reviewButton.addEventListener('click', function () {
    document.querySelector('body').style.overflow = 'hidden';
    modal.classList.remove('modal--hidden');

    if (storageAvailable('localStorage')) {
      localStorage.getItem('name');
      localStorage.getItem('advantages');
      localStorage.getItem('disadvantages');
      localStorage.getItem('comment');
      localStorage.getItem('rating');
    }

    modalName.focus();
  });

  modalClose.addEventListener('click', function () {
    modal.classList.add('modal--hidden');
    document.querySelector('body').style.overflow = 'visible';
  });

  modal.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('modal')) {
      modal.classList.add('modal--hidden');
      document.querySelector('body').style.overflow = 'visible';
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (!modal.classList.contains('modal--hidden')) {
        modal.classList.add('modal--hidden');
        document.querySelector('body').style.overflow = 'visible';
      }
    }
  });

  var reviewArr = [];
  var reviewObjectList = {};

  var getReviewObject = function (localData) {
    var reviewObject = {};
    for (var q = 1; q < localData.length - 1; q++) {
      var key = localData.key(q);
      reviewObject[key] = localData.getItem(key);
    }
    reviewArr.push(reviewObject);
    reviewObjectList = Object.assign({}, reviewArr);

    console.log(reviewObjectList);
    return reviewObjectList;
  };

  // renderReview(localStorage);

  modalform.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (storageAvailable('localStorage')) {
      localStorage.setItem('name', modalName.value);
      localStorage.setItem('advantages', modalAdvantages.value);
      localStorage.setItem('disadvantages', modalDisadvantages.value);
      localStorage.setItem('comment', modalComment.value);
      localStorage.setItem('rating', modalRating);

      getReviewObject(localStorage);
    }
    for (var g = 0; g < ratingItem.length; g++) {
      ratingItem[g].classList.remove('rating__item--selected');
    }
    // console.log(localStorage);
    renderReview();
    modal.classList.add('modal--hidden');
    document.querySelector('body').style.overflow = 'visible';
  });

  // console.log(a);
})();
