var orderBtn=document.querySelector(".week-product__order"),cartPopup=document.querySelector(".add-to-cart"),pageBlock=document.querySelector(".page-body__block");orderBtn.addEventListener("click",(function(){orderBtn.blur(),cartPopup.classList.add("pop-up--show"),pageBlock.classList.add("page-body__block--show")})),pageBlock.addEventListener("click",(function(){cartPopup.classList.remove("pop-up--show"),pageBlock.classList.remove("page-body__block--show")})),window.addEventListener("keydown",(function(e){"Esc"!==e.key&&"Escape"!==e.key||cartPopup.classList.contains("pop-up--show")&&(e.preventDefault(),cartPopup.classList.remove("pop-up--show"),pageBlock.classList.remove("page-body__block--show"))}));