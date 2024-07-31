import { auth, createUserWithEmailAndPassword } from "./firebase.js";

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const button = document.querySelector("#botton");

button.addEventListener("click", async (event) => {
    try {
        event.preventDefault();
        
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
    
        await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
        window.location.href = "./dashboard.html"

        // window.location.herf = "../Pages/dashboard."

        // Optionally redirect or show success message here
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Something went wrong! Please try again.",
        });

    }
});
