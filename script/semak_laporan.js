function semakLaporan() {
    const no = document.getElementById("nomborLaporan").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (!no) {
      errorMsg.textContent = "Sila masukkan nombor laporan.";
      return;
    }

    fetch(`https://sheetdb.io/api/v1/r25ioe322oxn8/search?noLaporan=${no}`)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          errorMsg.textContent = "Laporan tidak dijumpai.";
        } else {
          // Redirect with query param
          window.location.href = `report_page.html?no=${no}`;
        }
      })
      .catch(err => {
        console.error(err);
        errorMsg.textContent = "Ralat semasa mencari laporan.";
      });
  }