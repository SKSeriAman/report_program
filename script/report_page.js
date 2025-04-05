// ------------------------
// Ambil parameter dari URL
// ------------------------
const urlParams = new URLSearchParams(window.location.search);
const reportId = urlParams.get('no');

// Paparkan No Laporan
document.getElementById("reportId").textContent = `No. Rujukan: ${reportId}`;



// ------------------------
// Jika `reportId` wujud, fetch dari SheetDB dan isi laporan
// ------------------------
if (reportId) {
  fetch(`https://sheetdb.io/api/v1/r25ioe322oxn8/search?reportId=${reportId}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const report = data[0];
        document.getElementById("namaProgram").textContent = report.namaProgram;
        document.getElementById("anjuran").textContent = report.anjuran;
        document.getElementById("tarikhMasa").textContent = report.tarikhMasa;
        document.getElementById("tempat").textContent = report.tempat;
        document.getElementById("bilPeserta").textContent = report.bilPeserta;


        const objektifList = document.getElementById("objektif");
        objektifList.innerHTML = "";
        if (report.objektif) {
          report.objektif.split(";").forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.trim();
            objektifList.appendChild(li);
          });
        }

        document.getElementById("aktiviti").textContent = report.aktiviti;
        document.getElementById("kekuatan").textContent = report.kekuatan;
        document.getElementById("kelemahan").textContent = report.kelemahan;
        document.getElementById("penambahbaikan").textContent = report.penambahbaikan;
        document.getElementById("disediakanOleh").textContent = report.disediakanOleh.toUpperCase();
        document.getElementById("jawatan").textContent = report.jawatan;

        document.getElementById("gambar1").src = report.gambar1 || "";
        document.getElementById("gambar2").src = report.gambar2 || "";
        document.getElementById("gambar3").src = report.gambar3 || "";
        document.getElementById("gambar4").src = report.gambar4 || "";
      } else {
        alert("Laporan tidak dijumpai.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Ralat semasa memuatkan data.");
    });
}

// ------------------------
// Fungsi Simpan Data ke SheetDB (Contoh penggunaan dari borang)
// ------------------------
function hantarLaporanKeSheetDB(nama, anjuran, tarikhMasa, tempat, bilPeserta, objektif, aktiviti, kekuatan, kelemahan, penambahbaikan, uploadedUrls) {
  fetch("https://sheetdb.io/api/v1/r25ioe322oxn8", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: {
        namaProgram: nama,
        anjuran: anjuran,
        tarikhMasa: tarikhMasa,
        tempat: tempat,
        bilPeserta: bilPeserta,
        objektif: objektif,
        aktiviti: aktiviti,
        kekuatan: kekuatan,
        kelemahan: kelemahan,
        penambahbaikan: penambahbaikan,
        gambar1: uploadedUrls[0],
        gambar2: uploadedUrls[1],
        gambar3: uploadedUrls[2],
        gambar4: uploadedUrls[3]
      }
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Berjaya simpan:", data);
    alert("Laporan berjaya dihantar!");
  })
  .catch(error => {
    console.error("Ralat semasa menghantar:", error);
    alert("Ralat semasa menghantar laporan.");
  });
}

// ------------------------
// Fungsi Butang Kembali
// ------------------------
function goBack() {
  window.history.back(); // atau location.href = 'borang.html';
}

// ------------------------
// Fungsi Cetak / Simpan PDF
// ------------------------
function printOPR() {
  window.print(); // buka dialog cetak browser
}

function goHome(){
  window.location.href = "index.html"; // pergi ke halaman utama
}
