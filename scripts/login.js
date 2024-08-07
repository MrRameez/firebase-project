import { auth, signInWithEmailAndPassword } from "./firebase.js";

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const button = document.querySelector("#botton");

button.addEventListener("click", async (event) => {
    try {
        event.preventDefault();

        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;

        await signInWithEmailAndPassword(auth, emailValue, passwordValue);

        window.location.href = "./dashboard.html";

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Something went wrong! Please use another account.",
        });
    }
});
