var orderBtns = document.querySelectorAll(".catalog__cart");
var cartPopup = document.querySelector(".add-to-cart");
var pageBlock = document.querySelector(".page-body__block");
var cartProduct = cartPopup.querySelector(".add-to-cart__product");
var cartProductNames = document.querySelectorAll(".catalog__name");

function orderBtnsHandler(n) {
  orderBtns[n].blur();
  cartPopup.classList.add("pop-up--show");
  pageBlock.classList.add("page-body__block--show");
  cartProduct.value = cartProductNames[n].innerText;
}

orderBtns[0].addEventListener("click", function (){
  orderBtnsHandler(0);
});

orderBtns[1].addEventListener("click", function (){
  orderBtnsHandler(1);
});

orderBtns[2].addEventListener("click", function (){
  orderBtnsHandler(2);
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
