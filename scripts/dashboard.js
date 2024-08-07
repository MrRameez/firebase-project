import {
  auth,
  signOut,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  ref,
  uploadBytes,
  storage,
  getDownloadURL,
} from "./firebase.js";

const userEmailDiv = document.querySelector("#user-email");
const form = document.querySelector("#product-form");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const productImage = document.querySelector("#product-image");
const productsContainer = document.querySelector(".allProducts");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navItems = document.querySelector(".nav-items");

const myCollectionReference = collection(db, "products");

hamburgerMenu.addEventListener("click", () => {
  navItems.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const imageFile = productImage.files[0];
  let imageUrl = "";

  if (imageFile) {
      const storageRef = ref(storage, `product-images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Image has been uploaded",
        showConfirmButton: false,
        timer: 1500
      });
  }

  try {
      await addDoc(myCollectionReference, {
          name: productName.value,
          price: productPrice.value,
          description: productDescription.value,
          imageUrl: imageUrl,
          userEmail: userEmailDiv.textContent,
          timestamp: serverTimestamp(),
      });

      productName.value = "";
      productPrice.value = "";
      productDescription.value = "";
      productImage.value = "";
  } catch (error) {
      console.error("Error adding document: ", error);
  }
});

const formatDateTime = (timestamp) => {
  const date = timestamp.toDate();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const displayProducts = (products) => {
  productsContainer.innerHTML = "";
  products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p class="price">$${product.price}</p>
          <span>${product.description}</span>
          <span>${formatDateTime(product.timestamp)}</span>
      `;
      productsContainer.appendChild(productDiv);
  });
};

const filterProductsByUserEmail = (products, userEmail) => {
  return products.filter((product) => product.userEmail === userEmail);
};

const fetchProducts = (userEmail) => {
  onSnapshot(myCollectionReference, (snapshot) => {
      const products = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
      }));

      const filteredProducts = filterProductsByUserEmail(products, userEmail);
      displayProducts(filteredProducts);
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
      userEmailDiv.textContent = user.email;
      fetchProducts(user.email);
  } else {
      window.location.href = "login.html";
  }
});

document.querySelector("#logout-button").addEventListener("click", async () => {
  await signOut(auth);
});
