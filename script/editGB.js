const SHEETDB_URL = "https://sheetdb.io/api/v1/fp69cargicm29";
const PASSWORD = "admin123"; // You can change this
window.addEventListener("DOMContentLoaded", () => {
    fetch(SHEETDB_URL)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0 && data[0].NamaGB) {
          document.getElementById("NamaGB").textContent = data[0].NamaGB.toUpperCase();
        } else {
          document.getElementById("NamaGB").textContent = "NAMA TIDAK DIJUMPAI";
        }
      })
      .catch(err => {
        console.error("Ralat semasa mengambil NamaGB:", err);
        document.getElementById("NamaGB").textContent = "RALAT DATA";
      });
  });
// Load NamaGB when page loads
window.addEventListener("DOMContentLoaded", () => {
  fetch(SHEETDB_URL)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        document.getElementById("NamaGB").textContent = data[0].NamaGB.toUpperCase();
      }
    })
    .catch(err => console.error("Ralat memuatkan NamaGB:", err));
});

function TukarGB() {
  document.getElementById("namaGBPopup").style.display = "block";
}

function closeNamaGBPopup() {
  document.getElementById("namaGBPopup").style.display = "none";
  document.getElementById("popupMsg").textContent = "";
}

function submitNamaGB() {
  const password = document.getElementById("adminPassword").value.trim();
  const newName = document.getElementById("newNamaGB").value.trim();
  const msg = document.getElementById("popupMsg");

  if (password !== PASSWORD) {
    msg.textContent = "Kata laluan salah!";
    return;
  }

  if (!newName) {
    msg.textContent = "Sila isi nama baharu.";
    return;
  }

  // Update database
  fetch(SHEETDB_URL + "/id/1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { NamaGB: newName } })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("NamaGB").textContent = newName.toUpperCase();
    closeNamaGBPopup();
    alert("Nama Guru Besar telah dikemaskini.");
  })
  .catch(err => {
    console.error(err);
    msg.textContent = "Gagal menyimpan data.";
  });
}
