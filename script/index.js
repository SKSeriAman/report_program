  import { sendEmail } from './autoEmail.js';
  const form = document.getElementById('eventForm');
  const laporan = document.getElementById('laporan');

  const previewImage = (inputId, previewId) => {
    document.getElementById(inputId).addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById(previewId).src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  };
function generateReportId() {
  const timestamp = Date.now();
  return `SKSA-${timestamp}`;
}

  // Set up previews
  previewImage('gambar1', 'preview1');
  previewImage('gambar2', 'preview2');
  previewImage('gambar3', 'preview3');
  previewImage('gambar4', 'preview4');

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_unsigned_preset'); // Replace with your actual preset

    const response = await fetch('https://api.cloudinary.com/v1_1/dmzvrhryr/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.secure_url;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const reportId = generateReportId();
    const nama = document.getElementById('namaProgram').value;
    const anjuran = document.getElementById('anjuran').value;
    const tarikh = document.getElementById('tarikh').value;
    const masaMula = document.getElementById('masaMula').value;
    const masaTamat = document.getElementById('masaTamat').value;
    const tempat = document.getElementById('tempat').value;
    const bilPeserta = document.getElementById('bilPeserta').value;
    const objektif = document.getElementById('objektif').value;
    const aktiviti = document.getElementById('aktiviti').value;
    const kekuatan = document.getElementById('kekuatan').value;
    const kelemahan = document.getElementById('kelemahan').value;
    const penambahbaikan = document.getElementById('penambahbaikan').value;
    const email = document.getElementById('email').value;
    const disediakanOleh = document.getElementById('disediakanOleh').value;
    const jawatan = document.getElementById('jawatan').value;

    // Upload each gambar individually
    const gambarFiles = [
      document.getElementById('gambar1').files[0],
      document.getElementById('gambar2').files[0],
      document.getElementById('gambar3').files[0],
      document.getElementById('gambar4').files[0]
    ];

    const uploadedUrls = [];

    for (let file of gambarFiles) {
      if (file) {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      } else {
        uploadedUrls.push(''); // Empty if not uploaded
      }
    }

    // Send to Google Sheets
    fetch("https://sheetdb.io/api/v1/r25ioe322oxn8", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          reportId: reportId,
          namaProgram: nama,
          anjuran: anjuran,
          tarikh: tarikh,
          masaMula: masaMula,
          masaTamat: masaTamat,
          tempat: tempat,
          bilPeserta: bilPeserta,
          objektif: objektif,
          aktiviti: aktiviti,
          kekuatan: kekuatan,
          kelemahan: kelemahan,
          penambahbaikan: penambahbaikan,
          jawatan:jawatan,
          disediakanOleh: disediakanOleh,
          gambar1: uploadedUrls[0],
          gambar2: uploadedUrls[1],
          gambar3: uploadedUrls[2],
          gambar4: uploadedUrls[3]
        }
      })
    })
    .then(res => res.json())
    
    .then(data => {
      alert("Laporan berjaya dihantar dan gambar dimuat naik!");
      sendEmail()
      
      displayReport({
        reportId,
        nama,
        anjuran,
        tarikh,
        tempat,
        bilPeserta,
        objektif,
        aktiviti,
        kekuatan,
        kelemahan,
        penambahbaikan,
        images: uploadedUrls
      });

      


    })
    .catch(err => console.error(err));
  });

  function displayReport(data) {
    const imageHtml = data.images
      .filter(url => url)
      .map(url => `<img src="${url}" alt="Gambar Program" />`)
      .join('');

    laporan.innerHTML = `
      <h2>Laporan Program</h2>
      <p><strong>No Rujukan:</strong> ${data.reportId}</p>
      <p><strong>Nama Program:</strong> ${data.nama}</p>
      <p><strong>Anjuran:</strong> ${data.anjuran}</p>
      <p><strong>Tarikh :</strong> ${data.tarikh}</p>
      <p><strong>Masa Mula:</strong> ${data.masaMula}</p>
      <p><strong>Masa Tamat:</strong> ${data.masaTamat}</p>
      <p><strong>Tempat:</strong> ${data.tempat}</p>
      <p><strong>Bilangan Peserta:</strong> ${data.bilPeserta}</p>
      <p><strong>Objektif Program:</strong><br>${data.objektif}</p>
      <h3>Rumusan Program</h3>
      <p><strong>Aktiviti:</strong><br>${data.aktiviti}</p>
      <p><strong>Kekuatan Program:</strong><br>${data.kekuatan}</p>
      <p><strong>Kelemahan Program:</strong><br>${data.kelemahan}</p>
      <p><strong>Penambahbaikan:</strong><br>${data.penambahbaikan}</p>
      <p><strong>Disediakan Oleh:</strong> ${data.disediakanOleh}</p>
      <p><strong>Jawatan:</strong> ${data.jawatan}</p>
      ${imageHtml}
    `;
  }

  document.getElementById("email").addEventListener("input", function () {
    const pattern = /^[a-zA-Z0-9._%+-]+@moe-dl\.edu\.my$/;
    if (!pattern.test(this.value)) {
      this.setCustomValidity("Gunakan emel ID Delima Sahaja");
    } else {
      this.setCustomValidity("");
    }
  });
