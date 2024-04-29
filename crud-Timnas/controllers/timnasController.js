// Membuat variabel Mahasiswa dan mengimport/required dari model Mahasiswa
const Timnas = require("../models/Timnas");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter export
module.exports = {
  // Membuat view untuk mahasiswa
  viewTimnas: async (req, res) => {
    try {
      // Membuat variabel mahasiswa, dan menunda eksekusi hingga proses async selesai lalu mengambil model Mahasiswa
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Mahasiswa
      const timnas = await Timnas.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("index", {
        timnas,
        alert,
        title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
      res.redirect("/timnas");
    }
  },

  // Membuat create data untuk mahasiswa
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addTimnas: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
      const { Nama, NoPunggung, Posisi, Foto, Klub, TanggalNaturalisasi } = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Mahasiswa
      await Timnas.create({ Nama, NoPunggung, Posisi, Foto, Klub, TanggalNaturalisasi });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add data Timnas");
      req.flash("alertStatus", "success");
      res.redirect("/timnas"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/timnas");
    }
  },


  // Membuat read data untuk mahasiswa
  // types code in here..

  // Membuat update data untuk mahasiswa
  // Membuat update data untuk mahasiswa
  editTimnas: async (req, res) => {
    try {
      // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
      const { Nama, NoPunggung, Posisi, Foto, Klub, TanggalNaturalisasi } = req.body;
      /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
   _id didapat database dan id isinya dari inputan user */
      const timnas = await Timnas.findOne({ _id: id });
      /* mahasiswa diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
   yang tentu dikirimkan dari inputan user */
      timnas.Nama = Nama;
      timnas.NoPunggung = NoPunggung;
      timnas.Posisi = Posisi;
      timnas.Foto = Foto;
      timnas.Klub = Klub;
      timnas.TanggalNaturalisasi = TanggalNaturalisasi;
      // Menyimpan datanya ke database
      await timnas.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit data mahasiswa");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/mahasiswa)
      res.redirect("/timnas");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/mahasiswa)
      res.redirect("/timnas");
    }
  },


  // Membuat delete data untuk mahasiswa
  deleteTimnas: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { Nama } = req.params;
      // cek data Mahasiswa yang mau di delete berdasarkan id
      const timnas = await Timnas.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await timnas.remove();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data timnas");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/timnas");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/timnas");
    }
  },
};
