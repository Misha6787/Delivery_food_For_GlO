'use strict';

const   cartButton = document.querySelector("#cart-button"),
        modal = document.querySelector(".modal"),
        close = document.querySelector(".close"),
        buttonAuth = document.querySelector('.button-auth'),
        modalAuth = document.querySelector('.modal-auth'),
        closeAuth = document.querySelector('.close-auth'),
        logInForm = document.querySelector('#logInForm'),
        loginInput = document.querySelector('#login'),
        userName = document.querySelector('.user-name'),
        buttonOut = document.querySelector('.button-out'),
        closePlsAuth = document.querySelector('.close-pls-auth '),
        closePls = document.querySelector('.close-pls'),
        cardsRestaurants = document.querySelector('.cards-restaurants'),
        containerPromo = document.querySelector('.container-promo'),
        restaurants = document.querySelector('.restaurants'),
        menu = document.querySelector('.menu'),
        logo = document.querySelector('.logo'),
        cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');

function closeimg() {
  closePls.style.display = 'none';
};

function toggleModal() {
  modal.classList.toggle("is-open");
};

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
};

function authorized() {

  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery')
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = ''; 
    buttonOut.removeEventListener('click', logOut);
    checkAuth();
  };

  console.log('авторизован');

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block'; 

  buttonOut.addEventListener('click', logOut);
};

function notAuthorized() {
  console.log('не авторизован');

function logIn(event) {
  if(loginInput.value === '') {
    closePls.style.display = 'block';
    modalAuth.classList.toggle('is-open');
    };

  event.preventDefault();
  login = loginInput.value;

  localStorage.setItem('gloDelivery', login);

  toggleModalAuth();
  buttonAuth.removeEventListener('click', toggleModalAuth);
  closeAuth.removeEventListener('click', toggleModalAuth);
  logInForm.removeEventListener('submit', logIn);
  logInForm.reset();
  checkAuth();
}
buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);
logInForm.addEventListener('submit', logIn);

};

function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
};

function createCardRestaurant() {
  const card = `
    <a class="card card-restaurant">
	  					<img src="img/palki-skalki/preview.jpg" alt="image" class="card-image"/>
	  					<div class="card-text">
	  						<div class="card-heading">
	  							<h3 class="card-title">Палки скалки</h3>
	  							<span class="card-tag tag">55 мин</span>
	  						</div>
	  						<div class="card-info">
	  							<div class="rating">
	  								4.5
	  							</div>
	  							<div class="price">От 500 ₽</div>
	  							<div class="category">Пицца</div>
	  						</div>
	  					</div>
	  				</a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);

};

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
						<img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Классика</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
									грибы.
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">510 ₽</strong>
							</div>
						</div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);
};

function openGoods(event) {
  const target = event.target;

  const restaurant = target.closest('.card-restaurant');

  if (restaurant) {
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    cardsMenu.textContent = '';

    createCardGood();
    createCardGood();
    createCardGood();
  };
  
  if(!login) {
    toggleModalAuth();
  };
};

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function() {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

closePlsAuth.addEventListener('click', closeimg);

checkAuth();

// Временные вызовы, в качестве заглушек 
createCardRestaurant();
createCardRestaurant();
createCardRestaurant();