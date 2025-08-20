const products = [
  { name: "Strawberry", price: 19.99, discount: 20, image: "https://www.collinsdictionary.com/images/full/strawberry_227472010.jpg" },
  { name: "Orange", price: 14.99, discount: 10, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9yz1d_OrZBKB6TIWRyUtCIPBIjgyDOpybxw&s" },
  { name: "Apple", price: 29.99, discount: 15, image: "https://organicmandya.com/cdn/shop/files/Apples_bf998dd2-0ee8-4880-9726-0723c6fbcff3.jpg?v=1721368465&width=1000" },
  { name: "Watermelon", price: 24.99, discount: 25, image: "https://weresmartworld.com/sites/default/files/styles/full_screen/public/2021-04/watermeloen_2.jpg?itok=CCYHLr5M" },
];

const cart = {};

function renderProducts() {
  const grid = document.getElementById("productGrid");
  products.forEach((product, index) => {
    const discounted = (product.price - (product.price * product.discount) / 100).toFixed(2);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="old-price">$${product.price.toFixed(2)}</p>
      <p>Discount: ${product.discount}%</p>
      <p>New Price: $${discounted}</p>
      <div class="cart-controls">
        <button onclick="removeFromCart(${index})">-</button>
        <span id="count-${index}">0</span>
        <button onclick="addToCart(${index})">+</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function updateCartCount() {
  const totalCount = Object.values(cart).reduce((sum, val) => sum + val.quantity, 0);
  document.getElementById("cartCount").innerText = totalCount;
}

function addToCart(index) {
  if (!cart[index]) {
    cart[index] = { ...products[index], quantity: 1 };
  } else {
    cart[index].quantity += 1;
  }
  document.getElementById(`count-${index}`).innerText = cart[index].quantity;
  updateCartCount();
  renderCart();
}

function removeFromCart(index) {
  if (cart[index]) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) delete cart[index];
  }
  document.getElementById(`count-${index}`).innerText = cart[index] ? cart[index].quantity : 0;
  updateCartCount();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  Object.values(cart).forEach(item => {
    const discounted = (item.price - (item.price * item.discount) / 100).toFixed(2);
    const div = document.createElement("div");
    div.style.marginBottom = "15px";
    div.innerHTML = `
      <strong>${item.name}</strong><br/>
      Quantity: ${item.quantity}<br/>
      Unit Price: $${discounted}<br/>
      Total: $${(discounted * item.quantity).toFixed(2)}
      <hr/>
    `;
    container.appendChild(div);
  });
}

document.getElementById("cartBtn").addEventListener("click", () => {
  const sideCart = document.getElementById("sideCart");
  sideCart.classList.toggle("open");
});

renderProducts();

document.getElementById("closeCart").addEventListener("click", () => {
  document.getElementById("sideCart").classList.remove("open");
});