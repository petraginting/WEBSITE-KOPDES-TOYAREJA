from config.db import get_db
import pandas as pd

def load_transaksi():
    engine = get_db()
    query = "SELECT nama_barang, jumlah_terjual, tanggal FROM transaksi"
    return pd.read_sql(query, engine)

def load_stok():
    engine = get_db()
    query = "SELECT nama_barang, stok FROM produk"
    df = pd.read_sql(query, engine)

    return dict(zip(df['nama_barang'], df['stok']))

