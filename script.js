// Selecting DOM elements
const overlay = document.querySelector(".overlay");
const mainImage = document.querySelector(".product__img");
const mainImageModal = document.querySelector(".modal__img");
const smallImages = document.querySelectorAll(".product__img--item");
const smallImagesModal = document.querySelectorAll(".modal__img--item");
const imageList = document.querySelector(".product__img--list");
const imageListModal = document.querySelector(".modal__img--list");
const btnClose = document.querySelector(".btn-close");

// Add an event listener to imagesList

imageList.addEventListener("click", function (e) {
  // Get the dataset attribute of the clicked element

  const imgNum = e.target.dataset.img;
  // Display the clicked image on the main Preview
  mainImage.src = `../images/image-product-${imgNum}.jpg`;
  mainImage.dataset.display = imgNum;
  // Remove the active class from all the thumbnail images and add on the selected image
  smallImages.forEach((img) =>
    img.classList.remove("product__img--item--active")
  );
  e.target.classList.add("product__img--item--active");
});

// Add Image Listener to Main Preview image
mainImage.addEventListener("click", function (e) {
  console.log(e.target);
  const imgNum = mainImage.dataset.display;
  overlay.classList.toggle("hidden");
  console.log(mainImageModal);
  mainImageModal.src = `../images/image-product-${imgNum}.jpg`;
});

// Closing the overlay and Modal component when Overlay Or Close Button is clicked

[overlay, btnClose].forEach((el) =>
  el.addEventListener("click", function (e) {
    overlay.classList.add("hidden");
  })
);

// Navigate In the modal Window
