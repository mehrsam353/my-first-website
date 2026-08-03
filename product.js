let product=
JSON.parse(
localStorage.getItem("product")
);



let box=document.getElementById(
"product-detail"
);



box.innerHTML=`

<div class="card product-page">


<div style="font-size:150px">

${product.image}

</div>


<h1>

${product.name}

</h1>


<h2 class="price">

${product.price} تومان

</h2>



<p>

${product.description}

</p>


<h2>

⭐⭐⭐⭐⭐

</h2>


<button>

افزودن به سبد خرید 🛒

</button>


</div>

`;