// Selecting DOM elements
const overlay = document.querySelector(".overlay");
const mainImage = document.querySelector(".product__img");
const smallImages = document.querySelectorAll(".product__img--item");
const imageList = document.querySelector(".product__img--list");

console.log(imageList);

// Add an event listener to imagesList

imageList.addEventListener("click", function (e) {
  console.log(e.target);
  // Get the dataset attribute of the clicked element
  const imgNum = e.target.dataset.img;
  console.log(imgNum);
  //set the source of the Main image to be
  mainImage.src = `../images/image-product-${imgNum}.jpg`;
});
