import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

let db, app;

initFirebase();

function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyBRA7oN1C9Cm0CKCVys0WUzl_7umMIYdiA",
        authDomain: "shared-mind.firebaseapp.com",
        databaseURL: "https://shared-mind-default-rtdb.firebaseio.com",
        projectId: "shared-mind",
        storageBucket: "shared-mind.appspot.com",
        messagingSenderId: "1050804828540",
        appId: "1:1050804828540:web:b88433b3bf02b9361c4cf9",
        measurementId: "G-YJC9GF5V87"
    };

    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
}

export { db };
