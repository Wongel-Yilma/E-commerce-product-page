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

console.log(titleEl.innerHTML);
let modalPage = 1;
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

// Add an event listener to imagesList

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

imageListModal.addEventListener("click", function (e) {
  const imgNum = e.target.dataset.img;
  //
  setCurrentDisplay(smallImagesModal, imgNum);
  // Display the clicked image on the main Preview
  setMainPreview(mainImageModal, imgNum);
  modalPage = imgNum;
});

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
  }
  _newCartItem() {
    let cartItem;
    const title = titleEl.innerHTML;
    const unitPrice = parseFloat(unitPriceEl.innerHTML.slice(1));
    const qty = qtyEl.innerHTML;
    const image = mainImage.getAttribute("src");
    cartItem = new CartItem(title, unitPrice, qty, image);
    console.log(cartItem);
    console.log(this.#cart);
    this.#cart.push(cartItem);
    console.log(this.#cart);
    this._renderCartItem();
  }
  _renderCartItem() {
    cartEl.innerHTML = "";

    this.#cart.forEach((cartItem) => {
      const markup = this._generateMarkup(cartItem);
      cartEl.insertAdjacentHTML("afterbegin", markup);
    });
  }
  _generateMarkup(cartItem) {
    return `
    <div class="cart__item">
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
           <p class="cart__item--total-price">${cartItem.totalPrice}</p>
         </div>
       </div>
       <div class="cart__item--delete">
         <img src="images/icon-delete.svg" alt="Delete icon" />
       </div>
     </div>
     <button class="cart__cta-btn">Checkout</button>
   </div>`;
  }
}
const app = new App();
