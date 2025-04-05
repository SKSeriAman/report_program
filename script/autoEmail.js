export function sendEmail(email, nama, reportId) {
  emailjs.send("service_q6neypf", "template_4el288i" ,{
    to_email: email,
    nama: disediakanOleh,
    report_id: reportId
  })
  .then(() => {
    alert("Emel berjaya dihantar!");
  })
  .catch(error => {
    console.error("Gagal hantar emel", error);
  });
}
