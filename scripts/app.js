import { auth, onAuthStateChanged} from "./firebase.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "../Pages/dashboard.html"
    } else {
        //User is logout
      window.location.href = "../Pages/login.html"
    }
  });