from flask import Flask, request, jsonify
import pandas as pd
from config.db import get_db
from src.data.load_datas import load_transaksi, load_stok
from src.result.save_result import save_forcast
from src.model.prophet import run_forecasting

app = Flask(__name__)

@app.route('/run-predict', methods=['POST'])
def run_prediction():
    try:
        df = pd.read_csv(r'E:\kampus\semester 6\Computing Project\Toska\AI_Prediction_Stock\src\data\transaksi_dummy.csv')

        stok = {
            'minyak 1L': 200,
            'gula': 134,
            'beras 5kg': 38,
            'telur': 303
        }

        hasil = run_forecasting(df, stok)
        save_forcast(hasil)

        return jsonify({
            'success': True,
            'message': 'Prediksi berhasil dijalankan dan hasil disimpan ke database.'
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Error saat menjalankan prediksi: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)


