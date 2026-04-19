import pandas as pd
from prophet import Prophet

# PARAMETER
MIN_DATA = 10
MAX_HORIZON = 30

def preprocess(df):
    df['tanggal'] = pd.to_datetime(df['tanggal'])
    return df


def forecast_with_prophet(df_produk):
    df_produk = df_produk.groupby('tanggal', as_index=False)['jumlah_terjual'].sum()

    df_prophet = df_produk.rename(columns={
        'tanggal': 'ds',
        'jumlah_terjual': 'y'
    })

    model = Prophet(
        daily_seasonality=False,        
        yearly_seasonality=False
    )

    model.fit(df_prophet)

    future = model.make_future_dataframe(periods=MAX_HORIZON)
    forecast = model.predict(future)

    pred = forecast.tail(MAX_HORIZON)['yhat'].clip(lower=0).tolist()
    return pred


def forecast_with_moving_avg(df_produk):
    df_produk = df_produk.groupby('tanggal', as_index=False)['jumlah_terjual'].sum()
    avg = df_produk['jumlah_terjual'].mean()

    return [avg] * MAX_HORIZON


def get_forecast(df_produk):
    if len(df_produk) < MIN_DATA:
        return forecast_with_moving_avg(df_produk)
    else:
        return forecast_with_prophet(df_produk)


def hitung_stok(prediksi, stok_awal, period):
    sisa = stok_awal
    hari_habis = f"Cukup untuk {period} hari ke depan"

    for i in range(period):
        sisa -= prediksi[i]
        if sisa <= 0:
            hari_habis = f"Habis dalam {i + 1} hari"
            break

    return sisa, hari_habis


def run_forecasting(df, stock):
    hasil = []

    df = preprocess(df)

    for produk in df['nama_barang'].unique():
        df_produk = df[df['nama_barang'] == produk]

        if df_produk['jumlah_terjual'].sum() == 0:
            continue

        prediksi = get_forecast(df_produk)

        stok_awal = stock.get(produk, 0)

        # simpan dua hasil: 7 hari & 30 hari
        sisa_7, habis_7 = hitung_stok(prediksi, stok_awal, 7)
        sisa_30, habis_30 = hitung_stok(prediksi, stok_awal, 30)

        hasil.append({
            'produk': produk,
            'stok_awal': stok_awal,

            'prediksi_7_hari': {
                'sisa_stok': sisa_7,
                'hari_habis': habis_7
            },

            'prediksi_30_hari': {
                'sisa_stok': sisa_30,
                'hari_habis': habis_30
            }
        })

    return hasil