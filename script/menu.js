const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

document.getElementById("semakLaporan").addEventListener("click", () => {
  //alert("Fungsi Semak Laporan akan datang atau boleh sambung di sini.");
  // Atau arahkan ke bahagian lain seperti: 
  //window.location.href = "semak-laporan.html";
});

