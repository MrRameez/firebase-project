import {
  auth,
  signOut,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot
} from "./firebase.js";

const userEmailDiv = document.querySelector("#user-email");
const form = document.querySelector("#product-form");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productDetail = document.querySelector("#product-detail");
const allProducts = document.querySelector(".allProducts");

const myCollectionReference = collection(db, "products");

onAuthStateChanged(auth, (user) => {
  if (user) {
      console.log("User is signed in", user);
      userEmailDiv.innerText = user.email;
  } else {
      window.location.href = "./login.html";
      console.log("User is signed out");
  }
});

const btn = document.querySelector("#logout-button");

btn.addEventListener("click", async (event) => {
  try {
      event.preventDefault();
      await signOut(auth);
      // window.location.href = "./login.html"
      console.log("Sign-out successful");
  } catch (error) {
      console.log("Error signing out:", error);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const myProduct = {
      productName: productName.value,
      productPrice: Number(productPrice.value),
      productImg: null,
      productDetail: productDetail.value,
      createdAt: serverTimestamp(),
  };

  try {
      await addDoc(myCollectionReference, myProduct);
      form.reset();
  } catch (e) {
      console.log("Error adding document:", e);
  }
});

onSnapshot(myCollectionReference, (snapshot) => {
  allProducts.innerHTML = ''; // Clear the current content to avoid duplication
  snapshot.docs.forEach((eachDoc) => {
      const product = eachDoc.data();
      const productHTML = `
          <div>
              <h3>${product.productName}</h3>
              <span>${product.createdAt?.toDate().toLocaleString()}</span>
              <p class="price">Rs.${product.productPrice}</p>
              <p>${product.productDetail}</p>
          </div>`;
      allProducts.innerHTML += productHTML;
  });
});














