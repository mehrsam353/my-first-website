let products = [];

let names = [

"Apple","Mango","Banana","Orange",
"Laptop","Phone","Headphone","Keyboard",
"T-Shirt","Shoes","Jacket","Hat",
"Chair","Lamp","Table","Clock",
"Football","Bike","Dumbbell","Ball"

];


let categories = [

"خوراکی",
"دیجیتال",
"پوشاک",
"خانه",
"ورزش"

];


let emojis = [

"🍎","🥭","🍌","🍊",
"💻","📱","🎧","⌨️",
"👕","👟","🧥","🧢",
"🪑","💡","🪵","⏰",
"⚽","🚲","🏋️","🏀"

];



for(let i=1;i<=200;i++){


let index = i % names.length;


let price =
Math.floor(Math.random()*9000000)+100000;



products.push({

id:i,

name:names[index]+" "+i,

category:categories[index % categories.length],

oldPrice:price+500000,

price:price,

discount:Math.floor(Math.random()*40)+10,

image:emojis[index],

rating:(Math.random()*1.5+3.5).toFixed(1),

reviews:Math.floor(Math.random()*500)+10


});


}



let box=document.getElementById("products");

let cart=JSON.parse(localStorage.getItem("cart")) || [];





function showProducts(list){


box.innerHTML="";



list.forEach(function(product){



box.innerHTML+=`


<div class="card">



<div style="font-size:80px">

${product.image}

</div>



<h2>

${product.name}

</h2>



<div class="discount">

${product.discount}% تخفیف 🔥

</div>



<p class="old-price">

${product.oldPrice} تومان

</p>



<p class="price">

${product.price} تومان

</p>



<div class="rating">

⭐ ${product.rating}

(${product.reviews} نظر)

</div>



<button onclick="addCart(${product.id})">

افزودن 🛒

</button>



</div>


`;



});


}





showProducts(products);

updateCart();






function addCart(id){


let product=products.find(p=>p.id==id);



let old=cart.find(p=>p.id==id);



if(old){

old.count++;

}

else{


cart.push({

id:product.id,

name:product.name,

price:product.price,

count:1

});


}



saveCart();

updateCart();


}






function updateCart(){


let box=document.getElementById("cart-items");


box.innerHTML="";


let total=0;

let count=0;



cart.forEach(function(item,index){


box.innerHTML+=`

<div class="cart-item">

${item.name}

<br>

${item.price} تومان

<br>

تعداد: ${item.count}


<br>


<button onclick="plus(${index})">
+
</button>


<button onclick="minus(${index})">
-
</button>


<button onclick="removeItem(${index})">
❌
</button>


</div>

`;



total+=item.price*item.count;

count+=item.count;


});



document.getElementById("total").innerText=total;

document.getElementById("cart-count").innerText=count;


}





function plus(index){

cart[index].count++;

saveCart();

updateCart();

}




function minus(index){


if(cart[index].count>1){

cart[index].count--;

}

else{

cart.splice(index,1);

}


saveCart();

updateCart();


}





function removeItem(index){

cart.splice(index,1);

saveCart();

updateCart();

}




function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}





function filterCategory(category){


if(category=="همه"){

showProducts(products);

return;

}



let result=products.filter(function(product){

return product.category==category;

});


showProducts(result);


}






document.getElementById("cart-btn").onclick=function(){

document.getElementById("cart-box").style.display="block";

}





document.getElementById("close-cart").onclick=function(){

document.getElementById("cart-box").style.display="none";

}





document.getElementById("search").oninput=function(){


let text=this.value.toLowerCase();



let result=products.filter(function(product){


return product.name.toLowerCase().includes(text);


});



showProducts(result);


};