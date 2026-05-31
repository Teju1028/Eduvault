import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {

  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {

  apiKey: "AIzaSyD8qa4wGuhY42E5veSX0Mwg7OIBEcqhK24",

  authDomain: "eduvault-1356d.firebaseapp.com",

  projectId: "eduvault-1356d",

  storageBucket: "eduvault-1356d.firebasestorage.app",

  messagingSenderId: "545521093902",

  appId: "1:545521093902:web:c03e8e027ad9acbf649b5f"


};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

  window.addNote = async function () {

  const title =
    document.getElementById("title").value;

  const subject =
    document.getElementById("subject").value;

  const link =
    document.getElementById("link").value;

  if (!title || !subject || !link) {

    alert("Please fill all fields");

    return;
  }

  try {

    await addDoc(collection(db, "notes"), {

      title: title,
      subject: subject,
      link: link

    });

    alert("Note Uploaded Successfully");

    window.location.href = "home.html";

  } catch (error) {

    alert(error.message);

  }

};

  loadNotes();

async function loadNotes() {

  const notesList =
    document.getElementById("notesList");

  notesList.innerHTML = "";

  const querySnapshot =
    await getDocs(collection(db, "notes"));

  querySnapshot.forEach((documentData) =>  {

   const note = documentData.data();

const id = documentData.id;

    notesList.innerHTML += `

      <div class="note">

        <h3>${note.title}</h3>

        <p>${note.subject}</p>

        <a href="${note.link}" target="_blank">
  Open Note
</a>

  <button onclick="addToFavorites(
'${note.title}',
'${note.subject}',
'${note.link}'
)">
❤️ Favorite
</button>
<button onclick="deleteNote('${id}')">

🗑 Delete

</button>

      </div>

    `;
  });
}

loadNotes();
window.searchNotes = function () {

  let input =
    document.getElementById("search")
      .value.toLowerCase();

  let notes =
    document.getElementsByClassName("note");

  for (let i = 0; i < notes.length; i++) {

    let text =
      notes[i].innerText.toLowerCase();

    if (text.includes(input)) {

      notes[i].style.display = "block";

    } else {

      notes[i].style.display = "none";

    }
  }
};
window.toggleDarkMode = function () {

  document.body.classList.toggle("dark");

};
window.filterNotes = function () {

  let filter =
    document.getElementById("filter")
      .value.toLowerCase();

  let notes =
    document.getElementsByClassName("note");

  for (let i = 0; i < notes.length; i++) {

    let text =
      notes[i].innerText.toLowerCase();

    if (filter === "all" ||
        text.includes(filter)) {

      notes[i].style.display = "block";

    } else {

      notes[i].style.display = "none";

    }
  }
};
window.favoriteNote = function(button) {

  if (button.innerText === "❤️ Favorite") {

    button.innerText = "⭐ Favorited";

  } else {

    button.innerText = "❤️ Favorite";

  }
};
window.googleLogin = async function () {

  try {

    await signInWithPopup(auth, provider);

    alert("Login Successful");

  } catch (error) {

    alert(error.message);

  }
};

window.login = function () {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (username && password) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
            "home.html";

    } else {

        alert(
            "Enter Username and Password"
        );

    }
};
window.toggleDarkMode = function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }

};

window.onload = function () {

    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark");
    }

};
window.addToFavorites = function (title, subject, link)  {

    let favorites =
        JSON.parse(localStorage.getItem("favorites"))
        || [];

    favorites.push({
        title,
        subject,
        link
    });

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert("Added to Favorites ❤️");
};
window.logout = function () {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";

};
window.logout = function () {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";

};
window.deleteNote = async function (id) {

  try {

    await deleteDoc(doc(db, "notes", id));

    alert("Note Deleted");

    loadNotes();

  } catch (error) {

    alert(error.message);

  }

};