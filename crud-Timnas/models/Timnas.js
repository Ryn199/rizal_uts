const mongoose = require("mongoose");

// Membuat variabel baru dengan nama mahasiswaScheme
const timnasScheme = new mongoose.Schema({
  Nama: {
    // Membuat type dari field nama yang berada di tabel mahasiswa bersifat string
    type: String,
    // maksud dari required adalah ketika data disimpan kedalam database, data tidak boleh kosong
    required: true,
  },
  NoPunggung: {
    // Membuat type dari field nama yang berada di tabel mahasiswa bersifat number
    type: Number,
    
  },
  Posisi: {
    type: String,
    required: true,
  },
  Foto: {
    type: String,
    required: true,
  },
  Klub: {
    type: String,
    required: true,
  },
  TanggalNaturalisasi: {
    type: String,
  },
});

// lalu mengekspor model dari mahasiswa, tujuan mengekspor ini supaya model dari mahasiswa ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Timnas", timnasScheme);