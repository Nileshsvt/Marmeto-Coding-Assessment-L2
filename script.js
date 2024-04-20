 // Fetch product data from API
 fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
 .then((res)=>{
     return res.json();
 })
 .then((data)=> {
   
    getData(data);
   showProducts('men');
 })
 .catch(error => console.error('Error fetching product data:', error));

 let data;
function getData(d){
 data=d;
}
//   Function to display products based on category
function showProducts(category) {
 const productContainer = document.getElementById('product-container');
 productContainer.innerHTML = ''; // Clear previous products

 // Filter products based on category
 let products = [];
 // Assume data is fetched and stored in the 'data' variable
   
   if (category=='men') {
     products.push(data.categories[0].category_products);
     
   };
   if (category=='women') {
     products.push(data.categories[1].category_products);
     
   };
   if (category=='kids') {
     products.push(data.categories[2].category_products);
     
   };

 // Create product cards for each product
 let con=document.querySelector("#product-container");
 for(let product of products[0]){

   const card = document.createElement('div');
   card.classList.add('product-card');
   con.appendChild(card);

   // Product image
   const img = document.createElement('img');
   img.src = product.image;
   card.appendChild(img);

   // Badge
   if(product.badge_text!=null){
   const badge = document.createElement('div');
   badge.classList.add('badge');

   badge.innerText = product.badge_text;
   card.appendChild(badge);}

   // Product title
   const titvend=document.createElement('div');
   titvend.classList.add('titvend');
   const title = document.createElement('div');
   title.classList.add('product-info');
   title.innerHTML = `<span><strong>${product.title}</strong> </span>`;
   titvend.appendChild(title);

   // Vendor
   const vendor = document.createElement('div');
   vendor.classList.add('product-info');
   vendor.innerHTML = `<span>*${product.vendor} </span>`;
   titvend.appendChild(vendor);
   card.appendChild(titvend);


   // Price and Compare at price
   const price = document.createElement('div');
   price.classList.add('product-info');
   const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
   price.innerHTML = `<span><strong>Rs.</strong> ${product.price}.00</span>`;
   const disc = document.createElement('span');
   disc.classList.add('disc');
   disc.innerText=`${product.compare_at_price}` ;
   price.appendChild(disc);

   const disc2 = document.createElement('span');
   disc2.classList.add('disc2');
   disc2.innerText=`${discount}% Off` ;
   price.appendChild(disc2);

   card.appendChild(price);

   // Add to cart button
   const addToCartBtn = document.createElement('button');
   addToCartBtn.classList.add('add-to-cart');
   addToCartBtn.innerText = 'Add to cart';
   card.appendChild(addToCartBtn);

   productContainer.appendChild(card);
 };

 // Update active tab
 const tabs = document.querySelectorAll('.tab');
 tabs.forEach(tab => {
   tab.classList.remove('active');
   
   if (tab.innerText.toLowerCase() === category) {
     tab.classList.add('active');
   }
 });
}