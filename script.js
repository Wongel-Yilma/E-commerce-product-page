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
    if (modalPage === 4) modalPage = 1;
    else modalPage += 1;
    // Display the clicked image on the main Preview
    setMainPreview(mainImageModal, modalPage);
  }
  // Checking if the clicked element is the prev button
  if (e.target.closest(".btn--prev")) {
    modalPage = Number(modalPage);
    if (modalPage === 1) modalPage = 4;
    else modalPage -= 1;
    // Display the clicked image on the main Preview
    setMainPreview(mainImageModal, modalPage);
  }
  setCurrentDisplay(smallImagesModal, modalPage);
});
