from pymongo import MongoClient
from config import settings

class Database:
    client: MongoClient = None
    
db = Database()

def get_database():
    return db.client[settings.database_name]

def connect_to_mongo():
    db.client = MongoClient(settings.mongodb_url)
    print(f"Connected to MongoDB at {settings.mongodb_url}")

def close_mongo_connection():
    db.client.close()
    print("Closed MongoDB connection")
