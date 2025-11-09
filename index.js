// 🌐 Smooth Scroll
document.querySelectorAll('#navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// 🌙 Theme Toggle
const toggleBtn = document.getElementById("theme-toggle-btn");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  toggleBtn.checked = true;
}

toggleBtn.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
});

// 🍽️ Toggle Menu
const toggleMenuBtn = document.getElementById("toggleMenuBtn");
const menuSection = document.getElementById("menuSection");

toggleMenuBtn.addEventListener("click", () => {
  const show = menuSection.classList.toggle("show");
  menuSection.style.opacity = show ? "1" : "0";
  menuSection.style.transform = show ? "translateY(0)" : "translateY(-20px)";
  toggleMenuBtn.innerHTML = show ? "Hide Menu" : "Show Menu";
});

// 🔍 Search Menu
function searchMenu() {
  const input = document.getElementById("searchBox").value.toLowerCase();
  const menuItems = document.querySelectorAll(".menu-item");
  const messageBoxId = "noResultMessage";
  let messageBox = document.getElementById(messageBoxId);

  const searchBox = document.getElementById("searchBox");
const clearSearch = document.getElementById("clearSearch");

searchBox.addEventListener("input", () => {
  clearSearch.style.display = searchBox.value ? "block" : "none";
});

clearSearch.addEventListener("click", () => {
  searchBox.value = "";
  clearSearch.style.display = "none";
  searchMenu(); // call again to reset menu
});

  if (!messageBox) {
    messageBox = document.createElement("div");
    messageBox.id = messageBoxId;
    messageBox.style.color = "white";
    messageBox.style.textAlign = "center";
    messageBox.style.marginTop = "10px";
    messageBox.style.fontWeight = "bold";
    document.getElementById("search-section").appendChild(messageBox);
  }

  let found = false;
  menuItems.forEach(item => {
    const name = item.querySelector("h3").textContent.toLowerCase();
    if (name.includes(input)) {
      item.style.display = "block";
      found = true;
    } else item.style.display = "none";
  });

  messageBox.textContent = input === "" ? "" :
    !found ? "🍽️ We couldn’t find that dish — try another dish?" : "";

  if (!menuSection.classList.contains("show")) {
    menuSection.classList.add("show");
    menuSection.style.opacity = "1";
    menuSection.style.transform = "translateY(0)";
    toggleMenuBtn.innerHTML = "Hide Menu";
  }
}

// 🛒 Cart Logic
let cart = [];

function addToCart(itemName, price) {
  cart.push({ name: itemName, price });
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  let total = 0;
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;
    cartList.innerHTML += `<li>${item.name} - ₹${item.price}
      <button onclick="removeFromCart(${index})">❌</button></li>`;
  });

  document.getElementById("totalAmount").innerText = "Total: ₹" + total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// 🧾 Modal Order Form
const modal = document.getElementById("orderFormModal");
const closeBtn = document.querySelector(".close");

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  modal.style.display = "block";
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// 💳 Payment Fields
const paymentSelect = document.getElementById("payment");
const upiField = document.getElementById("upiField");
const cardField = document.getElementById("cardField");

upiField.style.display = "none";
cardField.style.display = "none";

paymentSelect.addEventListener("change", function() {
  upiField.style.display = this.value === "upi" ? "block" : "none";
  cardField.style.display = this.value === "card" ? "block" : "none";
});

// ✅ Order Form Submit
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("ordername").value.trim();
  const phone = document.getElementById("orderphone").value.trim();
  const address = document.getElementById("orderaddress").value.trim();
  const payment = document.getElementById("payment").value;

  if (name && phone && address && payment) {
    // ✅ Close modal first
    document.getElementById("orderFormModal").style.display = "none";

    // ✅ Wait a tiny bit before showing popup
    setTimeout(() => {
      showSuccessPopup();
    }, 200);

    // ✅ Reset fields
    this.reset();
    document.getElementById("upiField").style.display = "none";
    document.getElementById("cardField").style.display = "none";
    document.getElementById("payment").value = "";

  } else {
    alert("⚠️ Please fill all fields before submitting!");
  }
});


// ✅ Function to show popup
function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "flex";

  document.getElementById("closePopup").onclick = function() {
    popup.style.display = "none";
  };
}





// 💬 Feedback Form
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields before submitting.");
    return;
  }

  alert(`Thank you, ${name}! Your feedback has been submitted.`);
  this.reset();
});

// 📧 EmailJS (Optional, upgrade SDK v4 recommended)
if (typeof emailjs !== "undefined") {
  emailjs.init("JQ-rNMPeoqg5vKqjd"); // your public key

  document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_0ouuq78', 'template_uaurvlu', this)
      .then(() => {
        document.getElementById('status').innerText = "Message Sent Successfully!";
      }, (error) => {
        document.getElementById('status').innerText = "Error: " + JSON.stringify(error);
      });
  });
}
