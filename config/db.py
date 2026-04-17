from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

def get_db():
    # Ganti dengan URL koneksi database Anda
    DATABASE_URL = os.getenv("DATA_BASE_URL")
    
    # Membuat engine SQLAlchemy
    engine = create_engine(DATABASE_URL)
    
    return engine