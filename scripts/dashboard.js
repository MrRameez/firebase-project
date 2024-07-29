import { auth, signOut, onAuthStateChanged} from "./firebase.js";

const userEmailDiv = document.querySelector("#user-email");

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signin" ,user);
        
        userEmailDiv.innerText = user.email
    } else {
      window.location.href = "./login.html"
      console.log("User is signed out");
    }
  });



const btn = document.querySelector("#logout-botton");

btn.addEventListener("click", async(event)=>{
    try {
    event.preventDefault()
    await signOut(auth)
    console.log("sign-out successful");
    } catch (error) {
        console.log("its not error");
    }
})