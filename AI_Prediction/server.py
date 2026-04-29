import pandas as pd
from config.db import get_db
from src.data.load_datas import load_transaksi, load_stok
from src.result.save_result import save_forcast
from src.model.prophet import run_forecasting


def main():
    try:
        df = pd.read_csv(r'E:\laragon\www\toska\AI_Prediction\src\data\data_transaksi_kopdes.csv')

        stok = load_stok()

        print(stok)

        hasil = run_forecasting(df, stok)
        save_forcast(hasil)

        print("Forecast berhasil disimpan")
    
    except Exception as e:
        print(f"error : {str(e)}")

if __name__ == '__main__':
    main()

