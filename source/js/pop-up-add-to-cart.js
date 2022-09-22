var orderBtn = document.querySelector(".week-product__order");
var cartPopup = document.querySelector(".add-to-cart");
var pageBlock = document.querySelector(".page-body__block");

orderBtn.addEventListener("click", function (){
  orderBtn.blur();
  cartPopup.classList.add("pop-up--show");
  pageBlock.classList.add("page-body__block--show");
});

pageBlock.addEventListener("click", function (){
  cartPopup.classList.remove("pop-up--show");
  pageBlock.classList.remove("page-body__block--show");
})

window.addEventListener("keydown", function (evt){
  if (evt.key === "Esc" || evt.key === "Escape") {
    if (cartPopup.classList.contains("pop-up--show")){
      evt.preventDefault();
      cartPopup.classList.remove("pop-up--show");
      pageBlock.classList.remove("page-body__block--show");
    }
  }
});
