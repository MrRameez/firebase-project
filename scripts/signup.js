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

        // Optionally redirect or show success message here
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Something went wrong! Please try again.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });

        console.log("Show message", error.message);
    }
});
