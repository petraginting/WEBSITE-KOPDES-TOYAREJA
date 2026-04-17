from config.db import get_db
from sqlalchemy import text

def save_forcast(hasil):
    conn = get_db().connect()

    # hapus data lama
    conn.execute(text("DELETE FROM forecast_results"))

    # simpan data hasil prediksi ke database
    for item in hasil:
        produk = item['produk']

        for periode in [7, 30]:
            key = f'prediksi_{periode}_hari'

            query = text("""
                    INSERT INTO forecast_results (nama_barang, periode, sisa_stok, hari_habis) 
                    VALUES (:nama, :periode, :sisa, :hari)
                """)
                
            conn.execute(query, {
                "nama": produk,
                "periode": periode,
                "sisa": item[key]['sisa_stok'],
                "hari": str(item[key]['hari_habis'])
            })

    conn.commit()
    conn.close()
