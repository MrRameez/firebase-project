import { auth, signInWithEmailAndPassword } from "./firebase.js";

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const button = document.querySelector("#botton");
const msgDiv = document.querySelector("#msg");

button.addEventListener("click", async (event) => {
    try {
        event.preventDefault();
        msgDiv.innerText = "Loading...";

        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;

        const result = await signInWithEmailAndPassword(auth, emailValue, passwordValue);

        window.location.href = "./dashboard.html";

        // msgDiv.innerText = "Login done";
    } catch (error) {
        msgDiv.innerText = ""; // Clear loading message

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Something went wrong! Please use another account.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
});

