// Selecting DOM elements
const overlay = document.querySelector(".overlay");
const mainImage = document.querySelector(".product__img");
const mainImageModal = document.querySelector(".modal__img");
const smallImages = document.querySelectorAll(".product__img--item");
const smallImagesModal = document.querySelectorAll(".modal__img--item");
const imageList = document.querySelector(".product__img--list");
const imageListModal = document.querySelector(".modal__img--list");
const btnClose = document.querySelector(".btn-close");
const btnNext = document.querySelector(".btn--next");
const btnPrev = document.querySelector(".btn--prev");
const modal = document.querySelector(".modal");
const unitPriceEl = document.querySelector(".price--new");
const titleEl = document.querySelector(".product__title");
const qtyEl = document.querySelector(".quantity");
const btnCta = document.querySelector(".btn-cta");
const cartEl = document.querySelector(".cart__list");
const cartNum = document.querySelector(".cart__num");
const quantityContainer = document.querySelector(".product__qty");
const cartMain = document.querySelector(".cart");
const btnMobileNav = document.querySelector(".btn-mobile-nav");
const nav = document.querySelector(".nav");
const headerEl = document.querySelector(".header");
const mainBtnPrev = document.querySelector(".main-btn--prev");
const mainBtnNext = document.querySelector(".main-btn--next");
const btnCart = document.querySelector(".cart--btn");
const container = document.querySelector(".container");

let modalPage = 1;
let mainPage = 1;

// To set the active class on current display
const setCurrentDisplay = function (imgArr, imgNum) {
  imgArr.forEach((img) => img.classList.remove("img--active"));
  const currentDisplay = Array.from(imgArr).find(
    (img) => img.dataset.img == imgNum
  );
  currentDisplay.classList.add("img--active");
};

// To Preview an image on the main Preview
const setMainPreview = function (mainImage, imgNum) {
  mainImage.src = `../images/image-product-${imgNum}.jpg`;
  mainImage.dataset.display = imgNum;
};

// Event listeners
// Add an event listener to the body and button to view cart
btnCart.addEventListener("click", function () {
  cartMain.style.display = "block";
});
btnCart.addEventListener("mouseover", function () {
  cartMain.style.display = "block";
  btnCart.addEventListener("mouseout", function () {
    cartMain.style.display = "none";
  });
});
document.body.addEventListener("click", function (e) {
  // console.log(e.target);
  if ((e.target === cartMain) & (e.target === btnCart)) {
    e.stopPropagation();
    return;
  }
  if (e.target.closest(".container")) {
    cartMain.style.display = "none";
  }
});

// Toggle the mobile navigation sidebar
btnMobileNav.addEventListener("click", function (e) {
  headerEl.classList.toggle("nav-open");
});

// Attach event listener to next button for mobile navigation
mainBtnNext.addEventListener("click", function (e) {
  if (mainPage === 4) mainPage = 1;
  else mainPage += 1;
  // Display the clicked image on the main Preview
  setMainPreview(mainImage, mainPage);
});

// Attach event listener to previous button for mobile navigation
mainBtnPrev.addEventListener("click", function (e) {
  if (mainPage === 1) mainPage = 4;
  else mainPage -= 1;
  // Display the clicked image on the main Preview
  setMainPreview(mainImage, mainPage);
});

imageList.addEventListener("click", function (e) {
  // Get the dataset attribute of the clicked element
  const imgNum = e.target.dataset.img;
  // Display the clicked image on the main Preview
  setMainPreview(mainImage, imgNum);
  // Remove the active class from all the thumbnail images and add on the selected image
  setCurrentDisplay(smallImages, imgNum);
});

// Add Image Listener to Main Preview image
mainImage.addEventListener("click", function (e) {
  const imgNum = mainImage.dataset.display;
  overlay.classList.toggle("hidden");
  mainImageModal.src = `../images/image-product-${imgNum}.jpg`;
  setCurrentDisplay(smallImagesModal, imgNum);
  modalPage = imgNum;
});

// Closing the overlay and Modal component when Overlay Or Close Button is clicked

[overlay, btnClose].forEach((el) =>
  el.addEventListener("click", function (e) {
    // Setting up a guard clause to prevent closing when images are clicked
    if (
      e.target.closest(".modal__img--list") ||
      e.target.closest(".modal__img") ||
      e.target.closest(".btn--next") ||
      e.target.closest(".btn--prev")
    )
      return;
    // Close the overlay and the modal
    overlay.classList.add("hidden");
  })
);

// Navigate In the modal Window

// When the thumbnails are clicked
imageListModal.addEventListener("click", function (e) {
  const imgNum = e.target.dataset.img;
  //
  setCurrentDisplay(smallImagesModal, imgNum);
  // Display the clicked image on the main Preview
  setMainPreview(mainImageModal, imgNum);
  modalPage = imgNum;
});

// When Navigation  buttons are clicked
modal.addEventListener("click", function (e) {
  // Checking if the clicked element is the Next Button
  if (e.target.closest(".btn--next")) {
    modalPage = Number(modalPage);
    //Check of the page number does not go beyond 4 and below 1
    if (modalPage === 4) modalPage = 1;
    else modalPage += 1;
    // Display the clicked image on the main Preview
    setMainPreview(mainImageModal, modalPage);
  }
  // Checking if the clicked element is the prev button
  if (e.target.closest(".btn--prev")) {
    modalPage = Number(modalPage);
    //Check of the page number does not go beyond 4 and below 1
    if (modalPage === 1) modalPage = 4;
    else modalPage -= 1;
    // Display the clicked image on the main Preview
    setMainPreview(mainImageModal, modalPage);
  }
  setCurrentDisplay(smallImagesModal, modalPage);
});

////////////////////////////////////////////
////////////////////////////////////////////
// Cart

class CartItem {
  id = (new Date().getTime() + "").slice(-5);
  constructor(title, unitPrice, qty, image) {
    this.title = title;
    this.unitPrice = unitPrice;
    this.qty = qty;
    this.image = image;
    this.totalPrice = Number(unitPrice) * Number(qty);
  }
}

class App {
  #cart = [];
  constructor() {
    btnCta.addEventListener("click", this._newCartItem.bind(this));
    quantityContainer.addEventListener("click", this._quantityChangeHandler);
    cartMain.addEventListener("click", this._cartHandler.bind(this));
  }
  _newCartItem() {
    let cartItem;

    const title = titleEl.innerHTML;
    const unitPrice = parseFloat(unitPriceEl.innerHTML.slice(1));
    const qty = qtyEl.innerHTML;
    const image = mainImage.getAttribute("src");
    cartItem = new CartItem(title, unitPrice, qty, image);
    this.#cart.push(cartItem);
    console.log(cartItem);
    this._renderCartItem();
    this._updateCartNumber();
  }
  _renderCartItem() {
    cartEl.innerHTML = "";

    this.#cart.forEach((cartItem) => {
      const markup = this._generateMarkup(cartItem);
      cartEl.insertAdjacentHTML("afterbegin", markup);
    });
  }
  _updateCartNumber() {
    cartNum.innerHTML = `${this.#cart.length}`;
  }
  _generateMarkup(cartItem) {
    return `
    <div class="cart__item" data-id="${cartItem.id}">
     <div class="cart__item--header">
       <div class="cart__item--img-box">
         <img
           class="cart__item--img"
           src="${cartItem.image}"
           alt="cart image 1"
         />
       </div>
       <div class="cart__item--description">
         <p class="cart__item--title">Fall Limited Edition Sneakers</p>
         <div class="cart__item--pricing">
           <p class="cart__item--unit-price">$${cartItem.unitPrice}</p>
           <span>x</span>
           <span class="cart__item-num">${cartItem.qty}</span>
           <p class="cart__item--total-price">$${cartItem.totalPrice}</p>
         </div>
       </div>
       <div class="cart__item--delete">
         <img src="images/icon-delete.svg" alt="Delete icon" />
       </div>
     </div>
     <button class="cart__cta-btn">Checkout</button>
   </div>`;
  }
  _quantityChangeHandler(e) {
    // Setting up the guard clause
    if (!e.target.closest(".btn")) return;
    // If the Minus button is clicked
    if (e.target.closest(".btn").classList.contains("btn--decrease")) {
      const qtyNum = +qtyEl.innerHTML;
      // Avoiding Negative numbers
      if (qtyNum === 0) return;
      qtyEl.innerHTML = `${+qtyEl.innerHTML - 1}`;
    }
    // If the plus Button is clicked
    if (e.target.closest(".btn").classList.contains("btn--increase")) {
      qtyEl.innerHTML = `${+qtyEl.innerHTML + 1}`;
    }
  }
  _cartHandler(e) {
    e.preventDefault();
    if (e.target.closest(".cart__item--delete")) {
      const id = e.target.closest(".cart__item").dataset.id;
      const index = this.#cart.findIndex((cartItem) => cartItem.id === id);
      this.#cart.splice(index, 1);
      this._renderCartItem();
      this._updateCartNumber();
      if (this.#cart.length === 0) this._renderMessage();
    }
  }
  _renderMessage() {
    const markup = ` <div class="cart__msg">Your cart is empty</div>`;
    cartEl.insertAdjacentHTML("afterbegin", markup);
  }
}
const app = new App();
