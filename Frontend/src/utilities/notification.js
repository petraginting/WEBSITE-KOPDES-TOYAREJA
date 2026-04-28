export const defaultFormDataNotification = () => {
  return {
    tipe_notifikasi: "",
    target: "",
    judul_notifikasi: "",
    isi_pesan: "",
    tanggal_berlaku: "",
  };
};

export const setModalTambah = () => {
    return {
      tipe_notifikasi: "info",
      target: "semua",
      judul_notifikasi: "",
      isi_pesan: "",
      tanggal_berlaku: "",
    }
}

const formatDateTime = (date) => {
  if (!date) return null;
  return `${date} 23:59:59`; // default jam
};

export const mapNotificationPayload = (data) => ({
    tipe_notifikasi: data.tipe_notifikasi.toLowerCase(),
    target:data.target,
    judul_notifikasi: data.judul_notifikasi,
    isi_pesan: data.isi_pesan,
    tanggal_berlaku: formatDateTime(data.tanggal_berlaku),
});

export const setModalEdit = (notif) => {
    return {
      tipe_notifikasi: notif.tipe_notifikasi,
      target: notif.target,
      judul_notifikasi: notif.judul_notifikasi,
      isi_pesan: notif.isi_pesan,
      tanggal_berlaku: notif.tanggal_berlaku?.split(" ")[0] || "",
    }
}

